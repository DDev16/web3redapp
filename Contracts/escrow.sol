// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Escrow {
    address public nftAddress;
    address payable public seller;
    address public inspector;
    address public lender;
    address public appraiser;  // New appraiser address

    modifier onlyBuyer(uint256 _nftID) {
        require(msg.sender == buyer[_nftID], "Only the buyer can call this method");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can call this method");
        _;
    }

    modifier onlyInspector() {
        require(msg.sender == inspector, "Only the inspector can call this method");
        _;
    }

    modifier onlyLender() {
        require(msg.sender == lender, "Only the lender can call this method");
        _;
    }

    modifier onlyAppraiser() {
        require(msg.sender == appraiser, "Only the appraiser can call this method");
        _;
    }

    enum EscrowState { InProgress, InspectionPending, InspectionPassed, AppraisalPending, AppraisalCompleted, Completed, Canceled }

    struct Transaction {
        address buyer;
        uint256 purchasePrice;
        uint256 escrowAmount;
        bool inspectionPassed;
        bool appraisalCompleted;  // New appraisal status
        mapping(address => bool) approvals;
        EscrowState state;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCounter;

    event TransactionCreated(
        uint256 indexed transactionId,
        address indexed buyer,
        address indexed seller,
        uint256 purchasePrice,
        uint256 escrowAmount
    );

    event InspectionStatusUpdated(uint256 indexed transactionId, bool inspectionPassed);
    event AppraisalCompleted(uint256 indexed transactionId, bool appraisalPassed);  // New appraisal event
    event SaleApproved(uint256 indexed transactionId, address indexed approver);
    event SaleCompleted(uint256 indexed transactionId);
    event SaleCanceled(uint256 indexed transactionId);

    constructor(
        address _nftAddress,
        address payable _seller,
        address _inspector,
        address _lender,
        address _appraiser  // New appraiser address parameter
    ) {
        nftAddress = _nftAddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
        appraiser = _appraiser;  // Initialize appraiser
    }

    function createTransaction(
        address _buyer,
        uint256 _purchasePrice,
        uint256 _escrowAmount
    ) public onlySeller {
        require(_buyer != address(0), "Buyer address must be valid");
        require(_purchasePrice > 0, "Purchase price must be greater than zero");
        require(_escrowAmount >= _purchasePrice, "Escrow amount must be greater than or equal to purchase price");

        uint256 transactionId = transactionCounter++;
        transactions[transactionId] = Transaction({
            buyer: _buyer,
            purchasePrice: _purchasePrice,
            escrowAmount: _escrowAmount,
            inspectionPassed: false,
            appraisalCompleted: false,  // Initialize appraisal status
            state: EscrowState.InProgress
        });

        emit TransactionCreated(transactionId, _buyer, seller, _purchasePrice, _escrowAmount);
    }

    function depositEarnest(uint256 _transactionId) public payable onlyBuyer(_transactionId) {
        Transaction storage transaction = transactions[_transactionId];
        require(transaction.state == EscrowState.InProgress, "Transaction is not in progress");
        require(msg.value >= transaction.escrowAmount, "Insufficient escrow deposit");
        transaction.state = EscrowState.InspectionPending;
    }

    function updateInspectionStatus(uint256 _transactionId, bool _inspectionPassed) public onlyInspector {
        Transaction storage transaction = transactions[_transactionId];
        require(transaction.state == EscrowState.InspectionPending, "Inspection cannot be updated");
        transaction.inspectionPassed = _inspectionPassed;
        if (_inspectionPassed) {
            transaction.state = EscrowState.AppraisalPending;
        } else {
            transaction.state = EscrowState.Canceled;
        }
        emit InspectionStatusUpdated(_transactionId, _inspectionPassed);
    }

    function performAppraisal(uint256 _transactionId, bool _appraisalPassed) public onlyAppraiser {
        Transaction storage transaction = transactions[_transactionId];
        require(transaction.state == EscrowState.AppraisalPending, "Appraisal cannot be performed");
        transaction.appraisalCompleted = true;
        transaction.state = _appraisalPassed ? EscrowState.AppraisalCompleted : EscrowState.Canceled;
        emit AppraisalCompleted(_transactionId, _appraisalPassed);
    }

    function approveSale(uint256 _transactionId) public {
        Transaction storage transaction = transactions[_transactionId];
        require(msg.sender == transaction.buyer || msg.sender == seller || msg.sender == lender, "Not authorized to approve");
        require(transaction.state == EscrowState.AppraisalCompleted, "Sale cannot be approved");
        transaction.approvals[msg.sender] = true;
        emit SaleApproved(_transactionId, msg.sender);
    }

    function finalizeSale(uint256 _transactionId) public {
        Transaction storage transaction = transactions[_transactionId];
        require(transaction.state == EscrowState.AppraisalCompleted, "Sale cannot be finalized");
        require(transaction.approvals[transaction.buyer] && transaction.approvals[seller] && transaction.approvals[lender], "All parties must approve");
        require(address(this).balance >= transaction.purchasePrice, "Insufficient contract balance");

        transaction.state = EscrowState.Completed;

        (bool success, ) = seller.call{value: transaction.purchasePrice}("");
        require(success, "Transfer to seller failed");

        IERC721(nftAddress).transferFrom(address(this), transaction.buyer, _transactionId);

        emit SaleCompleted(_transactionId);
    }

    function cancelSale(uint256 _transactionId) public {
        Transaction storage transaction = transactions[_transactionId];
        require(msg.sender == seller || msg.sender == buyer[_transactionId], "Not authorized to cancel");
        require(transaction.state != EscrowState.Completed, "Sale cannot be canceled once completed");

        if (transaction.state == EscrowState.AppraisalCompleted) {
            // Refund the escrow amount to the buyer if the appraisal was completed.
            (bool success, ) = transaction.buyer.call{value: transaction.escrowAmount}("");
            require(success, "Refund to buyer failed");
        }

        transaction.state = EscrowState.Canceled;

        emit SaleCanceled(_transactionId);
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}


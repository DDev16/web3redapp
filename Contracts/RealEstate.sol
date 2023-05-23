// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract RealEstateContract is ERC721, Ownable, ReentrancyGuard, Pausable {
    struct Location {
        string title;
        string propertyMedia;
        string propertyAddress;
        string county;
        string state;
        string zip;
        string country;
        string latitude;
        string longitude;
        string city;
    }

    struct PropertyDetails {
        uint256 sizeInFt2;
        uint256 lotSizeInFt2;
        uint256 rooms;
        uint256 bathrooms;
        uint256 garages;
        uint256 bedrooms;
        uint256 yearBuilt;
        bool basement;
        uint256 homeownersAssociationFee;
        string listedIn;
        string category;
        uint256 floors;
        string propertyStatus;
    }

    struct Amenities {
        bool equippedKitchen;
        bool gym;
        bool laundry;
        bool mediaRoom;
        bool backYard;
        bool basketballCourt;
        bool frontYard;
        bool garageAttached;
        bool hotBath;
        bool pool;
    }

    struct Utilities {
        bool centralAir;
        bool electricity;
        bool heating;
        bool naturalGas;
        bool ventilation;
        bool water;
    }

    struct OtherFeatures {
        bool chairAccessible;
        bool elevator;
        bool fireplace;
        bool smokeDetectors;
        bool washerAndDryer;
        bool wifi;
    }

    struct Rental {
        bool isRented;
        uint256 rentalPrice;
        uint256 rentalPeriod; // in days
        address renter;
        uint256 startRentDate;
        uint256 endRentDate;
    }

    struct Property {
        Location location;
        PropertyDetails details;
        Amenities amenities;
        Utilities utilities;
        OtherFeatures otherFeatures;
        address payable owner;
        address payable originalOwner;
        bool forSale;
        uint256 price;
        uint256 royaltyRate; // between 0 and 100
        Rental rental;
        address[] pastOwners;
        string legalJurisdiction;
    }

    mapping(uint256 => Property) public properties;
    mapping(address => bool) public kycCompleted;

    event PropertyListed(uint256 indexed tokenId, uint256 price);
    event PropertyBought(uint256 indexed tokenId, address newOwner);
    event PropertyRented(uint256 indexed tokenId, address renter);
    event RentEnded(uint256 indexed tokenId);
    event PropertySold(
        uint256 indexed tokenId,
        address newOwner,
        uint256 soldPrice
    );

    modifier onlyOwnerOfProperty(uint256 tokenId) {
        require(
            msg.sender == properties[tokenId].owner,
            "Only the owner can call this function."
        );
        _;
    }

    modifier notForSale(uint256 tokenId) {
        require(
            !properties[tokenId].forSale,
            "The property is currently for sale."
        );
        _;
    }

    modifier isProperty(uint256 tokenId) {
        require(
            properties[tokenId].owner != address(0),
            "The property does not exist."
        );
        _;
    }

    modifier isForRent(uint256 tokenId) {
        require(
            !properties[tokenId].rental.isRented &&
                properties[tokenId].rental.rentalPrice > 0 &&
                properties[tokenId].rental.rentalPeriod > 0,
            "The property is not for rent."
        );
        _;
    }

    modifier onlyRenter(uint256 tokenId) {
        require(
            msg.sender == properties[tokenId].rental.renter,
            "Only the renter can call this function."
        );
        _;
    }

    constructor() ERC721("RealEstateToken", "RET") {
        commissionRate = 5; // 5%
    }

    uint256 public taxRate; // Between 0 and 100
    uint256 public commissionRate; // between 0 and 100
    uint256 private tokenIdCounter = 0;
    address public taxAccount;

    function setTaxAccount(address _taxAccount) public onlyOwner {
        taxAccount = _taxAccount;
    }

    function setTaxRate(uint256 _taxRate) public onlyOwner {
        require(_taxRate <= 100, "Tax rate must be between 0 and 100.");
        taxRate = _taxRate;
    }

    // Function to change commission rate, only callable by the contract owner
    function setCommissionRate(uint256 _commissionRate) public onlyOwner {
        require(
            _commissionRate <= 100,
            "Commission rate must be between 0 and 100."
        );
        commissionRate = _commissionRate;
    }

    function updateKyc(address _user, bool _kycStatus) public onlyOwner {
        kycCompleted[_user] = _kycStatus;
    }

    function createListing(
        Location memory _location,
        PropertyDetails memory _details,
        Amenities memory _amenities,
        Utilities memory _utilities,
        OtherFeatures memory _otherFeatures,
        uint256 _royaltyRate,
        string memory _legalJurisdiction

    ) public whenNotPaused {
        require(_royaltyRate <= 100, "Royalty rate must be between 0 and 100.");
        Property memory newProperty = Property({
            location: _location,
            details: _details,
            amenities: _amenities,
            utilities: _utilities,
            otherFeatures: _otherFeatures,
            owner: payable(msg.sender),
            originalOwner: payable(msg.sender),
            forSale: false,
            price: 0,
            royaltyRate: _royaltyRate,
            legalJurisdiction: _legalJurisdiction,


            rental: Rental({
                isRented: false,
                rentalPrice: 0,
                rentalPeriod: 0,
                renter: address(0),
                startRentDate: 0,
                endRentDate: 0
                
            }),
            pastOwners: new address[](0)
        });
        properties[tokenIdCounter] = newProperty;

        // Mint a new token for this property and assign it to the owner
        _mint(msg.sender, tokenIdCounter);
        tokenIdCounter++;
    }

    function updateListing(
        uint256 tokenId,
        Location memory _location,
        PropertyDetails memory _details,
        Amenities memory _amenities,
        Utilities memory _utilities,
        OtherFeatures memory _otherFeatures
    ) public onlyOwnerOfProperty(tokenId) notForSale(tokenId) {
        Property storage property = properties[tokenId];

        property.location = _location;
        property.details = _details;
        property.amenities = _amenities;
        property.utilities = _utilities;
        property.otherFeatures = _otherFeatures;
    }

    function listForSale(uint256 tokenId, uint256 _price)
        public
        onlyOwnerOfProperty(tokenId)
        notForSale(tokenId)
        whenNotPaused
    {
        Property storage property = properties[tokenId];

        property.forSale = true;
        property.price = _price;

        emit PropertyListed(tokenId, _price);
    }

    function cancelSale(uint256 tokenId) public onlyOwnerOfProperty(tokenId) {
        Property storage property = properties[tokenId];

        property.forSale = false;
    }

    function buy(uint256 tokenId)
        public
        payable
        isProperty(tokenId)
        nonReentrant
    {
        Property storage property = properties[tokenId];

        require(property.forSale, "The property is not for sale.");
        require(
            msg.value >= property.price,
            "You need to pay at least the listing price."
        );

        uint256 royalty = (msg.value * property.royaltyRate) / 100;
        uint256 commission = (msg.value * commissionRate) / 100;

        property.owner.transfer(msg.value - royalty - commission);
        property.originalOwner.transfer(royalty);
        // Transfer the commission to the contract owner
        payable(owner()).transfer(commission);

        property.pastOwners.push(property.owner);
        property.owner = payable(msg.sender);
        property.forSale = false;

        _transfer(property.owner, msg.sender, tokenId);

        emit PropertyBought(tokenId, msg.sender);
        emit PropertySold(tokenId, msg.sender, msg.value);
    }

    function listForRent(
        uint256 tokenId,
        uint256 _price,
        uint256 _period
    ) public onlyOwnerOfProperty(tokenId) notForSale(tokenId) {
        Property storage property = properties[tokenId];

        property.rental.rentalPrice = _price;
        property.rental.rentalPeriod = _period;
    }

    function updateRental(
        uint256 tokenId,
        uint256 _price,
        uint256 _period
    ) public onlyOwnerOfProperty(tokenId) notForSale(tokenId) {
        Property storage property = properties[tokenId];

        property.rental.rentalPrice = _price;
        property.rental.rentalPeriod = _period;
    }

    function cancelRentListing(uint256 tokenId)
        public
        onlyOwnerOfProperty(tokenId)
    {
        Property storage property = properties[tokenId];

        property.rental.rentalPrice = 0;
        property.rental.rentalPeriod = 0;
    }

    function rent(uint256 tokenId)
        public
        payable
        isProperty(tokenId)
        isForRent(tokenId)
        nonReentrant
    {
        Property storage property = properties[tokenId];

        require(
            msg.value >= property.rental.rentalPrice,
            "You need to pay at least the listed rental price."
        );

        uint256 commission = (msg.value * commissionRate) / 100;

        property.owner.transfer(msg.value - commission);
        // Transfer the commission to the contract owner
        payable(owner()).transfer(commission);

        property.rental.isRented = true;
        property.rental.renter = msg.sender;
        property.rental.startRentDate = block.timestamp;
        property.rental.endRentDate =
            block.timestamp +
            property.rental.rentalPeriod *
            1 days;

        emit PropertyRented(tokenId, msg.sender);
    }

    function endRent(uint256 tokenId) public onlyRenter(tokenId) {
        Property storage property = properties[tokenId];

        require(
            block.timestamp >= property.rental.endRentDate,
            "The rental period has not ended yet."
        );

        property.rental.isRented = false;
        property.rental.renter = address(0);
        property.rental.startRentDate = 0;
        property.rental.endRentDate = 0;

        emit RentEnded(tokenId);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}

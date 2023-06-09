import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar as BootstrapNavbar, Button, Dropdown } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { useWeb3 } from '../../web3Context';
function Navbar() {

    const { web3, account } = useWeb3();

    const handleConnect = async () => {
        if (!web3) {
            alert('No Ethereum provider detected. Please install MetaMask.');
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error('Error connecting to Web3:', error);
        }
    };

    return (
        <BootstrapNavbar expand="lg" className="custom-navbar">
            <Container>
                <Link to="/" className="">

                <span className="navbar-title">
  <strong>
    <span style={{
      textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff, 0 0 25px #00ffff, 0 0 30px #00ffff, 0 0 35px #00ffff, 0 0 2px black'
    }}>
      Web3
    </span>
  </strong>
  Realty
</span>


                    <img src={logo} alt="Logo" className="navbar-logo" />
                </Link>

                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav" className="links-button-section">
                    <Nav className="ms-auto">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/properties" className="nav-link">
                            Properties
                        </Link>
                        <Link to="/agents" className="nav-link">
                            Agents
                        </Link>
                        <Link to="/contact" className="nav-link">
                            Contact
                        </Link>


                        <Dropdown>
    <Dropdown.Toggle variant="info" id="dropdown-basic" className="btn-outline-light">
        Buy/Rent/Sell
    </Dropdown.Toggle>

    <Dropdown.Menu>
        <Dropdown.Item className="bg-light" as={Link} to="/manage-account">Buy</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/check-balance">Rent</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/manage-listings">Sell</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/favorites">Fractionalize</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown>
    <Dropdown.Toggle variant="info" id="dropdown-basic" className="btn-outline-light">
        Dashboard
    </Dropdown.Toggle>

    <Dropdown.Menu>
        <Dropdown.Item className="bg-light" as={Link} to="/manage-account">My Profile</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/check-balance">Account Balance</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/manage-listings">My Properties List</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/favorites">Favorites</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/saved-searches">Saved Searches</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/inbox">Inbox</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/create-listing">Create Listing</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/sign-in">Sign in</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
                        
                        <Button variant="outline-light" className="ms-2" onClick={handleConnect}>
                            {account ? 'Connected' : 'Connect'}
                        </Button>

                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;

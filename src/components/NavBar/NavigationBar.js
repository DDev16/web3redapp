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
                    <span className="navbar-title">Web3 Realty</span>
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
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dashboard
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/manage-account">Manage Account</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/check-balance">Check Balance</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/manage-listings">Manage Listings and Rentals</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/account-info">Account Info</Dropdown.Item>
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

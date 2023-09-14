import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar as  Button, Dropdown } from 'react-bootstrap'; // Import Nav and Navbar components
import { Link } from 'react-router-dom'; // Import Link component
import logo from '../assets/logo.png';
import Connect from "../../components/Utils/Connect.js"

function Navbar() {
  const [isOpaque, setIsOpaque] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsOpaque(true);
      } else {
        setIsOpaque(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClass = `custom-navbar ${isOpaque ? 'opaque' : ''}`;

 
  return (
    <nav className={navbarClass}>
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

                    <Nav className="link">
                        <Link to="/" className="nav-link">
                            Buy
                        </Link>
                        <Link to="/properties" className="nav-link">
                            Rent
                        </Link>
                        <Link to="/agents" className="nav-link">
                            Sell
                        </Link>
                        <Link to="/agents" className="nav-link">
                            Invest
                        </Link>
                       


                       
<Dropdown>
    <Dropdown.Toggle variant="info" id="dropdown-basic" className="btn-outline-light">
        Menu
    </Dropdown.Toggle>

    <Dropdown.Menu>
        <Dropdown.Item className="bg-light" as={Link} to="/">Home</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/properties">Properties</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/manage-listings">Agents</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/favorites">Contact</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/favorites">Learning</Dropdown.Item>
        <Dropdown.Item className="bg-light" as={Link} to="/favorites">Home Evaluation</Dropdown.Item>

       
        <Dropdown.Item className="bg-light" as={Link} to="/sign-in">Sign in</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
                        
<Connect />

                    </Nav>
                    
            </Container>
    </nav>
    );
}

export default Navbar;

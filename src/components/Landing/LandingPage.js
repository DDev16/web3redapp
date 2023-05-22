import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  Carousel,
  ListGroup,
  ResponsiveEmbed,
  Spinner,
} from 'react-bootstrap';
import './LandingPage.css';
import realEstateImage1 from '../assets/real-estate-image-1.jpg';
import realEstateImage2 from '../assets/real-estate-image-2.jpg';
import realEstateImage3 from '../assets/real-estate-image-3.jpg';
import agentImage1 from '../assets/agent-image-1.jpg';
import agentImage2 from '../assets/agent-image-2.jpg';
import agentImage3 from '../assets/agent-image-3.jpg';
import GoogleMap from '../map/GoogleMap.js';
import { googleApiKey } from '../../config.js';
import Home from '../Home/Index.jsx';


function LandingPage(props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    const images = document.querySelectorAll("[data-src]");
  
    const imgOptions = {
      root: null, // relative to the viewport
      rootMargin: "0px", // margin around the root
      threshold: 0 // starts observing as soon as even one pixel is visible
    };
  
    const preloadImage = (img) => {
      const src = img.getAttribute("data-src");
      if (!src) {
        return;
      }
      img.src = src;
    }
  
    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          preloadImage(entry.target);
          imgObserver.unobserve(entry.target);
        }
      });
    }, imgOptions);
  
    images.forEach((img) => {
      imgObserver.observe(img);
    });
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this URL with your API endpoint to save the lead's email
      const response = await axios.post('https://your-api-url.com/leads', { email });
      if (response.status === 200) {
        props.history.push('/thankyou');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const PropertyCard = ({ imgSrc, title, description, price }) => (
    <Card className="property-card">
      <Card.Img variant="top" src={imgSrc} className="property-img" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <strong>Price: {price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );

  const AgentCard = ({ imgSrc, name, title, phone, email }) => (
    <Card className="agent-card">
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>{phone}</ListGroup.Item>
          <ListGroup.Item>{email}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );

  
  const center = { lat: 34.474876, lng: -114.34321 }; // Change these coordinates to the desired location
  const zoom = 13;
  
  return (
    <Container>
      <Home />
  
      <div style={{ position: "relative", paddingBottom: "56.25%" /* 16:9 */, height: 0 }}>
  <GoogleMap style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} googleApiKey={googleApiKey} center={center} zoom={zoom} />
</div>

  
      <Row>
        <Col md={6}>
          <Carousel fade={true} indicators={false} interval={2000} pause={false}>
            <Carousel.Item>
              <Image data-src={realEstateImage1} alt="Real Estate Property 1" fluid className="d-block w-100" />
              <Carousel.Caption>
                <h3 style={{ background: "rgba(0, 0, 0, 0.5)" }}>Beautiful Family House</h3>
                <p style={{ background: "rgba(0, 0, 0, 0.5)" }}>$1,200,000</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image data-src={realEstateImage2} alt="Real Estate Property 2" fluid className="d-block w-100" />
              <Carousel.Caption>
                <h3 style={{ background: "rgba(0, 0, 0, 0.5)" }}>Modern Glass Villa</h3>
                <p style={{ background: "rgba(0, 0, 0, 0.5)" }}>$2,750,000</p>
                <p style={{ background: "rgba(0, 0, 0, 0.5)" }}>3 Bedrooms</p>
                <p style={{ background: "rgba(0, 0, 0, 0.5)" }}>2 Baths</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image data-src={realEstateImage3} alt="Real Estate Property 3" fluid className="d-block w-100" />
              <Carousel.Caption>
                <h3 style={{ background: "rgba(0, 0, 0, 0.5)" }}>Modern Glass Villa</h3>
                <p style={{ background: "rgba(0, 0, 0, 0.5)" }}>$2,750,000</p>
                <p style={{ background: "rgba(0, 0, 0, 0.5)" }}>3 Bedrooms</p>
                <p style={{ background: "rgba(0, 0, 0, 0.5)" }}>2 Baths</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
  
        <Col md={6}>
          <Card className="p-4 newsletter-card">
            <Card.Title>Subscribe to Our Newsletter</Card.Title>
            <Card.Text>Enter your email to receive the latest real estate listings and updates:</Card.Text>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
            {message && <p className="text-danger">{message}</p>}
          </Card>
        </Col>
      </Row>
  
      <h2 className="text-center my-5">Featured Properties</h2>
      <Row>
        <Col md={4}>
          <PropertyCard
            imgSrc={realEstateImage1}
            title="Beautiful Family House"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum."
            price="$1,200,000"
          />
        </Col>
        <Col md={4}>
          <PropertyCard
            imgSrc={realEstateImage2}
            title="Modern Glass Villa"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum."
            price="$2,750,000"
          />
        </Col>
        <Col md={4}>
          <PropertyCard
            imgSrc={realEstateImage3}
            title="Cozy Country House"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum."
            price="$850,000"
          />
        </Col>
      </Row>
  
      <h2 className="text-center my-5">Meet Our Team</h2>
      <Row>
        <Col md={4}>
          <AgentCard
            imgSrc={agentImage1}
            name="Dillon Devera"
            title="CEO / Founder / Front/Back End Developer"
            phone="(307) 220-8225"
            email="Web3RealtyAgency@gmail.com"
          />
        </Col>
        <Col md={4}>
          <AgentCard
            imgSrc={agentImage2}
            name="Agent Name 2"
            title="Real Estate Agent"
            phone="(555) 555-5678"
            email="agent2@example.com"
          />
        </Col>
        <Col md={4}>
          <AgentCard
            imgSrc={agentImage3}
            name="Agent Name 3"
            title="Real Estate Agent"
            phone="(555) 555-2468"
            email="agent3@example.com"
          />
        </Col>
      </Row>
  
      <h2 className="text-center my-5">Contact Us</h2>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message"/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h5>Our Office</h5>
          <p>
            123 Main Street
            <br />
            Anytown, USA 12345
            <br />
            Phone: (555) 555-5555
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './PropertyList.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import realEstateImage1 from '../../assets/real-estate-image-1.jpg';


const properties = [
  {
    image: realEstateImage1,
    title: 'Luxurios Family Home',
    description: 'A beautiful and modern family home in the heart of the city.',
    bedrooms: 2,
    bathrooms: 1,
    garage: 1,
    pool: true,
    latitude: 37.7749,
  longitude: -122.4194,
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Modern Family Home',
    description: 'A beautiful and modern family home in the heart of the city.',
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    pool: false,
    latitude: 37.7749,
  longitude: -122.4194,
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Modern Family Home',
    description: 'A beautiful and modern family home in the heart of the city.',
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    pool: false,
    latitude: 37.7749,
  longitude: -122.4194,
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Modern Family Home',
    description: 'A beautiful and modern family home in the heart of the city.',
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    pool: false,
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Modern Family Home',
    description: 'A beautiful and modern family home in the heart of the city.',
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    pool: false,
    latitude: 37.7749,
  longitude: -122.4194,
  },
  {
    image: 'https://via.placeholder.com/300x200',
    title: 'Modern Family Home',
    description: 'A beautiful and modern family home in the heart of the city.',
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    pool: false,
    latitude: 37.7749,
  longitude: -122.4194,
  },
];


function PropertyList() {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className={styles.propertyList}>
      <h1>Available Properties</h1>
      <SearchBar onSearch={setSearchTerm} />
      <Row>
      {filteredProperties.map((property, index) => (
          <Col key={index} xs={12} sm={6} md={4} className={styles.propertyCol}>
            <Link to={`/properties/${index}`} className={styles.propertyLink}>
  <Card className={styles.propertyCard}>
    <Card.Img variant="top" src={property.image} alt="Property" />
    <Card.Body>
      <Card.Title>{property.title}</Card.Title>
      <Card.Text>
        {property.description}
        <br />
        <span>Bedrooms: {property.bedrooms}</span>
        <br />
        <span>Bathrooms: {property.bathrooms}</span>
        <br />
        <span>Garage: {property.garage}</span>
        <br />
        <span>Pool: {property.pool ? 'Yes' : 'No'}</span>
      </Card.Text>
    </Card.Body>
</Card>

</Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PropertyList;

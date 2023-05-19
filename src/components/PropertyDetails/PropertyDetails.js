import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import styles from './PropertyDetails.module.css';
import PropertyMap from '../PropertyMap/PropertyMap';


const properties = [
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
      latitude: 37.7749,
  longitude: -122.4194,
    },
  ];

  function PropertyDetails(props)  {
  const { id } = useParams();
  const property = properties[id];


  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <Container className={styles.propertyDetails}>
      <h1>{property.title}</h1>
      <Row>
        <Col md={6}>
          <Image src={property.image} alt="Property" fluid />
        </Col>
        <Col md={6}>
          <p>{property.description}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Bathrooms: {property.bathrooms}</p>
          <p>Garage: {property.garage}</p>
          <p>Pool: {property.pool ? 'Yes' : 'No'}</p>
        </Col>
      </Row>
      {props.property && <PropertyMap property={props.property} />}
    </Container>
  );
}

export default PropertyDetails;

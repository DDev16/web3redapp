import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function ThankYouPage() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center my-5">
            <Card.Header as="h1">Thank You!</Card.Header>
            <Card.Body>
              <Card.Text>
                We have received your information and will be in touch with the latest real estate listings and
                updates.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ThankYouPage;

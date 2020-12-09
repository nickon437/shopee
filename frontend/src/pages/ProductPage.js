import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import products from '../products';
import Rating from '../components/Rating';

const ProductPage = ({ match }) => {
  const product = products.find((item) => item._id === match.params.id);

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} numReviews={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <ListGroupItem>
              Price: ${product.price}
            </ListGroupItem>
            <ListGroupItem>
              Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </ListGroupItem>
            <ListGroupItem>
              <Button type='button' className='btn-block' disabled={product.countInStock <= 0}>
                Add to Cart
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;

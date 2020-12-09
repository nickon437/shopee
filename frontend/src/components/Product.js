import React from 'react';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
        <a src={`/product/${product._id}`}>
          <Card.Img src={product.image}></Card.Img>
        </a>

        <Card.Body>
          <a src={`/product/${product._id}`}>
            <Card.Title>
              <strong>{product.name}</strong>
            </Card.Title>
          </a>

          <Card.Text as='div'>
            <div className='my-3'>
              {product.rating} from {product.numReviews} reviews
            </div>
          </Card.Text>

          <Card.Text as='h3'>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;

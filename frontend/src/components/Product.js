import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image}></Card.Img>
        </a>

        <Card.Body>
          <a href={`/product/${product._id}`}>
            <Card.Title>
                {product.name}
            </Card.Title>
          </a>

          <Card.Text as='div'>
            <Rating value={product.rating} numReviews={product.numReviews} />
          </Card.Text>

          <Card.Text as='h3'>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;

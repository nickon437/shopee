import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Image,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { fetchProductDetails } from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = ({ match }) => {
  const dispatch = useDispatch();
  const productDetailsState = useSelector((state) => state.productDetailsState);
  const { loading, error, product } = productDetailsState;

  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));
  }, [dispatch, match]);

  const pageContent = () => {
    if (loading) {
      return <Loader />;
    } else if (productDetailsState.error) {
      return <Message variant='danger'>{error}</Message>;
    } else {
      return (
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
                <Rating
                  value={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>
                Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={product.countInStock <= 0}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      );
    }
  };

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {pageContent()}
    </div>
  );
};

export default ProductPage;

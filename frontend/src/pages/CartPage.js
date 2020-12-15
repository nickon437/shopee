import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Message from '../components/Message';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormControl,
  Image,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartPage = ({ match, location }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = Number(location.search?.split('=')[1] ?? 1);

  const { cartItems } = useSelector((state) => state.cartState);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handleRemoveItemFromCart = (id) => {
    console.log('remove');
  };

  const cartContent = (
    <ListGroup variant='flush'>
      {cartItems.map((item) => (
        <ListGroupItem key={item.id}>
          <Row>
            <Col md={2}>
              <Image src={item.image} alt='' fluid rounded />
            </Col>
            <Col md={4}>
              <Link to={`/products/${item.id}`}>{item.name}</Link>
            </Col>
            <Col md={2}>
              <FormControl
                as='select'
                value={item.qty}
                onChange={(e) =>
                  dispatch(addToCart(productId, Number(e.target.value)))
                }
              >
                {[...Array(item.countInStock).keys()].map((index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </FormControl>
            </Col>
            <Col md={2}>${item.qty * item.price}</Col>
            <Col md={2}>
              <Button
                type='button'
                variant='light'
                onClick={(e) => handleRemoveItemFromCart(item.id)}
              >
                <i className='fas fa-trash'></i>
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  );

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length <= 0 ? (
        <Message>
          Your cart is empty - <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>{cartContent}</Col>
        </Row>
      )}
    </div>
  );
};

export default CartPage;

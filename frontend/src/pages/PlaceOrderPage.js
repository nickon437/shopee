import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Image,
  Card,
  Button,
} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PlaceOrderPage = ({ history }) => {
  const cartState = useSelector((state) => state.cartState);
  const { shippingAddress, paymentMethod, cartItems } = cartState;

  if (cartState.cartItems.length === 0) {
    history.push('/cart');
  }

  cartState.itemsPrice = cartState.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cartState.shippingPrice = (cartState.itemsPrice > 100 ? 0 : 100).toFixed(2);
  cartState.taxPrice = (0.15 * cartState.itemsPrice).toFixed(2);
  cartState.totalPrice = (
    Number(cartState.itemsPrice) +
    Number(cartState.shippingPrice) +
    Number(cartState.taxPrice)
  ).toFixed(2);

  return (
    <>
      <CheckoutSteps numSteps={4} />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <div>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order items</h2>
              <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt='' fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Items:</strong>
                  </Col>
                  <Col>${cartState.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Tax:</strong>
                  </Col>
                  <Col>${cartState.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Shipping:</strong>
                  </Col>
                  <Col>${cartState.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>${cartState.totalPrice}</Col>
                </Row>
                <Button className='btn-block'>Place Order</Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;

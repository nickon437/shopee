import { useEffect } from 'react';
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Image,
  Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PlaceOrderPage = ({ match }) => {
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.orderState);
  const { order } = orderState;

  useEffect(() => {
    dispatch(getOrder(match.params.id));
  }, [dispatch, match]);

  const orderPageContent = () => {
    if (orderState.loading) {
      return <Loader />;
    } else if (orderState.error) {
      return <Message variant='danger'>{orderState.error}</Message>;
    } else {
      return (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {order?.shippingAddress.address},{' '}
                  {order?.shippingAddress.city}{' '}
                  {order?.shippingAddress.postalCode},{' '}
                  {order?.shippingAddress.country}
                </p>
                {order?.isDelivered ? (
                  <Message variant='success'>
                    Delivered on{order?.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
                <p>
                  <strong>Name: </strong>
                  {order?.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {order?.user.email}
                </p>
              </ListGroupItem>
              <ListGroupItem>
                <h2>Payment method</h2>
                <p>
                  <strong>Method: </strong>
                  {order?.paymentMethod}
                </p>
                {order?.isPaid ? (
                  <Message variant='success'>Paid on{order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroupItem>
              <ListGroupItem>
                <h2>Order items</h2>
                <ListGroup variant='flush'>
                  {order?.orderItems.map((item, index) => (
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
                    <Col>${order?.itemsPrice}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Tax:</strong>
                    </Col>
                    <Col>${order?.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Shipping:</strong>
                    </Col>
                    <Col>${order?.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Total:</strong>
                    </Col>
                    <Col>${order?.totalPrice}</Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <h1>ORDER {order?._id ?? '#'}</h1>
      {orderPageContent()}
    </>
  );
};

export default PlaceOrderPage;

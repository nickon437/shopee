import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { update } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLoginState = useSelector((state) => state.userLoginState);
  const { userInfo } = userLoginState;

  const userUpdateState = useSelector((state) => state.userUpdateState);
  const { loading, error } = userUpdateState;

  const orderState = useSelector((state) => state.orderState);
  const { loading: isLoadingOrders, error: ordersError, orders } = orderState;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

    dispatch(getMyOrders());
  }, [dispatch, history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    if (password === confirmPassword) {
      dispatch(update({ name, email, password }));
      setMessage(error);
    } else {
      setMessage('Passwords do not match');
    }
  };

  const myOrdersTable = () => {
    if (isLoadingOrders) {
      return <Loader />;
    } else if (ordersError) {
      return <Message variant='danger'>{ordersError}</Message>;
    } else {
      return (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {loading && <Loader />}
        {message && <Message variant='danger'>{message}</Message>}
        {!error && loading === false && (
          <Message variant='success'>Profile has been updated</Message>
        )}
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId='name'>
            <FormLabel>Name</FormLabel>
            <FormControl
              type='name'
              value={name}
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId='email'>
            <FormLabel>Email</FormLabel>
            <FormControl
              type='email'
              value={email}
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl
              type='password'
              value={password}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId='confirmPassword'>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type='password'
              value={confirmPassword}
              placeholder='Enter confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>

          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {myOrdersTable()}
      </Col>
    </Row>
  );
};

export default ProfilePage;

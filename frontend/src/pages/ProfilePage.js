import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { update } from '../actions/userActions';

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

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(update({ name, email, password }));
      setMessage(error);
    } else {
      setMessage('Passwords do not match');
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
      </Col>
    </Row>
  );
};

export default ProfilePage;

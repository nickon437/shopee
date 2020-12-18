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
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split['='][1] : '/';

  const dispatch = useDispatch();
  const userLoginState = useSelector(state => state.userLoginState);
  const { loading, error, userInfo } = userLoginState;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={handleSubmit}>
        {/* <Row>
          <Col xs={12} md={6}> */}
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                type='email'
                value={email}
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                type='password'
                value={password}
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button variant='primary' type='submit'>
              Sign in
            </Button>
          {/* </Col>
        </Row> */}
      </Form>

      <Row className='py-3'>
        <Col>
          {'New customer? '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;

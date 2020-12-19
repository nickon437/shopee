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
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RegisterPage = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const redirect = location.search?.split('=')[1] ?? '/';

  const dispatch = useDispatch();
  const userLoginState = useSelector((state) => state.userLoginState);
  const userRegisterState = useSelector((state) => state.userRegisterState);
  const { loading, error } = userRegisterState;
  const { userInfo } = userLoginState;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
      setMessage(error);
    } else {
      setMessage('Passwords do not match');
    }
  };

  return (
    <FormContainer>
      <h1>Sign up</h1>
      {loading && <Loader />}
      {message && <Message variant='danger'>{message}</Message>}
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
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          {'Have an account? '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;

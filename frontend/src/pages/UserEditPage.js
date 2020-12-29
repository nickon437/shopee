import { useRef, useEffect } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  FormCheck,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserById, updateUserById } from '../actions/userActions';

const UserEditPage = ({ match }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const isAdminRef = useRef(null);

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userState);
  const { loading, error, user, hasUpdatedSuccessful } = userState;

  useEffect(() => {
    if (match.params.id !== user?._id) {
      dispatch(getUserById(match.params.id));
    } else {
      nameRef.current.value = user.name;
      emailRef.current.value = user.email;
      isAdminRef.current.checked = user.isAdmin;
    }
  }, [dispatch, match, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      _id: user._id,
      name: nameRef.current.value,
      email: emailRef.current.value,
      isAdmin: isAdminRef.current.checked,
    };
    dispatch(updateUserById(newUser));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT USER</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {hasUpdatedSuccessful && (
          <Message variant='success'>
            User details has been updated successfully
          </Message>
        )}
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId='name'>
            <FormLabel>Name</FormLabel>
            <FormControl type='text' ref={nameRef} placeholder='Enter name' />
          </FormGroup>
          <FormGroup controlId='email'>
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type='text'
              ref={emailRef}
              placeholder='Enter email address'
            />
          </FormGroup>
          <FormGroup controlId='is-admin'>
            <FormCheck type='checkbox' label='Is Admin' ref={isAdminRef} />
          </FormGroup>
          <Button variant='primary' type='submit'>
            UPDATE
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditPage;

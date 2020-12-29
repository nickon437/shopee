import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserList, deleteUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userState);
  const { loading, error, users, isDeleteSuccess } = userState;

  const userLoginState = useSelector((state) => state.userLoginState);
  const { userInfo } = userLoginState;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push('/');
    }

    dispatch(getUserList());
  }, [dispatch, userInfo, history, isDeleteSuccess]);

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(userId));
    }
  };

  const getUserListContent = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant='danger'>{error}</Message>;
    } else {
      return (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{<a href={`mailto:${user.email}`}>{user.email}</a>}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }} />
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={(e) => handleDeleteUser(user._id)}
                  >
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  };

  return (
    <>
      <h1>Users</h1>
      {getUserListContent()}
    </>
  );
};

export default UserListPage;

import { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteProduct, fetchProductList } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductListPage = ({ history }) => {
  const dispatch = useDispatch();

  const productListState = useSelector((state) => state.productListState);
  const { loading, isUpdating, error, productList } = productListState;

  const userLoginState = useSelector((state) => state.userLoginState);
  const { userInfo } = userLoginState;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push('/');
    }

    dispatch(fetchProductList());
  }, [dispatch, userInfo, history]);

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleCreateProduct = () => {};

  const getProductListContent = () => {
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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {productList?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  {<a href={`mailto:${product.email}`}>{product.email}</a>}
                </td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={(e) => handleDeleteProduct(product._id)}
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
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={handleCreateProduct}>
            <i className='fas fa-plus' /> Create Product
          </Button>
        </Col>
      </Row>
      {isUpdating && <Loader />}
      {getProductListContent()}
    </>
  );
};

export default ProductListPage;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchProductList } from '../actions/productActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const productListState = useSelector((state) => state.productListState);
  const { loading, error, productList } = productListState;

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  const homePageContent = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant='danger'>{error}</Message>;
    } else {
      return (
        <Row>
          {productList.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      );
    }
  };

  return (
    <div>
      <h1>Latest Products</h1>
      {homePageContent()}
    </div>
  );
};

export default HomePage;

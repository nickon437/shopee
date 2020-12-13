import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchProducts } from '../actions/productAction';

const HomePage = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const homePageContent = () => {
    if (productState.loading) {
      return <Loader />;
    } else if (productState.error) {
      return <Message variant='danger'>{productState.error}</Message>;
    } else {
      return (
        <Row>
          {productState.products.map((product) => (
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

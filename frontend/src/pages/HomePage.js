import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { fetchProducts } from '../actions/productAction';

const HomePage = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const homePageContent = () => {
    if (productState.loading) {
      return <h2>Loading...</h2>;
    } else if (productState.error) {
      return <h3>{productState.error}</h3>;
    } else {
      <Row>
        {productState.products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>;
    }
  };

  return (
    <div>
      <h1>Latest Products</h1>
      {homePageContent}
    </div>
  );
};

export default HomePage;

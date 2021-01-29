import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { fetchProductDetails, createReview } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = ({ match }) => {
  const [qty, setQty] = useState(1);
  const ratingRef = useRef(null);
  const commentRef = useRef(null);

  const dispatch = useDispatch();
  const productDetailsState = useSelector((state) => state.productDetailsState);
  const {
    loading,
    isReviewLoading,
    createReviewError,
    error,
    product,
  } = productDetailsState;

  const userLoginState = useSelector((state) => state.userLoginState);
  const { userInfo } = userLoginState;

  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));
  }, [dispatch, match]);

  const submitHandler = (e) => {
    e.preventDefault();

    const productId = match.params.id;
    const rating = ratingRef.current.value;
    const comment = commentRef.current.value;

    dispatch(createReview(productId, rating, comment));

    ratingRef.current.value = '';
    comment.current.value = '';
  };

  const pageContent = () => {
    if (loading) {
      return <Loader />;
    } else if (productDetailsState.error) {
      return <Message variant='danger'>{error}</Message>;
    } else {
      return (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantiy</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Link
                    to={`/cart/${match.params.id}?qty=${qty}`}
                    className='btn btn-dark btn-block'
                    disabled={product.countInStock <= 0}
                  >
                    Add to Cart
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {isReviewLoading && <Loader />}
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {createReviewError && (
                    <Message variant='danger'>{createReviewError}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label></Form.Label>
                        <Form.Control as='select' ref={ratingRef}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          ref={commentRef}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {pageContent()}
    </div>
  );
};

export default ProductPage;

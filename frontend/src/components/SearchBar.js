import { useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { filterProductList } from '../actions/productActions';
import { FILTER_PRODUCT_LIST_REQUEST } from '../constants/productConstants';

const SearchBar = ({ history, location }) => {
  const searchBarRef = useRef(null);

  const dispatch = useDispatch();

  const productListState = useSelector((state) => state.productListState);
  const { hasSearchRequest, isRedirecting } = productListState;

  useEffect(() => {
    if (hasSearchRequest && !isRedirecting) {
      dispatch(filterProductList());
    }
  }, [dispatch, hasSearchRequest, isRedirecting]);

  const handleSearch = (e) => {
    e.preventDefault();

    let isRedirecting = false;
    if (location.pathname !== '/') {
      history.push('/');
      isRedirecting = true;
    }

    dispatch({
      type: FILTER_PRODUCT_LIST_REQUEST,
      payload: {
        searchedInput: searchBarRef.current.value,
        isRedirecting,
      },
    });
  };

  return (
    <Form onSubmit={handleSearch} inline>
      <Form.Control
        type='search'
        name='search'
        ref={searchBarRef}
        placeholder='Search product ...'
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default withRouter(SearchBar);

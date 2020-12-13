import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from '../constants/productConstants';
import axios from 'axios';
import 'redux-thunk';

const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS });

    const { data } = await axios.get('/api/products');

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      error: e.response?.data?.message ?? e.message,
    });
  }
};

export { fetchProducts };

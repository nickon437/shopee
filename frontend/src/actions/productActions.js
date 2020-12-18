import {
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT_LIST_SUCCESS,
  FETCH_PRODUCT_LIST_FAIL,
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';
import axios from 'axios';
import 'redux-thunk';

const fetchProductList = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_LIST });

    const { data } = await axios.get('/api/products');

    dispatch({ type: FETCH_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: FETCH_PRODUCT_LIST_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_DETAILS });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: FETCH_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: FETCH_PRODUCT_DETAILS_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

export { fetchProductList, fetchProductDetails };

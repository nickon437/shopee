import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from '../constants/productConstants';
import axios from 'axios';
import 'redux-thunk';

const productAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_FAIL });

    const { data } = await axios.get('/api/products');

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, products: data });
  } catch (e) {
    dispatch({ type: FETCH_PRODUCTS_FAIL, error: e.response?.data?.message ?? e.message });
  }
}

export default productAction;
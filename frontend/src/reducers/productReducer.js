import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from '../constants/productConstants';

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { loading: true, products: [] };
    case FETCH_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { productListReducer };

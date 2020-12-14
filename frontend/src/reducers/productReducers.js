import {
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT_LIST_SUCCESS,
  FETCH_PRODUCT_LIST_FAIL,
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

const productListReducer = (state = { productList: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_LIST:
      return { loading: true, productList: [] };
    case FETCH_PRODUCT_LIST_SUCCESS:
      return { loading: false, productList: action.payload };
    case FETCH_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAILS:
      return { ...state, loading: true };
    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case FETCH_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer };

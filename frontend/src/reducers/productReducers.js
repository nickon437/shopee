import {
  FETCH_PRODUCT_LIST,
  FETCH_PRODUCT_LIST_SUCCESS,
  FETCH_PRODUCT_LIST_FAIL,
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from '../constants/productConstants';

const productListReducer = (state = { productList: [] }, action) => {
  const refreshState = (state) => ({
    ...state,
    productList: [...state.productList],
    loading: false,
    isUpdating: false,
    error: false,
  });

  const refreshedState = refreshState(state);

  switch (action.type) {
    case FETCH_PRODUCT_LIST:
      return { ...refreshedState, loading: true };

    case DELETE_PRODUCT_REQUEST:
      return { ...refreshedState, isUpdating: true };

    case FETCH_PRODUCT_LIST_SUCCESS:
      return { ...refreshedState, productList: action.payload };

    case FETCH_PRODUCT_LIST_FAIL:
    case DELETE_PRODUCT_FAIL:
      return { ...refreshedState, error: action.payload };
      
    case DELETE_PRODUCT_SUCCESS:
      return refreshedState;

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

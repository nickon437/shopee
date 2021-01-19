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
  CREATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_FAIL,
  REFRESH_PRODUCT,
} from '../constants/productConstants';

const productListReducer = (state = { productList: [] }, action) => {
  const refreshState = (state) => ({
    ...state,
    productList: [...state.productList],
    loading: false,
    isUpdating: false,
    error: null,
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
  const refreshState = (state) => ({
    ...state,
    loading: false,
    isUpdating: false,
    isUpdatedSuccessful: false,
    error: null,
  });

  const refreshedState = refreshState(state);

  switch (action.type) {
    case FETCH_PRODUCT_DETAILS:
      return { ...refreshedState, loading: true };

    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return { ...refreshedState, isUpdating: true };

    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return { ...refreshedState, product: action.payload };

    case CREATE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...refreshedState,
        product: action.payload,
        isUpdatedSuccessful: true,
      };

    case FETCH_PRODUCT_DETAILS_FAIL:
    case CREATE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return { ...refreshedState, error: action.payload };

    case REFRESH_PRODUCT:
      return { ...refreshedState };

    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer };

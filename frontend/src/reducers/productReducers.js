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
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  FILTER_PRODUCT_LIST,
  FILTER_PRODUCT_LIST_REQUEST,
} from '../constants/productConstants';

const productListReducer = (
  state = { fullProductList: [], productList: [] },
  action
) => {
  const refreshState = (state) => ({
    ...state,
    fullProductList: [...state.fullProductList],
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

    case FILTER_PRODUCT_LIST_REQUEST:
      return {
        ...refreshedState,
        searchedInput: action.payload.searchedInput,
        isRedirecting: action.payload.isRedirecting,
        hasSearchRequest: true,
      };

    case FETCH_PRODUCT_LIST_SUCCESS:
      return {
        ...refreshedState,
        fullProductList: action.payload,
        productList: action.payload,
        isRedirecting: false,
      };

    case FILTER_PRODUCT_LIST:
      return {
        ...refreshedState,
        productList: action.payload,
        hasSearchRequest: false,
      };

    case DELETE_PRODUCT_SUCCESS:
      return refreshedState;

    case FETCH_PRODUCT_LIST_FAIL:
    case DELETE_PRODUCT_FAIL:
      return { ...refreshedState, error: action.payload };

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
    isReviewLoading: false,
    isUpdating: false,
    isUpdatedSuccessful: false,
    error: undefined,
    createReviewError: undefined,
  });

  const refreshedState = refreshState(state);

  switch (action.type) {
    case FETCH_PRODUCT_DETAILS:
      return { ...refreshedState, loading: true };

    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return { ...refreshedState, isUpdating: true };

    case CREATE_REVIEW_REQUEST:
      return { ...refreshedState, isReviewLoading: true };

    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return { ...refreshedState, product: action.payload };

    case CREATE_PRODUCT_SUCCESS:
    case CREATE_REVIEW_SUCCESS:
      return {
        ...refreshedState,
        product: action.payload,
      };

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

    case CREATE_REVIEW_FAIL:
      return { ...refreshedState, createReviewError: action.payload };

    case REFRESH_PRODUCT:
      return { ...refreshedState };

    default:
      return state;
  }
};

const imageUploadReducer = (state = {}, action) => {
  const refreshState = (state) => ({
    ...state,
    isLoading: false,
    error: null,
  });

  const refreshedState = refreshState(state);

  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { ...refreshedState, isLoading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { ...refreshedState, imagePath: action.payload };
    case UPLOAD_IMAGE_FAIL:
      return { ...refreshedState, error: action.payload };
    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer, imageUploadReducer };

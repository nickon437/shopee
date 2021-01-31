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
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  FILTER_PRODUCT_LIST,
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

const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: DELETE_PRODUCT_SUCCESS });

    dispatch(fetchProductList());
  } catch (e) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, product, config);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product.id}`,
      product,
      config
    );

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

const uploadImage = (file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    const formData = new FormData();
    formData.append('image', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post('/api/upload', formData, config);

    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPLOAD_IMAGE_FAIL, payload: error });
  }
};

const createReview = (productId, rating, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/products/${productId}/review`,
      { rating, comment },
      config
    );

    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

const filterProductList = () => async (dispatch, getState) => {
  const searchedInput = getState().productListState.searchedInput;
  const fullProductList = getState().productListState.fullProductList;
  const productList = searchedInput
    ? fullProductList.filter((product) =>
        product.name.toLowerCase().includes(searchedInput.toLowerCase())
      )
    : fullProductList;

  dispatch({ type: FILTER_PRODUCT_LIST, payload: productList });
};

export {
  fetchProductList,
  fetchProductDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  uploadImage,
  createReview,
  filterProductList,
};

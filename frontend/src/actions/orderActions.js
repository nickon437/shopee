import 'redux-thunk';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from '../constants/orderConstants';
import axios from 'axios';
import { CART_RESET } from '../constants/cartConstants';

const addOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/orders', order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    dispatch({ type: CART_RESET });
    localStorage.removeItem('cartItems');
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

const getOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAY_ORDER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: PAY_ORDER_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: PAY_ORDER_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_ORDERS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/orders/myorders', config);

    dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

export { addOrder, getOrder, payOrder, getMyOrders };

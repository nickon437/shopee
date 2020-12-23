import 'redux-thunk';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
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

export { addOrder, getOrder };

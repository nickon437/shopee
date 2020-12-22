import 'redux-thunk';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from '../constants/orderConstants';
import axios from 'axios';

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
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

export { addOrder };

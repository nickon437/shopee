import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants';
import 'redux-thunk';
import axios from 'axios';

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/user/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem('userInfo');
};

const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/user/',
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

export { login, logout, register };

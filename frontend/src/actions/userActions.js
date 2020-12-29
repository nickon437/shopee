import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
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
  localStorage.clear();
  window.location.reload();
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

const update = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/user/profile', user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: e.response?.data?.message ?? e.message,
    });
  }
};

const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_USER_LIST_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/user/', config);

    dispatch({ type: FETCH_USER_LIST_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: FETCH_USER_LIST_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    await axios.delete(`/api/user/${userId}`, config);

    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (e) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

const getUserById = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_USER_DETAILS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user/${userId}`, config);

    dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: FETCH_USER_DETAILS_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

const updateUserById = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginState.userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/user/${user._id}`, user, config);

    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
};

export {
  login,
  logout,
  register,
  update,
  getUserList,
  deleteUser,
  getUserById,
  updateUserById,
};

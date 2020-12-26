import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../constants/userConstants';

const resetState = (state) => {
  return {
    ...state,
    loading: false,
    error: undefined,
    users: undefined,
    isDeleteSuccess: undefined,
  };
};

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, error: null };
    case USER_REGISTER_SUCCESS:
      return { loading: false };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true, error: null };
    case USER_UPDATE_SUCCESS:
      return { loading: false };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  const resettedState = resetState(state);

  switch (action.type) {
    case FETCH_USER_LIST_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...resettedState, loading: true };

    case FETCH_USER_LIST_SUCCESS:
      return { ...resettedState, users: action.payload };

    case FETCH_USER_LIST_FAIL:
    case DELETE_USER_FAIL:
      return { ...resettedState, error: action.payload };

    case DELETE_USER_SUCCESS:
      return { ...resettedState, isDeleteSuccess: true };

    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userReducer,
};

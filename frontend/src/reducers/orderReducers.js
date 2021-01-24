import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
} from '../constants/orderConstants';

const orderReducer = (state = {}, action) => {
  const refreshedState = {
    ...state,
    loading: false,
    error: undefined,
    processingPayment: false,
    createdOrder: undefined,
    order: undefined,
    orders: undefined,
    isPaymentSuccess: undefined,
  };

  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
    case GET_MY_ORDERS_REQUEST:
      return { ...refreshedState, loading: true };

    case PAY_ORDER_REQUEST:
      return { ...refreshedState, processingPayment: true };

    case CREATE_ORDER_SUCCESS:
      return { ...refreshedState, createdOrder: action.payload };

    case GET_ORDER_SUCCESS:
      return { ...refreshedState, order: action.payload };

    case GET_MY_ORDERS_SUCCESS:
      return { ...refreshedState, orders: action.payload };

    case PAY_ORDER_SUCCESS:
      return {
        ...refreshedState,
        order: action.payload,
        isPaymentSuccess: true,
      };

    case CREATE_ORDER_FAIL:
    case GET_ORDER_FAIL:
    case PAY_ORDER_FAIL:
    case GET_MY_ORDERS_FAIL:
      return { ...refreshedState, error: action.payload };

    default:
      return state;
  }
};

const orderListReducer = (state = {}, action) => {
  const refreshedState = {
    ...state,
    loading: false,
    error: null,
  };

  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { ...refreshedState, loading: true };
    case GET_ALL_ORDERS_SUCCESS:
      return { ...refreshedState, orderList: action.payload };
    case GET_ALL_ORDERS_FAIL:
      return { ...refreshedState, error: action.payload };
    default:
      return state;
  }
};

export { orderReducer, orderListReducer };

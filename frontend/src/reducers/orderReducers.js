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
  CLEAR_PAYMENT_SUCCESS,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from '../constants/orderConstants';

const orderReducer = (state = {}, action) => {
  const resettedState = resetState(state);

  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
    case GET_MY_ORDERS_REQUEST:
      return { ...resettedState, loading: true };

    case PAY_ORDER_REQUEST:
      return { ...resettedState, processingPayment: true };

    case CREATE_ORDER_SUCCESS:
      return { ...resettedState, createdOrder: action.payload };

    case GET_ORDER_SUCCESS:
      return { ...resettedState, order: action.payload };

    case GET_MY_ORDERS_SUCCESS:
      return { ...resettedState, orders: action.payload };

    case PAY_ORDER_SUCCESS:
      return {
        ...resettedState,
        order: action.payload,
        isPaymentSuccess: true,
      };

    case CREATE_ORDER_FAIL:
    case GET_ORDER_FAIL:
    case PAY_ORDER_FAIL:
    case GET_MY_ORDERS_FAIL:
      return { ...resettedState, error: action.payload };

    case CLEAR_PAYMENT_SUCCESS:
      return { ...state, isPaymentSuccess: undefined };

    default:
      return state;
  }
};

const resetState = (state) => {
  return {
    ...state,
    loading: false,
    error: undefined,
    processingPayment: false,
    createdOrder: undefined,
    order: undefined,
    orders: undefined,
    isPaymentSuccess: undefined,
  };
};

export { orderReducer };

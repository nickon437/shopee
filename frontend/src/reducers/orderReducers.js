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
} from '../constants/orderConstants';

const orderReducer = (state = {}, action) => {
  const resettedState = resetState(state);

  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
      return { ...resettedState, loading: true };

    case PAY_ORDER_REQUEST:
      return { ...resettedState, processingPayment: true };

    case CREATE_ORDER_SUCCESS:
      return { ...resettedState, createdOrder: action.payload };

    case GET_ORDER_SUCCESS:
      return { ...resettedState, order: action.payload };

    case CREATE_ORDER_FAIL:
    case GET_ORDER_FAIL:
    case PAY_ORDER_FAIL:
      return { ...resettedState, error: action.payload };

    case PAY_ORDER_SUCCESS:
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
  };
};

export { orderReducer };

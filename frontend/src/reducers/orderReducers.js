import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
} from '../constants/orderConstants';

const orderReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
      return { ...state, loading: true, error: undefined };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, createdOrder: action.payload };
    case GET_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case CREATE_ORDER_FAIL:
    case GET_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { orderReducer };

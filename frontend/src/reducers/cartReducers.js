import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const productToAdd = action.payload;

      const curItemInCart = state.cartItems.find(
        (item) => item.id === productToAdd.id
      );

      if (curItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item === curItemInCart ? productToAdd : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, productToAdd] };
      }
    case CART_REMOVE_ITEM:
      const productIdToRemove = action.payload;
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== productIdToRemove
      );
      return { ...state, cartItems: newCartItems };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export { cartReducer };

import { CART_ADD_ITEM } from '../constants/cartConstants';

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const toAddProduct = action.payload;

      const curItemInCart = state.cartItems.find(
        (item) => item.id === toAddProduct.id
      );

      if (curItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item === curItemInCart ? toAddProduct : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, toAddProduct] };
      }

    default:
      return state;
  }
};

export { cartReducer };

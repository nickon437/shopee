import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

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
    default:
      return state;
  }
};

export { cartReducer };

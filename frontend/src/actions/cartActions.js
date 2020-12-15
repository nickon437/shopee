import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

import axios from 'axios';

const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cartState.cartItems));
}

const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cartState.cartItems));
}

export { addToCart, removeFromCart };
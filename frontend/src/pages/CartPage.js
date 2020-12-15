import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const CartPage = ({ match, location }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = Number(location.search?.split('=')[1] ?? 1); 

  useEffect(() => {
    dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);



  return (
    <div>
      Cart
    </div>
  )
}

export default CartPage;

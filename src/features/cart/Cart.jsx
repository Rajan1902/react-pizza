// import { useNavigate } from 'react-router-dom';


import CartItem from './CartItem';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCartItems } from './cartSlice';
import { getUsername } from '../user/userSlice';
import EmptyCart from './EmptyCart';
import LinkButton from '../../UI/LinkButton';

function Cart() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleClearCart = () =>{
    dispatch(clearCart());
    // navigate('../empty-cart');
  }
  // const cart = fakeCart;
  const cart = useSelector(getCartItems);
  const username = useSelector(getUsername);
  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button onClick={handleClearCart} type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;

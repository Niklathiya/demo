import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { increaseQuantity, decreaseQuantity } from './redux/reducer';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
            <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

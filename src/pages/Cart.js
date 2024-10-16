import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeMealFromCart, clearCart, updateMealQuantity } from '../redux/mealsReducer';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.meals.cart);

    const totalPrice = cart.reduce((total, meal) => total + (meal.price * meal.quantity), 0).toFixed(2);

    const handleRemove = (id) => {
        dispatch(removeMealFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (meal, quantity) => {
        const newQuantity = parseInt(quantity, 10);
        dispatch(updateMealQuantity({ id: meal.id, quantity: newQuantity }));
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map(meal => (
                            <div className="cart-item" key={meal.id}>
                                <div className="item-info">
                                    <h2>{meal.name}</h2>
                                    <p>Price: ${meal.price}</p>
                                    <div>
                                        <label htmlFor={`quantity-${meal.id}`}>Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity-${meal.id}`}
                                            min={1}
                                            value={meal.quantity}
                                            onChange={e => handleQuantityChange(meal, e.target.value)} 
                                        />
                                    </div>
                                    <h3>${(meal.price * meal.quantity).toFixed(2)}</h3>
                                </div>
                                <button className="btn btn-danger" onClick={() => handleRemove(meal.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="total">
                        <h2>Total: ${totalPrice}</h2>
                    </div>
                    <button className="checkout-button">Proceed to Checkout</button>
                    <button className="btn btn-danger w-100 my-1" onClick={handleClearCart}>Clear cart</button>
                    <button className="btn btn-warning w-100 my-1" onClick={()=>navigate('/')}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default Cart;

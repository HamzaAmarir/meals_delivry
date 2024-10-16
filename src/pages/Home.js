import React, { useEffect, useState } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { addMealToCart, fetchMeals } from '../redux/mealsReducer';

const Home = () => {
  const [quantities, setQuantities] = useState({});
  const [searchText, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const meals = useSelector(state => state.meals.meals);
  const filteredMeals = meals.filter(meal =>
    meal.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleQuantityChange = (mealId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [mealId]: Math.max(1, value) 
    }));
  };

  const addMeal = (meal) => {
    const quantity = quantities[meal.id] || 1; 
    dispatch(addMealToCart({ ...meal, quantity }));
  };

  return (
    <div className="meal-container">
      <input
        type='text'
        placeholder='search meals by name...'
        className='form-control my-3'
        value={searchText}
        onChange={e => setSearch(e.target.value)}
      />
      {filteredMeals.map(meal => (
        <div className="meal-card" key={meal.id}>
          <div className='meal-info'>
            <h2>{meal.name}</h2>
            <p>{meal.description}</p>
            <h3>{meal.price}</h3>
          </div>
          <div className='meal-actions'>
            <div>
              <label htmlFor={`qte_${meal.id}`}>Amount</label>
              <input
                type='number'
                name='qte'
                id={`qte_${meal.id}`}
                className='mx-1'
                min={1}
                value={quantities[meal.id] || 1}
                onChange={e => handleQuantityChange(meal.id, Number(e.target.value))}
              />
            </div>
            <button className='add-button mx-1' onClick={() => addMeal(meal)}>Add+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

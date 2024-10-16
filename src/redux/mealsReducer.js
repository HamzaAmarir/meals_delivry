import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch meals
export const fetchMeals = createAsyncThunk('meals/fetchMeals', async (_, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3000/meals');
        const data = await res.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const mealsReducer = createSlice({
    name: 'meals',
    initialState: { meals: [], error: null, cart: [] },
    reducers: {
        addMealToCart: (state, action) => {
            const { id, quantity } = action.payload;

            if (quantity > 0) {
                const existingMeal = state.cart.find(meal => meal.id === id);

                if (existingMeal) {
                    existingMeal.quantity += quantity;
                } else {
                    state.cart.push({ ...action.payload, quantity });
                }
            }
        },
        updateMealQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingMeal = state.cart.find(meal => meal.id === id);

            if (existingMeal) {
                if (quantity > 0) {
                    existingMeal.quantity = quantity;
                } else {
                    state.cart = state.cart.filter(meal => meal.id !== id);
                }
            }
        },
        removeMealFromCart: (state, action) => {
            state.cart = state.cart.filter(meal => meal.id !== action.payload);
        },
        clearCart: (state) => {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                console.log('Fetching meals...');
            })
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.meals = action.payload;
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { addMealToCart, removeMealFromCart, clearCart, updateMealQuantity } = mealsReducer.actions;
export default mealsReducer.reducer;

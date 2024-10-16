import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from './mealsReducer';


const store = configureStore({
    reducer : {
        meals : mealsReducer
    }
})

export default store
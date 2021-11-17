import { createSlice } from "@reduxjs/toolkit";
import { pizzaDetails } from "./fakeData";
const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState: pizzaDetails,
    reducers: {
        
    }
})
export default pizzaSlice.reducer;
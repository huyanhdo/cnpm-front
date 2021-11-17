import { createSlice } from "@reduxjs/toolkit";
import { toppings } from "./fakeData";
const toppingSlice = createSlice({
    name: 'toppings',
    initialState: toppings,
    reducers: {
        
    }
})
export default toppingSlice.reducer;
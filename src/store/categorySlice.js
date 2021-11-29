import { createSlice } from "@reduxjs/toolkit";
import { categories } from "./fakeData";
const categorySlice = createSlice({
    name: 'categories',
    initialState: categories,
    reducers: {
        
    }
})
export default categorySlice.reducer;
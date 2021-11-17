import { createSlice } from "@reduxjs/toolkit";
import {combos} from './fakeData';
const comboSlice = createSlice({
    name: 'combos',
    initialState: combos,
    reducers: {
        
    }
})
export default comboSlice.reducer;
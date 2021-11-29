import { createSlice } from "@reduxjs/toolkit";
import { extras } from "./fakeData";
const extraSlice = createSlice({
    name: 'extras',
    initialState: extras,
    reducers: {
        
    }
})
export default extraSlice.reducer;
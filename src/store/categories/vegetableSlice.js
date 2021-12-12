import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');
const initialState = {
    ids:[],
    entities: {},
    fetchingStatus: 'INITIAL'
}
export const fetchAllVegetables = createAsyncThunk('vegetables/fetchAllVegetables', async ()=>{
    try{
        const response = await axios.get('https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_vegetarian.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const vegetableSlice = createSlice({
    name: 'vegetables',
    initialState: initialState,
    reducers: {
        
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllVegetables.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllVegetables.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllVegetables.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default vegetableSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');
const initialState = {
    ids:[],
    entities: {},
    fetchingStatus: 'INITIAL'
}
export const fetchAllDrinks = createAsyncThunk('drinks/fetchAllDrinks', async ()=>{
    try{
        const response = await axios.get('https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_drink.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const drinkSlice = createSlice({
    name: 'drinks',
    initialState: initialState,
    reducers: {
        
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllDrinks.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllDrinks.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllDrinks.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default drinkSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require('axios');

export const fetchAllPizzas = createAsyncThunk('pizzas/fetchAllPizzas', async () =>{
    try{
        const response = await axios.get('https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_main_courses.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const initialState = {
    ids:[],
    entities:{},
    fetchingStatus: 'INITIAL'
}
const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState: initialState,
    reducers: {
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllPizzas.pending, (state,action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllPizzas.fulfilled, (state,action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllPizzas.rejected, (state,action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default pizzaSlice.reducer;
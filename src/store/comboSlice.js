import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const axios = require('axios');
export const fetchAllCombos = createAsyncThunk('combos/fetchAllCombos', async () =>{
    try{
        const response = await axios.get('https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/combo.json');
        return response.data;
    }catch(err){
        console.error(err)
    }
})
const comboSlice = createSlice({
    name: 'combos',
    initialState: {
        ids:[],
        entities:{},
        fetchingStatus: 'INITIAL'
    },
    reducers: {
        
    },
    extraReducers(builders){
        builders
        .addCase(fetchAllCombos.pending, (state, action)=>{
            state.fetchingStatus = 'LOADING'
        })
        .addCase(fetchAllCombos.fulfilled, (state, action)=>{
            state.fetchingStatus = 'SUCCESS'
            state.ids = Object.keys(action.payload)
            state.entities = action.payload
        })
        .addCase(fetchAllCombos.rejected, (state, action)=>{
            state.fetchingStatus = 'FAILED'
        })
    }
})
export default comboSlice.reducer;
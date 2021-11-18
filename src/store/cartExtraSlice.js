import { createSlice } from "@reduxjs/toolkit";
import { cartExtras } from "./fakeData";
const cartExtraSlice = createSlice({
    name: 'cartExtras',
    initialState: cartExtras,
    reducers: {
        itemAdded(state, action){
            const extraId = action.payload.extraId;
            const existingId = state.ids.find(id => id === extraId);
            if(existingId !== undefined){
                state.entities[extraId].number += action.payload.number;
                state.entities[extraId].total += action.payload.total;
            }else{
                state.ids.push(extraId);
                state.entities[extraId] = {number: action.payload.number, total: action.payload.total}
            }
        },
        itemRemoved(state, action){
            const id = action.payload;
            const index = state.ids.indexOf(id);
            if(index !== -1){
                state.ids.splice(index, 1);
            }
        },itemUpdated(state, action){
            const id = action.payload.id;
            state.entities[id] = action.payload.data;
        }
    }
})
export const {itemAdded, itemRemoved, itemUpdated} = cartExtraSlice.actions;
export default cartExtraSlice.reducer;
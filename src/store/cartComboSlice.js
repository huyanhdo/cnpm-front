import { createSlice } from "@reduxjs/toolkit";
import { cartCombos } from "./fakeData";
const cartComboSlice = createSlice({
    name: 'cartCombos',
    initialState: cartCombos,
    reducers: {
        itemAdded(state, action){
            const comboId = action.payload.comboId;
            const existingId = state.ids.find(id => id === comboId);
            if(existingId !== undefined){
                state.entities[comboId].number += action.payload.number;
                state.entities[comboId].total += action.payload.total;
            }else{
                state.ids.push(comboId);
                state.entities[comboId] = {number: action.payload.number, total: action.payload.total}
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
export const {itemAdded, itemRemoved, itemUpdated} = cartComboSlice.actions;
export default cartComboSlice.reducer;
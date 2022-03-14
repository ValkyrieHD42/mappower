import {createSlice} from "@reduxjs/toolkit";

export const startingPointSlice = createSlice({
    name: "startingPoints",
    initialState: {
        value: {
            lat: 0.00,
            long: 0.00
        }},
    reducers: {
        createCoord: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { createCoord } = coodinatesSlice.actions;

export default coodinatesSlice.reducer;
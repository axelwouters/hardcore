import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    hardcores: []
}

export const hardcoreSlice = createSlice({
    name: "hardcores",
    initialState,
    reducers: {
        loadHardcores: (state, action) => {
            state.hardcores = action.payload
        }
    }
})

export const {loadHardcores} = hardcoreSlice.actions
export const selectHardcores = (state) => state.hardcores
export default hardcoreSlice.reducer
import {createSlice} from "@reduxjs/toolkit"
//on definit l'etat initial du slice
const initialState = {
    hardcores: []
}

//On fait une creation d'un slice de redux appellés hardcore
export const hardcoreSlice = createSlice({
    name: "hardcores",
    initialState,
    reducers: {
        loadHardcores: (state, action) => {
            state.hardcores = action.payload //on met a jour la liste des produit
        }
    }
})

export const {loadHardcores} = hardcoreSlice.actions
export const selectHardcores = (state) => state.hardcores
export default hardcoreSlice.reducer
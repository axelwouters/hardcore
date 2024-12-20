//par défault c'est un objet vide pour infos et false pour isLogged
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    infos: {},
    isLogged: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        connectUser: (state, action) => {
            console.log("Payload reçu :", action.payload);
console.log("État utilisateur après connexion :", state);
            state.infos = action.payload
            state.isLogged = true
        },
        logoutUser: (state) => {
            state.infos = {}
            state.isLogged = false
        }
    }
})


export const {connectUser, logoutUser} = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer
//par défault c'est un objet vide pour infos et false pour isLogged
import {createSlice} from "@reduxjs/toolkit"

//On definie l'etat initial du sliceUser
const initialState = {
    infos: {}, //objet vide qui contiendra les infos de l'utilisateur
    isLogged: false // Un booléen qui indique si l'utilisateur est connecter
}

//C'est la création du sliceUser
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //Une action pour connecter un utilisateur
        connectUser: (state, action) => { 
            console.log("Payload reçu :", action.payload);
            state.infos = action.payload //on stocke les infos
            state.isLogged = true //indique qui est connecter
        },
        //Action pour deconnecter l'utilisateur
        logoutUser: (state) => {
            state.infos = {}
            state.isLogged = false
        }
    }
})


export const {connectUser, logoutUser} = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer
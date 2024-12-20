import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import hardcoreReducer from "./hardcoreSlice"
import basketReducer from "./basketSlice"
import { connectUser } from '../slices/userSlice';


const store = configureStore({
reducer: {
    user: userReducer,
    hardcores: hardcoreReducer,
    basket: basketReducer
}

})
//store.dispatch(connectUser({ id: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com' }));
//console.log('State after connectUser action:', store.getState());

//console.log("erreur1",user)
export default store
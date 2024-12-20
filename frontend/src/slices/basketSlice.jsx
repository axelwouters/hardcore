import { createSlice } from "@reduxjs/toolkit";

// Récupération sécurisée du panier dans le localStorage
let lsBasket;
try {
    const storedBasket = window.localStorage.getItem("b4y-basket");
    lsBasket = storedBasket ? JSON.parse(storedBasket) : null;
} catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    lsBasket = null;
}

// Si je n'ai pas de panier dans mon storage ou s'il y a eu une erreur
if (lsBasket === null) {
    // On initialise un panier vide
    lsBasket = [];
}

// Function qui calculera le prix total du panier
const calculateTotalAmount = (basket) => {
    return basket.reduce((price, b) => {
        return price + (parseInt(b.quantityInCart) || 0) * (parseFloat(b.price) || 0);
    }, 0);
};

// On appelle la fonction pour initialiser un prix par défaut lors du chargement
let myPrice = calculateTotalAmount(lsBasket);

const initialState = {
    basket: lsBasket,
    totalPrice: myPrice
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        modifyBasket: (state, action) => {
            state.basket = action.payload;
            state.totalPrice = calculateTotalAmount(action.payload);
            // Mise à jour du localStorage
            window.localStorage.setItem("b4y-basket", JSON.stringify(action.payload));
        },
        cleanBasket: (state) => {
            state.basket = [];
            state.totalPrice = 0;
            // Suppression du panier dans le localStorage
            window.localStorage.removeItem("b4y-basket");
        }
    }
});

export const { modifyBasket, cleanBasket } = basketSlice.actions;
export const selectBasket = (state) => state.basket;
export default basketSlice.reducer;
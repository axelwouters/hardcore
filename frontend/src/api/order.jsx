import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("hardcore-token")

//
const getToken = () =>{
    const token = window.localStorage.getItem("hardcore-token");
    if(!token) {
        throw new Error("Token d'authentification manquant")
    }
    return token;
}

// On fait une création d'une instance axios avec configuration de base
const apiClient = axios.create({
    baseURL: config.api_url,
    headers: {
        'Content-Type': 'application/json'
    }
});

//Je vais sauvegarder une commande et faire une sauvegarde d'une commande avec vérification
export async function saveOneOrder(datas) {
    try {
        const token = getToken();
        const response = await apiClient.post('/api/v1/order/save', datas, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur saveOneOrder:", error.response || error);
        return {
            status: error.response?.status || 500,
            msg: error.response?.data?.message || "Erreur lors de la sauvegarde de la commande"
        };
    }
}

//Je fais une vérification du paiement
// Fonction de vérification du paiement améliorée
export async function checkPayment(datas) {
    try {
        const token = getToken();
        console.log("Token récupéré:", token);
        
        const response = await apiClient.post('/api/v1/order/payment', datas, {
            headers: {
                "x-access-token": token
            }
        });
        
        console.log("Réponse du serveur:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur checkPayment:", error.response || error);
        return {
            status: error.response?.status || 500,
            msg: error.response?.data?.message || "Erreur lors de la vérification du paiement"
        };
    }
}

//Je vais valider le paiement 
// Mise à jour de la commande avec meilleure gestion des erreurs
export async function updateOrder(datas) {
    try {
        const token = getToken();
        const response = await apiClient.put('/api/v1/order/validate', datas, {
            headers: {
                "x-access-token": token
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur updateOrder:", error.response || error);
        return {
            status: error.response?.status || 500,
            msg: error.response?.data?.message || "Erreur lors de la mise à jour de la commande"
        };
    }
}

//Je récupére toute les comaandes 
export function getAllOrders(){
    return axios.get(`${config.api_url}/api/v1/order/all`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

 //Fonction pour récupérer les commandes
 export function getUserOrders(){
    const token = window.localStorage.getItem("hardcore-token");
    return axios.get(`${config.api_url}/api/v1/order/user`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch(()=>{
        return err
    })
 }

//Les details d''une commande
export function getOneOrder(id){
    return axios.get(`${config.api_url}/api/v1/order/getOneOrder/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })

   
}
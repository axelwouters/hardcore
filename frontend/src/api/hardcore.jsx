import axios from "axios"
import { config } from "../config"
const token = window.localStorage.getItem('hardcore-token')

//Je recupere toutes mes bombes hardcores
export function displayHardcores() {
    return axios.get(`${config.api_url}/api/v1/hardcore/all`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//Je récupere une seule bombe hardcore
export function takeOneHardcore(id){
    return axios.get(`${config.api_url}/api/v1/hardcore/one/${id}`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}


// Fonction utilitaire pour obtenir le token le plus récent
const getToken = () => {
    const token = window.localStorage.getItem('hardcore-token');
    console.log("Token utilisé pour la requête:", token);
    return token;
}


//J'ajoute une bombe hardcore
export function addOneHardcore(datas){
    const token = getToken();
    console.log("Token pour addOneHardcore:", token);
    
    return axios.post(
        `${config.api_url}/api/v1/hardcore/save`, 
        datas, 
        {
            headers: {
                "x-access-token": token,
                "Authorization": `Bearer ${token}`
            }
        }
    )
    .then((res)=>{
        console.log("Réponse addOneHardcore:", res);
        return res.data;
    })
    .catch((err)=>{
        console.error("Erreur addOneHardcore:", err);
        return err;
    })
}

//On modifie une bombe hardcore
export function updateOneHardcore(datas, id){
    return axios.put(`${config.api_url}/api/v1/hardcore/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//On modifie une bombe hardcore
export function updateQuantityHardcore(datas, id){
    return axios.put(`${config.api_url}/api/v1/hardcore/update2/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

//On supprime une bombe hardcore
export function deleteOneHardcore(id){
    console.log("Tentative de suppression de l'hardcore avec l'ID:", id);
    return axios.delete(`${config.api_url}/api/v1/hardcore/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res) => {
        console.log("Réponse complète de l'API:", res);
        return {
            status: res.status,
            data: res.data
        };
    })
    .catch((err) => {
        console.error("Erreur détaillée lors de la suppression:", err);
        if (err.response) {
            return {
                status: err.response.status,
                data: err.response.data
            };
        }
        return {
            status: 500,
            data: { message: "Erreur interne" }
        };
    });
}
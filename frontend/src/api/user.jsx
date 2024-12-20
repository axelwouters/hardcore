import axios from "axios"
import {config} from "../config"

// Supprimez cette ligne
// const token = window.localStorage.getItem('hardcore-token')

export function addOneUser(datas){
    return axios.post(`${config.api_url}/api/v1/user/save`, datas)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function loginUser(datas){
    return axios.post(`${config.api_url}/api/v1/user/login`, datas)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function updateProfil(datas, id){
    // Récupérer le token au moment de l'appel
    const token = window.localStorage.getItem('hardcore-token')
    
    return axios.put(
        `${config.api_url}/api/v1/user/update/${id}`, 
        datas, 
        {
            headers: {
                "x-access-token": token
            }
        }
    )
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function deleteUser(id){
    // Récupérer le token au moment de l'appel
    const token = window.localStorage.getItem('hardcore-token')
    
    return axios.delete(
        `${config.api_url}/api/v1/user/delete/${id}`, 
        {
            headers: {
                "x-access-token": token
            }
        }
    )
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function checkMyToken(){
    const token = window.localStorage.getItem("hardcore-token")
    return axios.get(
        `${config.api_url}/api/v1/users/checkToken`, 
        {
            headers: {
                "x-access-token": token
            }
        }
    )
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.error("erreur dans mon token", err.response ? err.response.data : err.message)
        return err
    })
}
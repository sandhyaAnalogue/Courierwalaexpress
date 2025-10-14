import axios from "axios"
export const BASE_URL = "http://192.168.29.58:8001";



export const createOrderAPI = async (amount) => {
    const apiReqData = {
        price: amount
    }
    return axios.post(`${BASE_URL}/createorder`, apiReqData)
}

export const verifyOrderAPI = async (paymentData) => {
    return axios.post(`${BASE_URL}/verifyorder`, paymentData)
}


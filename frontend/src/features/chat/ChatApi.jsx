import { axiosi } from "../../config/axios"

export const generateResponse=async(data)=>{
    try {
        const res=await axiosi.post(`/ai/generate`,data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const uploadFile=async(data)=>{
    try {
        const res=await axiosi.post(`/files/upload`,data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getFiles=async()=>{
    try {
        const res=await axiosi.get(`/files`,)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getLectures=async()=>{
    try {
        const res=await axiosi.get(`/lectures`,)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
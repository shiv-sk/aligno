/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const getAndDeleteReq = async(url: string , method: "GET" | "DELETE")=>{
    try {
        const response = await axios({
            url,
            method,
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        // console.log("response from getAndDeleteReq! " , response?.data);
        return response?.data;
    } catch (error: any) {
        console.log("error from getAndDeleteReq! " , error?.response?.data);
        throw error;
    }
}

const postAndPatchReq = async(url: string , method: "POST" | "PATCH" , data: object | FormData , isFormData=false)=>{
    try {
        const response = await axios({
            url,
            method,
            data,
            headers:{
                "Content-Type":isFormData ? "multipart/form-data" : "application/json"
            },
            withCredentials:true
        })
        // console.log("response from postAndPatchReq! " , response?.data);
        return response?.data;
    } catch (error: any) {
        console.log("error from getAndDeleteReq! " , error?.response);
        throw error;
    }
}

export {getAndDeleteReq , postAndPatchReq};
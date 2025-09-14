/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq, postAndPatchReq } from "@/apiCalls/apiCalls";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface User{
    _id:string,
    name:string,
    isAdmin:boolean,
    email:string,
    createdAt:string
}

interface RegisterData{
    name:string,
    email:string,
    password:string,
}

interface LoginData{
    email:string,
    password:string,
}

interface AuthResponse{
    success:boolean,
    data?:User,
    error?:string
}

interface AuthContextType{
    user:User | null,
    isLoading:boolean,
    logoutUser:()=>Promise<AuthResponse>,
    registerUser:(data:RegisterData)=>Promise<AuthResponse>,
    loginUser:(data:LoginData)=>Promise<AuthResponse>,
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    registerUser: async () => ({ success: false, error: "Not implemented" }),
    loginUser: async () => ({ success: false, error: "Not implemented" }),
    logoutUser: async () => ({ success: false, error: "Not implemented" }),
});

const useAuth = ()=>useContext(AuthContext);


const AuthProvider = ({ children }: { children: ReactNode })=>{
    const [user , setUser] = useState<User | null>(null);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(()=>{
        const currentUser = async():Promise<AuthResponse>=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/user/me` , "GET");
                if(response.success){
                    // console.log(response);
                    setUser(response?.user);
                }
                // console.log("user from current user function! " , user);
                return { success: true, data: response?.user }; 
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Unable to find current user.";
                return { success:false , error:errorMessage }
            }finally{
                setIsLoading(false);
            }
        }
        currentUser();
    } , []);

    const logoutUser = async():Promise<AuthResponse>=>{
        setIsLoading(true);
        try {
            const response = await getAndDeleteReq(`/api/user/logout` , "GET");
            console.log(response);
            setUser(null);
            return { success: true, data: response?.data };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Unable to find current user.";
            throw { success:false , error:errorMessage }
        }finally{
            setIsLoading(false);
        }
    };

    const loginUser = async(data:LoginData):Promise<AuthResponse>=>{
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`/api/user/login` , "POST" , data);
            console.log(response);
            setUser(response?.foundUser);
            return { success: true, data: response?.foundUser };
        } catch (error: any) {
            const errorMessage = error?.response?.data?.messgae || "Unable to find current user.";
            throw { success:false , error:errorMessage }
        }finally{
            setIsLoading(false);
        }
    };

    const registerUser = async(data:LoginData):Promise<AuthResponse>=>{
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`/api/user/login` , "POST" , data);
            console.log(response);
            setUser(response?.foundUser);
            return { success: true, data: response?.data };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Unable to find current user.";
            throw { success:false , error:errorMessage }
        }finally{
            setIsLoading(false);
        }
    };

    return(
        <AuthContext.Provider value={{isLoading , registerUser , loginUser , logoutUser , user}}>
            {children}
        </AuthContext.Provider>
    )
}

export {useAuth , AuthProvider}
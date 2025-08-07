/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/context/authcontext";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Login(){
    const {loginUser} = useAuth();
    const [isLoading , setIsLoading] = useState(false);
    const [loginData , setLoginData] = useState({
        email:"",
        password:""
    })
    const [isPasswordShow , setIsPasswordShow] = useState(false);
    const router = useRouter();

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData , [e.target.name]:e.target.value})
    }
    const handlePasswordShow = (e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        setIsPasswordShow(!isPasswordShow);
    }

    const handleLogin = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.values(loginData).includes("")){
            toast.error("Credentials are missing!");
            return;
        }
        setIsLoading(true);
        try {
            const response = await loginUser(loginData);
            console.log(response);
            if(response.success){
                toast.success("login success!");
                router.push("/allprojects")
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            // console.error("error loginPage! " , error);
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }
    
    return(
        <div className="min-h-screen gap-4 py-5 bg-base-300">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-base-100 mx-auto my-20">
                <h1 className="text-center font-bold text-2xl mb-4">Login</h1>
                <div className="flex flex-col">
                    <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                    <label htmlFor="email" className="text-md font-medium">Email</label>    
                    <input
                    name="email" 
                    type="email"
                    id="email" 
                    placeholder="exp@email.com" 
                    className="input w-full shadow-md"
                    value={loginData.email}
                    onChange={handleOnChange}
                    autoComplete="email" 
                    
                    />
                    <label htmlFor="password" className="text-md font-medium mb-1">Password</label>
                    <div className="flex relative justify-center items-center">
                    <input
                    name="password" 
                    type={isPasswordShow ? "text" : "password"}
                    id="password" 
                    placeholder="pass@123" 
                    className="input w-full shadow-md"
                    value={loginData.password}
                    autoComplete="true"
                    onChange={handleOnChange} 
                    />
                    <p 
                    className="z-10 absolute right-1.5 hover:cursor-pointer" 
                    onClick={handlePasswordShow}>
                        { 
                            isPasswordShow ? <FaEyeSlash className="text-2xl" /> : <IoEyeOutline className="text-2xl" />
                        }
                    </p>
                    </div>
                    <button 
                    type="submit" 
                    className="btn w-full btn-neutral text-lg font-semibold shadow-xl" 
                    disabled={isLoading}>{isLoading ? "Processing..." :"Login"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
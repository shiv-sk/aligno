"use client";

import { useAuth } from "@/context/authcontext";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login(){
    const {loginUser} = useAuth();
    const [isLoading , setIsLoading] = useState(false);
    const [loginData , setLoginData] = useState({
        email:"",
        password:""
    })

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData , [e.target.name]:e.target.value})
    }

    const handleLogin = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.entries(loginData).length === 0){
            alert("data is required! ");
            return;
        }
        setIsLoading(true);
        try {
            const response = await loginUser(loginData);
            console.log(response);
            if(response.success){
                alert("login success!");
            }
        } catch (error) {
            console.error("error loginPage! " , error);
        }finally{
            setIsLoading(false);
        }
    }
    
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-base-100">
                <h1 className="text-center font-bold text-2xl mb-4">Login</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <label htmlFor="email" className="text-md font-medium">Email</label>    
                    <input
                    name="email" 
                    type="email"
                    id="email" 
                    placeholder="exp@email.com" 
                    className="input w-full shadow-md"
                    value={loginData.email}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="password" className="text-md font-medium mb-1">Password</label>
                    <div className="flex relative">
                    <input
                    name="password" 
                    type="password"
                    id="password" 
                    placeholder="pass@123" 
                    className="input w-full shadow-md"
                    value={loginData.password}
                    autoComplete="true"
                    onChange={handleOnChange} 
                    required/>
                    <p className="absolute top-2 right-1.5">showbutton</p>
                    </div>
                    <p className="text-sm"> Don’t have an account?{" "} <Link href={"/register"}>
                    <span 
                    className="text-info hover:underline hover:text-blue-500">Register
                    </span></Link></p>
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
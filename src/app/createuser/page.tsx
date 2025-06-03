/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { postAndPatchReq } from "@/apiCalls/apiCalls";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AddCompany(){
    const [isLoading , setIsLoading] = useState(false);
    const [userData , setUserData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const handleOnChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=>{
        setUserData({...userData , [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.entries(userData).length === 0){
            alert("data is required! ");
            return;
        }
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`/api/user` , "POST" , userData);
            // console.log(response);
            if(response.success){
                alert("user is created!");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            // console.error("error addUserPage! " , errorMessage);
            alert(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }
    
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-base-100">
                <h1 className="text-center font-bold text-2xl mb-4">AddUser1</h1>
                <div className="">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="text-md font-medium">Name</label>    
                    <input
                    name="name" 
                    type="text"
                    id="name" 
                    placeholder="John Doe" 
                    className="input w-full shadow-md"
                    value={userData.name}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="email" className="text-md font-medium">Email</label>    
                    <input
                    name="email" 
                    type="email"
                    id="email" 
                    placeholder="JohnDoe@email.com" 
                    className="input w-full shadow-md"
                    value={userData.email}
                    onChange={handleOnChange} 
                    required
                    />
                    <label htmlFor="password" className="text-md font-medium">Password</label>    
                    <input
                    name="password" 
                    type="password"
                    id="password" 
                    placeholder="JohnDoe@123" 
                    className="input w-full shadow-md"
                    value={userData.password}
                    onChange={handleOnChange} 
                    required
                    />
                    <button 
                    type="submit" 
                    className="btn w-full mt-2 btn-neutral text-lg font-semibold shadow-xl" 
                    disabled={isLoading}>{isLoading ? "Processing..." :"Add"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
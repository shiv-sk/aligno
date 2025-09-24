/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq, postAndPatchReq } from "@/apiCalls/apiCalls";
import { useAuth } from "@/context/authcontext";
import User from "@/types/userinput";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function UpdateUser(){
    const [isLoading , setIsLoading] = useState(false);
    const [isPasswordShow , setIsPasswordShow] = useState(false);
    const {userId} = useParams();
    const router = useRouter();
    const {user, isLoading:authLoading} = useAuth();

    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
            toast.warning("please login!");
        }
    } , [user , router , authLoading]);

    useEffect(()=>{
        if(!userId){
            return;
        }
        const getUser = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/user/${userId}` , "GET");
                if(response.success){
                    // console.log("response from updateuser page!")
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getUser();
    } , [userId]);

    const [userData , setUserData] = useState<User>({
        name:"",
        email:"",
        password:"",
    })

    const handleOnChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=>{
        setUserData({...userData , [e.target.name]:e.target.value})
    }

    const handlePasswordShow = (e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        setIsPasswordShow(!isPasswordShow);
    }
    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.values(userData).includes("")){
            toast.error("fill the missing field")
            return;
        }
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`/api/user` , "POST" , userData);
            // console.log(response);
            if(response.success){
                toast.success("user is created");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            // console.error("error addUserPage! " , errorMessage);
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }
    
    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 py-5">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-base-100">
                <h1 className="text-center font-bold text-2xl mb-4">AddUser</h1>
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
                    />
                    <label htmlFor="password" className="text-md font-medium">Password</label>
                    <div className="flex justify-center items-center relative">    
                    <input
                    name="password" 
                    type={isPasswordShow ? "text" : "password"}
                    id="password" 
                    placeholder="JohnDoe@123" 
                    className="input w-full shadow-md"
                    value={userData.password}
                    onChange={handleOnChange}
                    />
                    <p 
                    onClick={handlePasswordShow} 
                    className="absolute right-1.5 z-10">
                        {
                            isPasswordShow ? <IoEyeOutline className="text-2xl" /> : <FaEyeSlash className="text-2xl" />
                        }
                    </p>
                    </div>
                    <button 
                    type="submit" 
                    className="btn w-full mt-2 btn-neutral text-lg font-semibold shadow-xl" 
                    disabled={isLoading}>
                        {isLoading ? <span className="loading loading-spinner loading-xs"></span> :"Add"}
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
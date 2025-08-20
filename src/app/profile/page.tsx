"use client";

import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Profile(){
    const router = useRouter();
    const {user , isLoading} = useAuth();
    useEffect(()=>{
        if(!isLoading && !user){
            router.push("/login");
            toast.warning("please login!");
        }
    } , [user , router , isLoading]);
    const handlePasswordRest = async(e)=>{
        e.preventDefault();
        toast.success("Comming Soon!");
    }
    return(
        <div className="min-h-screen gap-4 py-5 bg-base-300">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-base-100 mx-auto my-20">
                <h1 className="text-center font-bold text-2xl mb-4">Profile</h1>
                <div className="avatar avatar-placeholder flex justify-center tooltip" data-tip={user?.name || "User"}>
                    <div className="ring-primary ring-offset-base-100 w-18 rounded-full ring-2 ring-offset-2 bg-base-100 shadow-lg">
                        <span className={`text-2xl md:text-3xl`}>{user?.name.charAt(0).toUpperCase() ?? "A"}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <form className="flex flex-col gap-3">
                        <label htmlFor="userName" className="text-md font-medium">userName</label>    
                        <input
                        disabled={true}
                        name="userName" 
                        type="text"
                        id="userName" 
                        value={user?.name || "userName"}
                        placeholder="userName" 
                        className="input w-full shadow-md"
                        />
                        <label htmlFor="email" className="text-md font-medium">Email</label>    
                        <input
                        disabled={true}
                        name="email" 
                        type="email"
                        id="email"
                        value={user?.email || "userEmail"} 
                        placeholder="exp@email.com" 
                        className="input w-full shadow-md"
                        autoComplete="email"   
                        />
                        <label htmlFor="joinedAt" className="text-md font-medium">JoinedAt</label>    
                        <input
                        disabled={true}
                        name="joinedAt" 
                        type="text"
                        id="joinedAt"
                        value={user?.createdAt ? new Date(user.createdAt).toDateString() : "Date"} 
                        placeholder="10/10/1000" 
                        className="input w-full shadow-md"   
                        />
                        <label htmlFor="lastLogin" className="text-md font-medium">LastLogin</label>    
                        <input
                        disabled={true}
                        name="lastLogin" 
                        type="text"
                        id="lastLogin" 
                        placeholder="CommingSoon!!" 
                        className="input w-full shadow-md"   
                        />
                        <button 
                        type="submit" 
                        className="btn w-full btn-neutral text-lg font-semibold shadow-xl" 
                        disabled={isLoading}
                        onClick={handlePasswordRest}>
                            {"PasswordReset"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
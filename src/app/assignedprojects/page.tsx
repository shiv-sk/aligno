/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import { useAuth } from "@/context/authcontext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { CiFilter, CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";

export default function UserProjects(){
    interface Project{
        _id:string,
        name:string,
        description:string 
    }

    const [allProjects , setAllProjects] = useState<Project[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    const {user , isLoading:authLoading} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
            toast.warning("please login!");
        }
    } , [user , router , authLoading]);
    

    useEffect(()=>{
        const getAllProjects = async()=>{
            if(!user || !user._id){
                router.replace("/login");
            }
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/projectmember/assignedprojects/${user?._id}` , "GET");
                // console.log("response from all user Projects assigned Page! " , response);
                if(response.success){
                    setAllProjects(response?.projects || []);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                // console.error("error from getAllProjectPage! " , error);
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getAllProjects();
    } , [user , router]);

    return(
        <div className=" min-h-screen py-5 bg-base-300">
            <div className="flex flex-col justify-center items-center">
                <div className="w-full max-w-sm md:max-w-4xl mb-6 flex flex-col md:flex-row justify-between gap-3 items-center">
                    <div className="relative w-full max-w-[320px] md:max-w-[550px]">
                        <CiSearch className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <input 
                        type="text" 
                        name="search"
                        id="search"
                        placeholder="Search by name or description"
                        className="input md:w-full w-xs pl-9 shadow-xl h-12"/>
                    </div>
                                    
                    <div className="relative w-full max-w-[320px]">
                        <CiFilter className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <select className="select shadow-xl pl-9 w-full h-12">
                            <option>Select a value</option>
                            <option value={""}>Recent</option>
                            <option value={""}>Oldest</option>
                        </select>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">AssignedProjects</h1>
                <p className="text-gray-500 text-center mb-4">Browse through all your team or company projects</p>
                <div className="flex flex-wrap gap-3 justify-center items-center">
                    {
                        isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <span className="loading loading-spinner loading-xl"></span>
                            </div>
                        ) :
                        allProjects && allProjects.length > 0 ? allProjects.map((project)=>(
                            <div className="card bg-base-100 w-96 shadow-xl" key={project._id}>
                                <div className="card-body">
                                    <h2 className="card-title">{project.name || "Project-Name"}</h2>
                                    <p>{project.description || "Project-Description"}</p>
                                    <div className="card-actions justify-end">
                                    <Link href={`/project/${project._id}`}>
                                        <button className="btn btn-primary rounded-2xl">View</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-semibold">
                                    Sorry, we couldn&apos;t find assigned projects. It might have been deleted or moved!.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
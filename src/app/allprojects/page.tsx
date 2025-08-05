/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import Link from "next/link";
import { useEffect, useState } from "react"
import { CiFilter } from "react-icons/ci";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";

export default function Home(){
    interface Project{
        _id:string,
        name:string,
        description?:string,
    }

    const [allProjects , setAllProjects] = useState<Project[]>([]);
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        const getAllProjects = async()=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/project` , "GET");
                // console.log("response from allProjectsPage! " , response);
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
    } , [])
    
    return(
        <div className="min-h-screen py-5 bg-base-300">
            <div className="flex flex-col justify-center items-center">
                <div className="w-full max-w-xl md:max-w-4xl mb-6 flex flex-row justify-between gap-3">
                    <div className="relative w-full">
                        <CiSearch className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <input 
                        type="text" 
                        name="search"
                        id="search"
                        placeholder="Search by name or description"
                        className="input md:w-full w-xs pl-9 shadow-xl h-12"/>
                    </div>
                    
                    <div className="relative w-full max-w-[200px]">
                        <CiFilter className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <select className="select shadow-xl pl-9 w-full h-12">
                            <option disabled={true}>Select a value</option>
                            <option value={""}>Recent</option>
                            <option value={""}>Oldest</option>
                        </select>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center py-3.5 px-2">AllProjects</h1>
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
                                    <h2 className="card-title">{project?.name || "Project-Name"}</h2>
                                    <p>{project?.description || "Project-Description"}</p>
                                    <div className="card-actions justify-end">
                                    <Link href={`/project/${project._id}`}>
                                        <button className="btn btn-neutral shadow-xl">View</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-semibold">
                                    Sorry, we couldn&apos;t find the projects. It might have been deleted or moved!.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
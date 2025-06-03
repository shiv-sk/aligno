/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import Link from "next/link";
import { useEffect, useState } from "react"

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
                console.log("response from allProjectsPage! " , response);
                if(response.success){
                    setAllProjects(response?.projects || []);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                // console.error("error from getAllProjectPage! " , error);
                alert(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getAllProjects();
    } , [])
    
    return(
        <div className="flex flex-col justify-center items-center min-h-screen py-5">
            <h1 className="text-xl font-semibold py-3.5 px-2">AllProjects</h1>
            <div className="flex flex-wrap gap-3 justify-center items-center">
                {
                    isLoading ? "Loading..." :
                    allProjects && allProjects.length > 0 ? allProjects.map((project)=>(
                        <div className="card bg-base-100 w-96 shadow-xl" key={project._id}>
                            <div className="card-body">
                                <h2 className="card-title">{project?.name || "Project-Name"}</h2>
                                <p>{project?.description || "Project-Description"}</p>
                                <div className="card-actions justify-end">
                                <Link href={`/project/${project._id}`}><button className="btn btn-primary">View</button></Link>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p>Projects not found!</p>
                    )
                }
            </div>
        </div>
    )
}
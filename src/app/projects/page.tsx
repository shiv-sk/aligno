/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import { useAuth } from "@/context/authcontext";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function UserProjects(){
    interface Project{
        _id:string,
        projectId:{
            _id:string,
            name:string,
            description:string
        },
    }

    const [allProjects , setAllProjects] = useState<Project[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    const {user} = useAuth();

    useEffect(()=>{
        const getAllProjects = async()=>{
            if(!user || !user._id){
                alert("userId is required!");
                return;
            }
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/projectmember/assignedprojects/${user._id}` , "GET");
                console.log("response from all user Projects assigned Page! " , response);
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
    } , [user])

    return(
        <div className="flex flex-col justify-center items-center min-h-screen py-5 bg-base-300">
            <h1 className="text-xl font-semibold py-3.5 px-2">AllProjects</h1>
            <div className="flex flex-wrap gap-3 justify-center items-center">
                {
                    isLoading ? "Loading..." :
                    allProjects && allProjects.length > 0 ? allProjects.map((project)=>(
                        <div className="card bg-base-100 w-96 shadow-xl" key={project._id}>
                            <div className="card-body">
                                <h2 className="card-title">{project.projectId?.name || "Project-Name"}</h2>
                                <p>{project.projectId?.description || "Project-Description"}</p>
                                <div className="card-actions justify-end">
                                <Link href={`/project/${project.projectId?._id}`}><button className="btn btn-primary">View</button></Link>
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
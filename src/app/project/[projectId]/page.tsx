/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import { useAuth } from "@/context/authcontext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function Project(){
    interface User{
        name:string,
        email:string
    }

    interface Project{
        _id:string,
        name:string,
        description:string,
        email:string,
        createdAt:Date,
        createdBy:User
    }

    const [project , setProject] = useState<Project | null>(null);
    const {projectId} = useParams();
    const {user} = useAuth();
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        if(!projectId){
            return;
        }
        const getCompany = async()=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/project/${projectId}` , "GET");
                // console.log("response from getCompany! " , response);
                if(response.success){
                    setProject(response?.project || null);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                // console.error("error from companyPage! " , error);
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getCompany();
    } , [projectId]);

    return(
        <div className="min-h-screen bg-base-300">
            <div className="flex flex-col justify-center items-center py-6">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">Project Overview</h1>
                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    ):
                    project ? (
                        <div className="card bg-base-100 md:w-[750px] w-80 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-center">{project?.name || "ProjectName"}</h2>
                                <div className="space-y-2">
                                    <p className="text-lg">
                                        Description: {project?.description || "ProjectDescription"}
                                    </p>
                                    <p className="text-lg">
                                        CreatedBy: {project?.createdBy.name || "Project createdBy"}
                                    </p>
                                    <p className="text-lg">
                                        Contact: {project?.createdBy.email || "Project createdBy contact"}
                                    </p>
                                    <p className="text-lg">
                                        CreatedOn: {project?.createdAt ? new Date (project.createdAt).toDateString() 
                                        : "Project Creation Date"}
                                    </p>
                                </div>
                                <div className="card-actions flex md:flex-wrap md:justify-end">
                                    {
                                        user?.isAdmin && (
                                            <>
                                                <Link href={`/addusers/${projectId}`}>
                                                    <button className="btn btn-primary">Assign User</button>
                                                </Link>
                                                <Link href={`/updateproject/${projectId}`}>
                                                    <button className="btn btn-primary">Update</button>
                                                </Link>
                                                {/* <Link href={`/`}>
                                                    <button className="btn btn-primary">Del</button>
                                                </Link> */}
                                                <Link href={`/admindashboard/${projectId}`}>
                                                    <button className="btn btn-primary">Analytics</button>
                                                </Link>
                                            </>
                                        )
                                    }
                                    {
                                        !user?.isAdmin && (
                                            <>
                                                <Link href={`/dashboard/${projectId}`}>
                                                    <button className="btn btn-primary">Dashboard</button>
                                                </Link>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-lg font-semibold">
                                Sorry, we couldn&apos;t find this project. It might have been deleted or moved!.
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
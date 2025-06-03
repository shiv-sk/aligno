/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Company(){
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

    useEffect(()=>{
        if(!projectId){
            return;
        }
        const getCompany = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/project/${projectId}` , "GET");
                // console.log("response from getCompany! " , response);
                setProject(response?.project || null);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                // console.error("error from companyPage! " , error);
                alert(errorMessage);
            }
        }
        getCompany();
    } , [projectId]);

    return(
        <div className="flex flex-col justify-center items-center min-h-screen gap-3.5">
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{project?.name || "ProjectName"}</h2>
                    <p className="text-lg">
                        Description: {project?.description || "ProjectDescription"}
                    </p>
                    <p className="text-lg">
                        CreatedBy: {project?.createdBy.name || "Project createdBy"}
                    </p>
                    <p className="text-lg">
                        CreatedOn: {project?.createdAt ? new Date (project.createdAt).toDateString() : "Project Creation Date"}
                    </p>
                    <div className="card-actions justify-end">
                    <Link href={`/addusers/${projectId}`}><button className="btn btn-primary">Add User</button></Link>
                    <Link href={`/`}><button className="btn btn-primary">Edit</button></Link>
                    <Link href={`/`}><button className="btn btn-primary">Delete</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
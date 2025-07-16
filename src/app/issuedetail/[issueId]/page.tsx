/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import Issuedetail from "@/components/issuedetail"
import { useAuth } from "@/context/authcontext";
import { Issue } from "@/types/issue";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
export default function IssueDetail(){

    const [isLoading , setIsLoading] = useState(false);
    const [role , setRole] = useState("");
    const [issue , setIssue] = useState<Issue | null>(null);
    const {issueId} = useParams();
    const {user} = useAuth();

    useEffect(()=>{
        const getIssue = async()=>{
            if(!issueId || !user || !user._id){
                return;
            }
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/issue/${issueId}` , "GET");
                if(response.success){
                    setIssue(response.issue);
                    const projectId = response.issue.projectId._id;
                    const roleResponse = await getAndDeleteReq(`/api/projectmember/role?projectId=${projectId}&userId=${user._id}` , "GET");
                    if(roleResponse.success){
                        setRole(roleResponse.role || "");
                    }
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getIssue();
    } , [issueId , user]);
    return(
        <div className="bg-base-300 min-h-screen py-6">
            <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">Task-Detail</h1>
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                ) : issue ? (
                    <div className="flex justify-center">
                        <Issuedetail issue={issue} role={role}/>
                    </div> 
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg font-semibold">
                            Sorry, we couldn&apos;t find this issue. It might have been deleted or moved!.
                        </p>
                    </div>
                )
            }
        </div>
    )
}
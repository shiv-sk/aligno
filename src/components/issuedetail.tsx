/* eslint-disable @typescript-eslint/no-explicit-any */
import Constants from "@/constents/constants";
import {Issue} from "@/types/issue";
import IssueSummary from "./issuesummary";
import UserInfo from "./userinfo";
import TaskInfo from "./taskinfo";
import { postAndPatchReq } from "@/apiCalls/apiCalls";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "@/context/authcontext";

export default function Issuedetail({issue , role}: {issue:Issue | null , role:string}){
    const {user} = useAuth();
    const [isLoading , setIsLoading] = useState(false);
    const handleClaimIssue = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(!issue || !issue._id){
            return;
        }
        setIsLoading(true);
        try {
            const response = await postAndPatchReq(`/api/issuerequest/` , "POST" , {issueId:issue._id});
            if(response.success){
                toast.success("Claim Request added successfully!")
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            toast.error(errorMessage);
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <div className="bg-base-100 shadow-lg rounded-lg space-y-6 px-3 py-6 md:w-[720px] w-96">
            <TaskInfo issue={issue} />
            <UserInfo issue={issue}/>
            <IssueSummary issue={issue} />
            <div className="flex justify-end items-center gap-3">
                {
                    role === Constants.Employee && (
                        <button 
                        className="btn btn-primary" 
                        disabled={!!issue?.assignedTo?._id}
                        title={!!issue?.assignedTo?._id ? "This task has already been claimed." : "Click to claim this task."}
                        onClick={handleClaimIssue}
                        >{isLoading ? "Claiming..." : "Claim"}</button>
                    )
                }
                {
                    role === Constants.Employee && issue?.assignedTo._id === user?._id &&(
                        <button 
                        className="btn btn-primary" 
                        disabled={isLoading}
                        title={!!issue?.assignedTo?._id ? "This task has already been claimed." : "Click to claim this task."}
                        >{isLoading ? "Marking..." : "Mark As Done"}</button>
                    )
                }
            </div>
        </div>
    )
}
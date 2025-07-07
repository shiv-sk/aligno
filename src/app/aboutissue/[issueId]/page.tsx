/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function AboutIssue(){
    interface User{
        _id:string,
        name:string,
        email:string
    }
    interface Issue{
        _id:string,
        name:string,
        description:string,
        status:string,
        priority:string,
        duedate:string,
        assignedAt:string,
        completedAt:string,
        createdAt:string,
        assignedBy:User,
        assignedTo:User,
        createdBy:User
    }
    const [isLoading , setIsLoading] = useState(false);
    const [issue , setIssue] = useState<Issue | null>(null);
    const {issueId} = useParams();
    let statusBadgeColor = "";
    let priorityBadgeColor = "";
    switch(issue?.status){
        case "Assigned":
            statusBadgeColor = "badge badge-info text-center font-semibold"
            break
        case "Open":
            statusBadgeColor = "badge badge-neutral text-center font-semibold"
            break;
        case "Review":
            statusBadgeColor = "badge badge-secondary text-center font-semibold"
            break;
        case "Reopened":
            statusBadgeColor = "badge badge-accent text-center font-semibold"
            break;
        case "Closed":
            statusBadgeColor = "badge badge-success text-center font-semibold"
            break
    }
    switch(issue?.priority){
        case "High":
            priorityBadgeColor = "badge badge-neutral text-center font-semibold"
            break
        case "Low":
            priorityBadgeColor = "badge badge-primary text-center font-semibold"
            break
        case "Medium":
            priorityBadgeColor = "badge badge-secondary text-center font-semibold"
            break
    }
    function getDueDateBadge(){
        if(!issue){
            return;
        }
        const today = new Date();
        const completed = issue.completedAt ? new Date(issue.completedAt) : null;
        const due = new Date(issue.duedate);
        if(issue.status === "Closed"){
            if(completed && completed > due){
                return(
                    <div className="tooltip tooltip-warning" data-tip="Completed but overdue">
                        <span className="badge badge-warning">Late Completion</span>
                    </div>
                )
            }else if(completed && completed <= due){
                return(
                    <div className="tooltip tooltip-success" data-tip="Completed on time">
                        <span className="badge badge-success">On-Time</span>
                    </div>
                )
            }
        }
        else{
            if(today > due){
                return(
                    <div className="tooltip tooltip-error" data-tip="Issue is overdue!">
                        <span className="badge badge-error">Overdue</span>
                    </div>
                )
            }else{
                return(
                    <div className="tooltip tooltip-info" data-tip="Upcoming due date">
                        <span className="badge badge-info">Upcoming</span>
                    </div>
                )
            }
        }
        return null;
    }
    useEffect(()=>{
        const getIssue = async()=>{
            if(!issueId){
                return;
            }
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/issue/${issueId}` , "GET");
                console.log("response from Issue-detail page! " , response);
                if(response.success){
                    setIssue(response.issue);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getIssue();
    } , [issueId]);
    return(
        <div className="bg-base-300 min-h-screen">
            <div className="flex flex-col items-center py-5">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">About Task</h1>
                <div className="flex items-center justify-center gap-4 pt-2.5">
                    {
                        issue ? (
                            <div className="card bg-base-100 w-96 shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title">{issue.name}</h2>
                                    <p>Description: {issue.description}</p>
                                    <p>CreatedBy-
                                        <br />
                                        <span className="font-semibold text-base text-slate-700">{issue.createdBy.name}</span>
                                        <br />
                                        <span className="text-sm text-gray-500">{issue.createdBy.email}</span>
                                    </p>
                                    <p>AssignedBy-
                                        <br />
                                        <span className="font-semibold text-base text-slate-700">{issue.assignedBy.name ?? "N/A"}</span>
                                        <br />
                                        <span className="text-sm text-gray-500">{issue.assignedBy.email ?? "N/A"}</span>
                                    </p>
                                    <p>AssignedTo-
                                        <br />
                                        <span className="font-semibold text-base text-slate-700">{issue.assignedTo.name ?? "N/A"}</span>
                                        <br />
                                        <span className="text-sm text-gray-500">{issue.assignedTo.email ?? "N/A"}</span>
                                        <br />
                                        <span className="text-sm text-gray-500">AssignedAt: {issue.assignedAt.split("T")[0] ?? "N/A"}</span>
                                    </p>
                                    <p>CompletedAt- 
                                        <br />
                                        <span className="text-sm text-gray-500">{issue.completedAt?.split("T")[0] ?? "N/A"}</span>
                                    </p>
                                    <p>Status: <span className={`badge ${statusBadgeColor}`}>{issue.status}</span></p>
                                    <p>Priority: <span className={`badge ${priorityBadgeColor}`}>{issue.priority}</span></p>
                                    <div className="flex gap-2 items-center">
                                        Due: <span className="text-sm font-medium text-red-600">{issue.duedate.split("T")[0]}</span>
                                        {getDueDateBadge()}
                                    </div>
                                </div>
                            </div>
                        ) : ""
                    }
                    
                </div>
            </div>
        </div>
    )
}
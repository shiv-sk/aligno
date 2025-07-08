/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function IssueRequestReview(){
    const [isLoading , setIsLoading] = useState(false);
    const [userData , setUserData] = useState<User | null>(null);
    const [userSummary , setUserSummary] = useState<UserSummary | null>(null);
    const [issueData , setIssueData] = useState<Issue | null>(null);
    const {issueRequestId} = useParams();

    interface User{
        name:string,
        email:string
    }

    interface Issue{
        issueName:string,
        description:string,
        priority:string,
        duedate:string,
    }

    interface UserSummary{
        totalAssignedIssues:number,
        numberonWorkingIssues:number,
        completedIssues:number, 
        completionRate:number, 
        overdueIssues:number, 
        highProrityIssues:number, 
    }

    useEffect(()=>{
        if(!issueRequestId){
            return;
        }
        setIsLoading(true);
        const getIssueRequest = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/issuerequest/${issueRequestId}` , "GET");
                console.log("response from reviewRequest Page! " , response);
                if(response.success){
                    setIssueData(response.data.issueData);
                    setUserData(response.data.userData);
                    setUserSummary(response.data.userSummary);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getIssueRequest();
    } , [issueRequestId]);
    console.log("total completed tasks! ",userSummary?.completedIssues);
    return(
        <div className="bg-base-300 min-h-screen">
            <div className="flex flex-col items-center py-5">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">Task Assign Request</h1>
                {
                    issueData && userData && userSummary ? (
                        <div className="card bg-base-100 md:w-[600px] w-96 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Task: {issueData.issueName || "TaskName"}</h2>
                                <p>Description: {issueData.description || "Task Description"}</p>
                                <p>Priority: {issueData.priority || "Task Priority"}</p>
                                <p>Duedate: {issueData.duedate || "Task Duedate"}</p>
                                <div>
                                    <h1>UserInfo</h1>
                                    <p>userName: {userData.name || "UserName"}</p>
                                    <p>userEmail: {userData.email || "UserEmail"}</p>
                                </div>
                                <div>
                                    <h1>User Summary and WorkLoad</h1>
                                    <p>Total Assigned: {userSummary.totalAssignedIssues || "AssignedTask"}</p>
                                    <p>Currently Working: {userSummary.numberonWorkingIssues || "OnWorkingTask"}</p>
                                    <p>Completed: {userSummary.completedIssues || "CompletedTask"}</p>
                                    <p>Overdue Tasks: {userSummary.overdueIssues || "OverdueTasks"}</p>
                                    <p>High Priority: {userSummary.highProrityIssues || "HighPriorityTasks"}</p>
                                </div>
                            </div>
                            <div>
                                <button>Assign</button>
                                <button>Reject</button>
                            </div>
                        </div>
                    ) :(
                        <div className="flex justify-center items-center h-64">
                            <p className="text-lg font-semibold">
                                Sorry, we couldn&apos;t find the Request. It might have been deleted or moved!.
                            </p>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}
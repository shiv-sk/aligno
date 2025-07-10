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
        totalIssues:number,
        onWorkingIssues:number,
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
    function getDayDifference(){
        const today:any = new Date();
        const duedate:any = issueData?.duedate ? new Date(issueData.duedate) : null;
        if(!duedate){
            return null;
        }
        const difference = today - duedate;
        const differenceInDay = Math.floor(difference / (1000 * 60 * 60 * 24));
        return differenceInDay ?? null;
    }
    return(
        <div className="bg-base-300 min-h-screen">
            <div className="flex flex-col items-center py-5">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">Task Assign Request</h1>
                {
                    issueData && userData && userSummary ? (
                        <div className="card bg-base-100 md:w-[600px] w-96 shadow-sm">
                            <div className="card-body">
                                <div className="px-3 space-y-1 bg-base-100 shadow-md py-6 rounded-xl">
                                    <h1 className="text-center font-bold text-lg border-b-2">TaskInfo</h1>
                                    <h2 className="text-lg">Task: 
                                        <span className="text-base">{issueData.issueName || "TaskName"}</span>
                                    </h2>
                                    <p className="text-lg">Description: 
                                        <span className="text-base"> {issueData.description || "Task Description"}</span>
                                    </p>
                                    <p className="text-lg">Priority: 
                                        <span className="text-base">{issueData.priority || "Task Priority"}</span>
                                    </p>
                                    <p className="text-lg">Duedate: 
                                        <span className="text-base">{issueData.duedate?.split("T")[0] || "Task Duedate"}</span>
                                        <span className="pl-3 text-base">{`${getDayDifference()} `}days left</span>
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 justify-evenly py-6 space-y-1 px-3">
                                    <div className="space-y-1 py-6 px-3 md:h-[250px] bg-base-200 overflow-y-auto overflow-x-auto shadow-md rounded-xl md:w-1/2">
                                        <h1 className="text-center font-bold text-lg">UserInfo</h1>
                                        <p className="text-lg">name: 
                                            <span className="text-base">{userData.name || "UserName"}</span>
                                        </p>
                                        <p className="text-lg">email: 
                                            <span className="text-base">{userData.email || "UserEmail"}</span>
                                        </p>
                                    </div>
                                    <div className="space-y-1 py-6 px-3 md:h-[250px] overflow-y-auto overflow-x-auto bg-base-200 shadow-md rounded-xl md:w-1/2">
                                        <h1 className="text-center font-bold text-lg">User Progress and WorkLoad</h1>
                                        <p className="text-lg">Assigned Tasks: 
                                            <span className="text-base">{userSummary.totalIssues ?? "AssignedTask"}</span>
                                        </p>
                                        <p className="text-lg">on Working Tasks: 
                                            <span className="text-base">{userSummary.onWorkingIssues ?? "OnWorkingTask"}</span>
                                        </p>
                                        <p className="text-lg">Completed Tasks: 
                                            <span className="text-base">{userSummary.completedIssues ?? "CompletedTask"}</span>
                                        </p>
                                        <p className="text-lg">Overdue Tasks: 
                                            <span className="text-base">{userSummary.overdueIssues ?? "OverdueTasks"}</span>
                                        </p>
                                        <p className="text-lg">High Priority Tasks: 
                                            <span className="text-base">{userSummary.highProrityIssues ?? "HighPriorityTasks"}</span>
                                        </p>
                                        <p className="text-lg">Completion Rate:
                                            <span className="text-base">{userSummary.completionRate ?? "HighPriorityTasks"}%</span> 
                                            <progress className="progress progress-success w-full" 
                                            value={userSummary.completedIssues} 
                                            max={userSummary.totalIssues}>
                                            </progress>
                                            {`${userSummary.completedIssues} of ${userSummary.totalIssues} tasks completed`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-4 py-6">
                                <button className="btn btn-primary">Assign</button>
                                <button className="btn btn-secondary">Reject</button>
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
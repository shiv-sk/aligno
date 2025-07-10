/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq, postAndPatchReq } from "@/apiCalls/apiCalls";
import UserSummary from "@/types/usersummary";
import UserData from "@/types/userData";
import IssueData from "@/types/issueData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import IssueDataComponent from "@/components/issuedata";
import UserDataComponent from "@/components/userdata";
import UserSummaryComponent from "@/components/usersummary";

export default function IssueRequestReview(){
    const [isLoading , setIsLoading] = useState(false);
    const [isAssignLoading , setIsAssignLoading] = useState(false);
    const [userData , setUserData] = useState<UserData | null>(null);
    const [userSummary , setUserSummary] = useState<UserSummary | null>(null);
    const [issueData , setIssueData] = useState<IssueData | null>(null);
    const {issueRequestId} = useParams();

    useEffect(()=>{
        if(!issueRequestId){
            return;
        }
        setIsLoading(true);
        const getIssueRequest = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/issuerequest/${issueRequestId}` , "GET");
                // console.log("response from reviewRequest Page! " , response);
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

    const handleAssignIssue = async(e)=>{
        e.preventDefault();
        if(!userData?.requestedBy || !issueData?.issueId){
            return;
        }
        setIsAssignLoading(true);
        try {
            const response = await postAndPatchReq(`/api/issue/assignissue/${issueData.issueId}` , "PATCH" , {requestedBy:userData.requestedBy});
            console.log("response from assign issue! " , response);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            toast.error(errorMessage);
        }finally{
            setIsAssignLoading(false);
        }
    }

    const handleUnAssignIssue = async(e)=>{
        e.preventDefault();
        if(!userData?.requestedBy || !issueData?.issueId){
            return;
        }
        setIsAssignLoading(true);
        try {
            const response = await postAndPatchReq(`/api/issue/assignissue/${issueData.issueId}` , "PATCH" , {});
            console.log("response from assign issue! " , response);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            toast.error(errorMessage);
        }finally{
            setIsAssignLoading(false);
        }
    }
    
    return(
        <div className="bg-base-300 min-h-screen">
            <div className="flex flex-col items-center py-5">
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">Task Assign Request</h1>
                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    ) :
                    issueData && userData && userSummary ? (
                        <div className="card bg-base-100 md:w-[600px] w-96 shadow-sm">
                            <div className="card-body">
                                <IssueDataComponent issueData={issueData}/>
                                <div className="flex flex-col md:flex-row gap-4 justify-evenly py-6 space-y-1 px-3">
                                    <UserDataComponent userData={userData}/>
                                    <UserSummaryComponent userSummary={userSummary}/>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-4 py-6">
                                {
                                    issueData.assignedTo && issueData.assignedTo === userData.requestedBy ? (
                                        <>
                                        <button 
                                        className="btn btn-primary text-lg"
                                        disabled={isAssignLoading} 
                                        onClick={handleUnAssignIssue}>{isAssignLoading ? "UnAssigning..." : "UnAssign"}</button>
                                        </>
                                    ) : (
                                        <>
                                            <button 
                                            className="btn btn-primary text-lg"
                                            disabled={isAssignLoading} 
                                            onClick={handleAssignIssue}>{isAssignLoading ? "Assigning..." : "Assign"}</button>
                                            <button 
                                            className="btn btn-secondary text-lg">Reject</button>
                                        </>
                                    )
                                }
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
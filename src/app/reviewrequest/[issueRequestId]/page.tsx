/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq, postAndPatchReq } from "@/apiCalls/apiCalls";
import UserSummary from "@/types/usersummary";
import UserData from "@/types/userData";
import IssueData from "@/types/issueData";
import { useParams , useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import IssueDataComponent from "@/components/issuedata";
import UserDataComponent from "@/components/userdata";
import UserSummaryComponent from "@/components/usersummary";
import Constants from "@/constents/constants";

export default function IssueRequestReview(){
    const [isLoading , setIsLoading] = useState(false);
    const [isRejectLoading , setIsRejectLoading] = useState(false);
    const [isAssignLoading , setIsAssignLoading] = useState(false);
    const [userData , setUserData] = useState<UserData | null>(null);
    const [userSummary , setUserSummary] = useState<UserSummary | null>(null);
    const [issueData , setIssueData] = useState<IssueData | null>(null);
    const [status , setStatus] = useState("");
    const {issueRequestId} = useParams();
    const router = useRouter();

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
                    setStatus(response.data.issueRequestData.status);
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

    const handleAssignIssue = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(!issueRequestId){
            return;
        }
        setIsAssignLoading(true);
        try {
            const response = await postAndPatchReq(`/api/issuerequest/assignissue/${issueRequestId}` , "PATCH" , {});
            // console.log("response from assign issue! " , response);
            if(response.success){
                toast.success("Task assigned successfully.");
                const projectId = response?.data?.updatedIssueRequest?.projectId;
                router.push(`/allissues/${projectId}`);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            toast.error(errorMessage);
        }finally{
            setIsAssignLoading(false);
        }
    }

    const handleRejectIssueRequest = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(!issueRequestId){
            return;
        }
        setIsRejectLoading(true);
        try {
            const response = await postAndPatchReq(`/api/issuerequest/rejectrequest/${issueRequestId}` , "PATCH" , {});
            // console.log("response from assign issue! " , response);
            if(response.success){
                toast.success("TaskRequest Rejected Successfully.");
                // router.push(`/allissuerequests`);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Server Error!.";
            toast.error(errorMessage);
        }finally{
            setIsRejectLoading(false);
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
                        <div className="card bg-base-100 md:w-[700px] w-96 shadow-sm px-3">
                            <div className="card-body">
                                <IssueDataComponent issueData={issueData}/>
                                <UserDataComponent userData={userData}/>
                                <UserSummaryComponent userSummary={userSummary}/>
                            </div>
                            <div className="flex justify-end items-center gap-3 py-6">
                                {
                                    status && status === Constants.Pending &&(
                                        <>
                                            <button 
                                            className="btn btn-primary text-lg"
                                            disabled={isAssignLoading || status !== Constants.Pending} 
                                            onClick={handleAssignIssue}
                                            title="Assign this task to the requested user"
                                            >{isAssignLoading ? 
                                            <span className="loading loading-spinner loading-xs"></span> 
                                            : "Approve"}
                                            </button>
                                            <button 
                                            className="btn btn-secondary text-lg"
                                            disabled={isRejectLoading || status !== Constants.Pending}
                                            onClick={handleRejectIssueRequest}
                                            title="Reject the Taskrequest"
                                            >{isRejectLoading ? 
                                            <span className="loading loading-spinner loading-xs"></span> 
                                            : "Reject"}
                                            </button>
                                        </>
                                    )
                                }
                                {
                                    status && status === Constants.Approved &&(
                                        <>
                                            <button 
                                            className="btn btn-primary text-lg"
                                            disabled={true}
                                            title="Request is Approved"
                                            >Approved</button>
                                        </>
                                    )
                                }
                                {
                                    status && status === Constants.Rejected &&(
                                        <>
                                            <button 
                                            className="btn btn-primary text-lg"
                                            disabled={true}
                                            title="Request is Rejected"
                                            >Rejected</button>
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
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import Constants from "@/constents/constants";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";

export default function ReviewRequest(){
    interface Issue{
        _id:string,
        name:string
    }
    interface User{
        _id:string,
        name:string,
        email:string
    }
    interface IssueRequests{
        _id:string,
        issueId:Issue,
        requestedBy:User,
    }
    const {issueId} = useParams();
    const [isLoading , setIsLoading] = useState(false);
    const [issueRequests , setIssueRequests] = useState<IssueRequests []>([]);
    useEffect(()=>{
        if(!issueId){
            return;
        }
        const getAllIssueRequests = async()=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/issuerequest/issues/${issueId}` , "GET");
                // console.log("response from issueRequests page!" , response);
                setIssueRequests(response.requestedIssues);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getAllIssueRequests();
    } , [issueId]);
    return(
        <div className="bg-base-300 min-h-screen">
            <div className="flex flex-col pt-8 items-center">
                <div className="w-full max-w-xl md:max-w-4xl mb-6 flex flex-row justify-between gap-3">
                    <div className="relative w-full">
                        <CiSearch className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <input
                        type="text" 
                        name="search"
                        id="search" 
                        placeholder="Search by name or description" 
                        className="input md:w-full w-xs shadow-xl h-12 pl-9"
                        />
                    </div>
                    <div className="relative w-full max-w-[200px]">
                        <CiFilter className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <select className="select shadow-xl pl-9 w-full h-12">
                            <option disabled={true}>Pick a Priority</option>
                            <option value={Constants.Pending}>Pending</option>
                            <option value={Constants.Approved}>Approved</option>
                            <option value={Constants.Rejected}>Rejected</option>
                        </select>
                    </div>
                </div>
                <h1 className="text-xl font-bold py-4 px-2.5">Task Requests</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 py-6">
                    {
                        isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <span className="loading loading-spinner loading-xl"></span>
                            </div>
                        ) :
                        issueRequests && issueRequests.length > 0 ? issueRequests.map((request)=>(
                            <div className="card bg-base-100 w-96 shadow-xl" key={request._id}>
                                <div className="card-body">
                                    <h2 className="card-title">{request.issueId.name || "TaskName"}</h2>
                                    <p className="font-semibold">{request.requestedBy?.name || "UserName"}</p>
                                    <p className="text-sm text-gray-500">{request.requestedBy?.email || "UserEmail"}</p>
                                    <div className="card-actions justify-end">
                                    <Link href={`/reviewrequest/${request._id}`}>
                                        <button className="btn btn-primary">View Details</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-semibold">
                                    No Issue requests found.
                                </p>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}
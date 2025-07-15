/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import Constants from "@/constents/constants";
import IssueRequest  from "@/types/issuerequest";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";

export default function AllIssueRequests(){ 

    const [isLoading , setIsLoading] = useState(false);
    const [allIssueRequest , setAllIssueRequest] = useState<IssueRequest []>([]);

    useEffect(()=>{
        setIsLoading(true);
        const getAllIssues = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/issuerequest` , "GET");
                console.log("response from AllIssueRequest page! " , response);
                if(response.success){
                    setAllIssueRequest(response.issueRequests || []);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getAllIssues();
    } , []);

    return(
        <div className="bg-base-300 min-h-screen">
            <div className="flex flex-col items-center py-5">
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
                            <option value={Constants.Low}>Low</option>
                            <option value={Constants.Medium}>Medium</option>
                            <option value={Constants.High}>High</option>
                        </select>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">All Tasks</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2.5">
                    {
                        isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <span className="loading loading-spinner loading-xl"></span>
                            </div>
                        ) :
                        allIssueRequest && allIssueRequest.length > 0 ? allIssueRequest.map((issue)=>(
                            <div className="card bg-base-100 w-96 shadow-xl" key={issue._id}>
                                <div className="card-body">
                                    <h2 className="card-title">{issue.issueId.name || "TaskName"}</h2>
                                    <p>{"Task Description"}</p>
                                    <p>status: {issue.issueId.status || "Task Status"}</p>
                                    <p>Priority: {issue.issueId.priority || "Task Priority"}</p>
                                    <div className="card-actions justify-end">
                                    <Link href={`/aboutissue/${issue.issueId._id}`}>
                                        <button className="btn btn-primary">View Details</button>
                                    </Link>
                                    <Link href={`/reviewrequest/${issue._id}`}>
                                        <button className="btn btn-primary">Review Request</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        )) : allIssueRequest && allIssueRequest.length === 0 ? (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-semibold">
                                    Currently Task Requests are not Available!.
                                </p>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-semibold">
                                    Sorry, we couldn&apos;t find the Task Requests. It might have been deleted or moved!.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
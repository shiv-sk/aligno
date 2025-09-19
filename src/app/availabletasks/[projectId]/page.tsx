/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import Constants from "@/constents/constants";
import { useAuth } from "@/context/authcontext";
import { Issue } from "@/types/issue";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";

export default function AvailableTasks(){
    const {projectId} = useParams();
    const router = useRouter();
    const [allIssues , setAllIssues] = useState<Issue[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    const {user, isLoading:authLoading} = useAuth();

    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
            toast.warning("please login!");
        }
    } , [user , router , authLoading]);

    useEffect(()=>{
        if(!projectId){
            return;
        }
        const getAllAvailableIssues = async()=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/issue/availableissues/${projectId}` , "GET");
                // console.log("response from availablesTasks page! " , response);
                if(response.success){
                    setAllIssues(response.issues);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getAllAvailableIssues();
    } , [projectId]);
    return(
        <div className="bg-base-200 min-h-screen">
            <div className="flex flex-col pt-8 items-center">
                <div className="w-full max-w-xl md:max-w-4xl mb-6 flex flex-row justify-between gap-3">
                    <div className="relative w-full max-w-[320px] md:max-w-[550px]">
                        <CiSearch className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <input
                        type="text" 
                        name="search"
                        id="search" 
                        placeholder="Search by name or description" 
                        className="input md:w-full w-xs shadow-xl h-12"
                        />
                    </div>
                    
                    <div className="relative w-full max-w-[320px]">
                        <CiFilter className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <select className="select shadow-xl pl-9 w-full h-12">
                            <option disabled={true}>Pick a Priority</option>
                            <option value={Constants.Low}>Low</option>
                            <option value={Constants.Medium}>Medium</option>
                            <option value={Constants.High}>High</option>
                        </select>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">Available Tasks</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 py-6">
                    {
                        isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <span className="loading loading-spinner loading-xl"></span>
                            </div>
                        ) :
                        allIssues && allIssues.length > 0 ? allIssues.map((issue)=>{
                            let priorityBadgeColor = "";
                            switch(issue.priority){
                                case Constants.High:
                                    priorityBadgeColor = "badge badge-neutral text-center font-semibold"
                                    break;
                                case Constants.Medium:
                                    priorityBadgeColor = "badge badge-secondary text-center font-semibold"
                                    break;
                                case Constants.Low:
                                    priorityBadgeColor = "badge badge-primary text-center font-semibold"
                                    break;
                                default:
                                    priorityBadgeColor = "badge badge-info text-center font-semibold"
                                    break;
                            }
                            const today = new Date();
                            const duedate = new Date(issue.duedate);
                            let duedateBadgeColor = ""
                            let tooltipData = ""
                            if(today > duedate){
                                duedateBadgeColor = "badge badge-error";
                                tooltipData = "due is passed";
                            }
                            else if(duedate > today){
                                duedateBadgeColor = "badge badge-success";
                                tooltipData = "due has time";
                            }
                            else{
                                duedateBadgeColor = "badge badge-warning";
                            }
                            return (
                            <div className="card bg-base-100 w-96 shadow-xl" key={issue._id}>
                                <div className="card-body">
                                    <h2 className="card-title">{issue.name || "Task Title!"}</h2>
                                    <p className="font-bold">description: 
                                        <span className="font-normal">
                                            {issue.description || "Task Description!"}
                                        </span>
                                    </p>
                                    <p className="font-bold">Priority: 
                                        <span className={`${priorityBadgeColor} font-normal`}>
                                            {issue.priority || "Task Priority!"}
                                        </span>
                                    </p>
                                    <p className="font-bold tooltip" data-tip={tooltipData}>Duedate:
                                        <span className={`font-normal`}>
                                            {`${issue.duedate ? new Date(issue.duedate).toDateString() : "Task Duedate!"}`}
                                        </span>
                                        <span className={`${duedateBadgeColor} font-normal`}>
                                            000
                                        </span>
                                    </p>
                                    <div className="card-actions justify-end">
                                    <Link href={`/issuedetail/${issue._id}`}>
                                        <button className="btn btn-primary rounded-2xl">View Details</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                            )
                            }) : allIssues && allIssues.length === 0 ? (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-semibold">
                                    Currently Tasks are not Available.
                                </p>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg font-semibold">
                                    Sorry, we couldn&apos;t find the tasks. It might have been deleted or moved!.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
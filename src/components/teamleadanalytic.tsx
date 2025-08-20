/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import AssignedIssueTable from "@/components/assignedissuetable";
import Barchart from "@/components/barchart";
import StatusBasedIssue from "@/components/Prioritybased";
import IssueOverview from "@/components/issueoverview";
import { Issue } from "@/types/issue";
import { IssueOverview as IssueOverviewType } from "@/types/issueoverview";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Acticity } from '@/types/activity';  
import { IssueRates } from '@/types/prioritybased';  

interface TeamLeadAnalyticData{
    issueOverview:IssueOverviewType
    assignedissues:Issue[],
    teamLeadActivity:Acticity,
    issuePriority:IssueRates
}

export default function TeamLeadAnalyticDashboard({projectId , userId}: {projectId:string , userId:string}){
    const [isLoading , setIsLoading] = useState(false);
    const [tamLeadAnayticData , setTamLeadAnayticData] = useState<TeamLeadAnalyticData | null>(null);

    useEffect(()=>{
        if(!projectId || !userId){
            return;
        }
        setIsLoading(true);
        const getAnalyticData = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/tldashboard?projectId=${projectId}&userId=${userId}` , "GET");
                if(response.success){
                    console.log("response from TL analyticboard! " , response);
                    setTamLeadAnayticData(response?.data || null);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getAnalyticData();
    } , [projectId , userId]);
    
    return(
        <div className="bg-base-300 min-h-screen py-6">
            <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">TeamLeadDashboard</h1>
                {
                    isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    ) : tamLeadAnayticData ?  (
                        <div 
                        className="flex flex-col justify-center items-center md:w-[720px] w-96 mx-auto bg-base-100 py-6 px-3 rounded-lg shadow-lg">
                            <IssueOverview role={"TeamLead"} issueOverview={tamLeadAnayticData?.issueOverview}/>
                            <AssignedIssueTable assignedIssues={tamLeadAnayticData?.assignedissues}/>
                            <Barchart role={"TeamLead"} activityData={tamLeadAnayticData?.teamLeadActivity} isReview={false} />
                            <StatusBasedIssue role={"TeamLead"} priorityData={tamLeadAnayticData?.issuePriority} />
                        </div>
                    ): (
                        <div>
                            No Tasks for Projects!
                        </div>
                    )
                }
        </div>
    )
}
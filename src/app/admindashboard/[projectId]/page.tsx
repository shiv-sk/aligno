"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import PriorityBasedIssue from "@/components/Prioritybased";
import IssueOverview from "@/components/issueoverview";
import ProjectHealth from "@/components/projecthealth";
import ProjectOverview from "@/components/projectoverview";
import StatusBasedIssue from "@/components/statusbasedchart";
import { IssueOverview as IssueOverviewType } from "@/types/issueoverview";
import { IssueRates } from "@/types/prioritybased";
import { ProjectOverview as ProjectOverviewType } from "@/types/projectoverview";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard(){
    interface AdminAnalytic {
        issueOverview:IssueOverviewType,
        issuePriority:IssueRates,
        issueSummary:IssueRates,
        projectInsights:ProjectOverviewType
    }
    const {projectId} = useParams();
    const [isLoading , setIsLoading] = useState(false);
    const [projectAnalyticData , setProjectAnalyticData] = useState<AdminAnalytic | null>(null);

    useEffect(()=>{
        if(!projectId){
            return;
        }
        setIsLoading(true);
        const getProjectAnalyticData = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/issue/admininsigth/${projectId}` , "GET");
                if(response.success){
                    console.log("response from Admininsigth page! " , response);
                    setProjectAnalyticData(response.data);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getProjectAnalyticData();
    } , [projectId]);
    return(
        <div className="bg-base-300 min-h-screen py-6">
            <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">AdminDashboard</h1>
            {
                isLoading ? "Loading..." : 
                (
                    <div
                    className="flex flex-col justify-center items-center md:w-[720px] w-96 mx-auto bg-base-100 
                    py-6 px-3 rounded-lg shadow-lg">
                        <IssueOverview role={"Admin"} issueOverview={projectAnalyticData?.issueOverview}/>
                        <PriorityBasedIssue role={"Admin"} priorityData={projectAnalyticData?.issuePriority}/>
                        <StatusBasedIssue/>
                        <ProjectHealth role={"Admin"} projecthealth={projectAnalyticData?.issueSummary}/>
                        <ProjectOverview projectOverview={projectAnalyticData?.projectInsights} />
                    </div>
                )
            }
            
        </div>
    )
}
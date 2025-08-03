/* eslint-disable @typescript-eslint/no-explicit-any */
import ActionableTable from "@/components/actionabletable";
import Barchart from "@/components/barchart";
import StatusBasedIssue from "@/components/Prioritybased";
import IssueOverview from "@/components/issueoverview";
import ProjectHealth from "@/components/projecthealth";
import { useEffect, useState } from "react";
import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import { useAuth } from "@/context/authcontext";
import { toast } from "react-toastify";
import { IssueOverview as IssueOverviewType } from "@/types/issueoverview";
import { Acticity } from "@/types/activity";
import { Issue } from "@/types/issue";
import { IssueRates } from "@/types/prioritybased";

export default function ManagerAnalyticDashboard({projectId}: {projectId:string}){
    interface ManagerAnalyticData {
        issueOverview:IssueOverviewType,
        activity:Acticity,
        actionableIssues:Issue[],
        projectHealth:IssueRates
    } 
    const [managerAnalyticData , setManagerAnalyticData] = useState<ManagerAnalyticData | null>(null);
    const [isLoading , setIsLoading] = useState(false);
    const {user} = useAuth();
    useEffect(()=>{
        if(!projectId || !user || !user._id){
            return;
        }
        setIsLoading(true);
        const getManagerAnalyticData = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/managerdashboard?projectId=${projectId}&userId=${user._id}` , "GET");
                if(response.success){
                    console.log("response from managerAnalytic! " , response);
                    setManagerAnalyticData(response?.data || null);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getManagerAnalyticData();
    } , [projectId , user]);
    return(
        <div className="bg-base-300 min-h-screen py-6">
            <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">ManagerDashboard</h1>
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                ) : (
                    <div 
                    className="flex flex-col justify-center items-center md:w-[720px] w-96 mx-auto bg-base-100 py-6 px-3 
                    rounded-lg shadow-lg">
                        <IssueOverview role={"Manager"} issueOverview={managerAnalyticData?.issueOverview}/>
                        <Barchart role={"Manager"} activityData={managerAnalyticData?.activity} isReview={false}/>
                        <ActionableTable issues={managerAnalyticData?.actionableIssues || []} />
                        <ProjectHealth role={"Manager"} projecthealth={managerAnalyticData?.projectHealth} />
                        <StatusBasedIssue role={""} priorityData={undefined}/>
                    </div>
                )
            }
            
        </div>
    )
}
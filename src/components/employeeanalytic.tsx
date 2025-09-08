"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Barchart from "@/components/barchart";
import IssueOverview from "@/components/issueoverview";
import ProjectHealth from "@/components/projecthealth";
import { useAuth } from "@/context/authcontext";
import { Acticity } from "@/types/activity";
import { IssueOverview as issueOverviewType } from "@/types/issueoverview";
import { IssueRates } from "@/types/prioritybased";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EmployeeAnalyticDashboard({projectId}: {projectId:string}){
    interface EmployeeAnalyticData{
        issueOverview:issueOverviewType,
        employeeActivity:IssueRates, 
        issueRequestData:Acticity,  
        issueReviewData:Acticity
    }
    const [employeeAnalyticData , setEmployeeAnalyticData] = useState<EmployeeAnalyticData | null>(null);
    const [isLoading , setIsLoading] = useState(false);
    const {user} = useAuth();

    useEffect(()=>{
        if(!projectId || !user || !user._id){
            return;
        }
        setIsLoading(true);
        const getEmployeeAnalyticData = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/employeedashboard?projectId=${projectId}&userId=${user._id}` , "GET");
                if(response.success){
                    // console.log("response from EmployeeAnalytic! " , response);
                    setEmployeeAnalyticData(response?.data || null);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getEmployeeAnalyticData();
    } , [projectId , user]);
    return(
        <div className="bg-base-300 min-h-screen py-6">
            <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">EmployeeDashboard</h1>
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                ) : (
                    <div 
                    className="flex flex-col justify-center items-center md:w-[720px] w-96 mx-auto bg-base-100 py-6 px-3 rounded-lg shadow-lg">
                        <IssueOverview role={"Employee"} issueOverview={employeeAnalyticData?.issueOverview}/>
                        <Barchart role={"Employee"} activityData={employeeAnalyticData?.issueRequestData} isReview={false}/>
                        <Barchart role={"Employee"} activityData={employeeAnalyticData?.issueReviewData} isReview={true}/>
                        <ProjectHealth role={"Employee"} projecthealth={employeeAnalyticData?.employeeActivity}/>
                    </div>
                )
            }
            
        </div>
    )
}
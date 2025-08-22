"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import GanttChart from "@/components/gnattchart";
import { useAuth } from "@/context/authcontext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Overview(){
    interface GanttChartData{
        id:string,
        name:string,
        end:string,
        start:string,
        progress:number,
        isDisabled:boolean,
        status:string,
        type:string,
        custom_class:string
    }
    interface Projectsummary{
        activityRate:number,
        overdueRate:number,
        completionRate:number,
        totalIssues:number,
        overdueIssues:number,
        completedIssues:number,
        activeIssues:number
    }
    const {projectId} = useParams();
    const router = useRouter();
    const [tasks , setTasks] = useState<GanttChartData[]>([]);
    const [taskSummary , setTaskSummary] = useState<Projectsummary | null>(null);
    const {user, isLoading:authLoading} = useAuth();

    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
            toast.warning("please login!");
        }
    } , [user , router , authLoading]);
    
    useEffect(()=>{
        const ganttChartData = async()=>{
            if(!projectId){
                return;
            }
            try {
                const response = await getAndDeleteReq(`/api/issue/ganttchart/${projectId}` , "GET");
                if(response.success){
                    console.log("response of ganttChart! " , response);
                    setTasks(response?.data?.formattedIssueData);
                    setTaskSummary(response?.data?.issueSummary);
                }
            } catch (error) {
                console.error("error from ganttChart page! " , error);
            }
        }
        ganttChartData();
    } , [projectId]);
    return(
        <div className="min-h-screen py-6 bg-base-300">
            <h2 className="text-xl font-semibold mb-4 text-center">Project Overview</h2>
            <div className="py-6 px-3 rounded-lg bg-base-100 shadow-xl">
                <GanttChart tasks={tasks} />
            </div>
            <div 
            className="bg-base-100 flex md:justify-evenly md:items-center md:flex-row flex-col gap-2.5 py-5 px-3 shadow-xl rounded-lg">
                <p className="text-lg">
                    ActivityRate: <span 
                    className="font-bold text-lg tooltip tooltip-info" 
                    data-tip={`${taskSummary?.activeIssues} out of ${taskSummary?.totalIssues} tasks are active`}>
                        {taskSummary?.activityRate}%
                    </span>
                </p>
                <p className="text-lg">
                    OverdueRate:<span 
                    className="font-bold text-lg tooltip tooltip-error" 
                    data-tip={`${taskSummary?.overdueIssues} out of ${taskSummary?.totalIssues} tasks are overdue`}>
                        {taskSummary?.overdueRate}%
                    </span>
                </p>
                <p className="text-lg">
                    CompletionRate: <span 
                    className="font-bold text-lg tooltip tooltip-success" 
                    data-tip={`${taskSummary?.completedIssues} out of ${taskSummary?.totalIssues} tasks are completed`}>
                        {taskSummary?.completionRate}%
                    </span>
                </p>
                <button className="btn btn-neutral shadow-xl" >Weekly-Report</button>
                
            </div>
        </div>
    )
}
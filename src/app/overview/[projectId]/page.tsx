"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import GanttChart from "@/components/gnattchart";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    const [tasks , setTasks] = useState<GanttChartData[]>([]);
    const [taskSummary , setTaskSummary] = useState<Projectsummary | null>(null);
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
    // const tasks = [
    //     {
    //         id: "1",
    //         name: "Design UI",
    //         start: "2025-06-19",
    //         end: "2025-06-22",
    //         progress: 60,
    //         dependencies: "",
    //         custom_class: "bar-blue"
    //     },
    //     {
    //         id: "2",
    //         name: "Develop Backend",
    //         start: "2025-06-23",
    //         end: "2025-06-27",
    //         progress: 30,
    //         dependencies: "",
    //         custom_class: "bar-orange"
    //     },
    //     {
    //         id: "3",
    //         name: "Testing",
    //         start: "2025-06-28",
    //         end: "2025-07-01",
    //         progress: 0,
    //         dependencies: "",
    //         custom_class: "bar-gray"
    //     },
    // ]
    const now = new Date();
    const minDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
    const maxDate = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000);
    const filteredTasks = tasks.filter((task)=>{
        const taskEnd = new Date(task.end);
        return taskEnd >= minDate && taskEnd <= maxDate;
    })
    return(
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Test Gantt Chart</h2>
            <GanttChart tasks={filteredTasks} />
            <div className="flex justify-center items-center gap-2.5 py-5 px-3">
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
                <p className="text-lg">Weekly Overview:
                    <span 
                    className="font-bold text-lg tooltip" 
                    data-tip={`4 out of 7 tasks are active`}>14%</span>
                </p>
            </div>
        </div>
    )
}
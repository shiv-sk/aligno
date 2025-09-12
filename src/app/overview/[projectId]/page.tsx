"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import WeeklyTasksTable from "@/components/weekytakstable";
import { weeklyProgressOverview } from "@/constents/config";
import { useAuth } from "@/context/authcontext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface Weeklyprogress{
    generatedBy:string,
    role:string,
    issueSummary:{
        completedIssues:number,
        issueInReview:number
        onWorkingIssues:number,
        overdueIssues:number,
        reopenedIssues:number,
        totalIssues:number
    },
    projectActivity:{
        activityRate:number,
        completionRate:number,
        overdueRate:number
    },
    projectInsights:{
        projectHealth:string,
        teamEfficiency:string
    }
}
export default function Overview(){

    const {projectId} = useParams();
    const router = useRouter();
    const {user, isLoading:authLoading} = useAuth();
    const [issues , setIssues] = useState([]);
    const [weeklyProgress , setWeeklyProgress] = useState<Weeklyprogress | null>(null);

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
                const response = await getAndDeleteReq(`/api/issue/report/${projectId}` , "GET");
                if(response.success){
                    console.log("response of ganttChart! " , response.data);
                    setWeeklyProgress(response.data);
                    setIssues(response.data.sanitizedIssues);
                }
            } catch (error) {
                console.error("error from ganttChart page! " , error);
            }
        }
        ganttChartData();
    } , [projectId]);
    const handleExport = ()=>{
        toast.success("work is in progress!")
    }
    let projectHealthBadge;
    let projectHealthTooltipData;
    let teamEfficiencyBadge;
    let teamEfficiencyTooltipData;
    switch(weeklyProgress?.projectInsights.projectHealth){
        case "Balanced":
            projectHealthTooltipData = `This project has an overdue rate ${weeklyProgress.projectActivity.overdueRate}% 
            activityrate ${weeklyProgress.projectActivity.activityRate}% in a week`
            projectHealthBadge = "badge badge-success"
            break;
        case "Overloaded":
            projectHealthTooltipData = `This project has an overdue rate of ${weeklyProgress.projectActivity.overdueRate}% 
            in a week`
            projectHealthBadge = "badge badge-error"
            break;
        case "Delayed":
            projectHealthTooltipData = `This project has an overdue rate of ${weeklyProgress.projectActivity.overdueRate}% 
            and a completion rate of ${weeklyProgress.projectActivity.completionRate}% in a week`
            projectHealthBadge = "badge badge-warning"
            break;
        default:
            projectHealthTooltipData = `This project has an overdue rate of 0% and a completion rate of 0%.`
            projectHealthBadge = "badge badge-primary"
    }

    switch(weeklyProgress?.projectInsights.teamEfficiency){
        case "Medium":
            teamEfficiencyTooltipData = `This project has an overdue rate ${weeklyProgress.projectActivity.overdueRate}% 
            activityrate ${weeklyProgress.projectActivity.activityRate}% in a week`
            teamEfficiencyBadge = "badge badge-secondary"
            break;
        case "Low":
            teamEfficiencyTooltipData = `This project has an overdue rate of ${weeklyProgress.projectActivity.overdueRate}% 
            in a week`
            teamEfficiencyBadge = "badge badge-primary"
            break;
        case "High":
            teamEfficiencyTooltipData = `This project has an overdue rate of ${weeklyProgress.projectActivity.overdueRate}% 
            and a completion rate of ${weeklyProgress.projectActivity.completionRate}% in a week.`
            teamEfficiencyBadge = "badge badge-accent"
            break;
        default:
            teamEfficiencyTooltipData  = `This project has an overdue rate of 0% and a completion rate of 0%.`
            teamEfficiencyBadge = "badge badge-primary"
    }
    
    return(
        <div className="min-h-screen">
            <div className="flex flex-col items-center space-y-6 px-3 py-6">
                <div className="bg-base-100 shadow-lg rounded-lg space-y-6 px-3 py-6 md:w-[720px] w-96">
                    <h1 className="text-2xl font-semibold text-center">Weekly Progress</h1>
                    <div className="gap-4 bg-base-300 py-6 px-4 rounded-lg shadow-xl">
                        <h3 className="text-lg font-semibold text-center">Task Overview</h3>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4 py-3 px-2">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{weeklyProgressOverview.totalIssues}</p>
                                <p className="badge badge-primary tooltip" data-tip="Total tasks in this project">
                                    {weeklyProgress?.issueSummary.totalIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{weeklyProgressOverview.onWorkingIssues}</p>
                                <p className="badge badge-info tooltip" data-tip="Tasks onworking in this week">
                                    {weeklyProgress?.issueSummary.onWorkingIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{weeklyProgressOverview.completedIssues}</p>
                                <p className="badge badge-success tooltip" data-tip="Completed tasks in this week">
                                    {weeklyProgress?.issueSummary.completedIssues}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly ietms-center gap-4 py-3 px-2">
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{weeklyProgressOverview.issueInReview}</p>
                                <p className="badge badge-secondary tooltip" data-tip="Tasks currently in review in this week">
                                    {weeklyProgress?.issueSummary.issueInReview}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{weeklyProgressOverview.overdueIssues}</p>
                                <p className="badge badge-warning tooltip" data-tip="Overdue tasks in this week">
                                    {weeklyProgress?.issueSummary.overdueIssues}
                                </p>
                            </div>
                            <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                                <p>{weeklyProgressOverview.reopenedIssues}</p>
                                <p className="badge badge-error tooltip" data-tip="Reopened tasks in this week">
                                    {weeklyProgress?.issueSummary.reopenedIssues}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 justify-evenly bg-base-100 px-3 py-4 rounded-lg shadow-xl">
                        <p className="text-lg font-semibold">activityRate:&nbsp;
                            <span className="font-normal">
                                {weeklyProgress?.projectActivity.activityRate}%
                            </span>
                        </p>
                        <p className="text-lg font-semibold">completionRate:&nbsp;
                            <span className="font-normal">
                                {weeklyProgress?.projectActivity.completionRate}%
                            </span>
                        </p>
                        <p className="text-lg font-semibold">overdueRate:&nbsp;
                            <span className="font-normal">
                                {weeklyProgress?.projectActivity.overdueRate}%
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 justify-evenly px-3 py-4 rounded-lg shadow-xl">
                        <h3 className="text-lg font-semibold text-center">Project Insights</h3>
                        <div className="bg-base-100 px-4 py-6 rounded-lg shadow-xl">
                            <p className="text-lg font-semibold tooltip" data-tip={teamEfficiencyTooltipData}>
                                teamEfficiency:&nbsp;
                                <span className={`font-normal ${teamEfficiencyBadge}`}>
                                    {weeklyProgress?.projectInsights.teamEfficiency}
                                </span>
                            </p>
                        </div>
                        <div className="bg-base-300 px-4 py-6 rounded-lg shadow-xl">
                            <p className="text-lg font-semibold tooltip" data-tip={projectHealthTooltipData}>
                                projectHealth:&nbsp;
                                <span className={`font-normal ${projectHealthBadge}`}>
                                    {weeklyProgress?.projectInsights.projectHealth}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full">
                        <WeeklyTasksTable issues={issues}/>
                    </div>
                    <div className="flex justify-between gap-6 bg-base-100 shadow-xl w-full px-4 py-6 rounded-lg">
                        <div className="flex flex-col items-start space-y-2">
                            <p className="text-lg font-semibold">estimated-delay:&nbsp;
                                <span className="font-normal">coming soon!</span>
                            </p>
                            <p className="text-lg font-semibold">estimated-completion:&nbsp;
                                <span className="font-normal">coming soon!</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            <p className="text-lg font-semibold">generatedBy:&nbsp;
                                <span className="font-normal">
                                    {`${weeklyProgress?.generatedBy} (${weeklyProgress?.role})`}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">generatedAt:&nbsp;
                                <span className="font-normal">{new Date().toDateString()}</span>
                            </p>
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleExport}>Export</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
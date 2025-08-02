"use client";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Acticity } from '@/types/activity';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const labels = ["Accept" , "Reject"];

export default function Barchart({role , activityData}: {role:string , activityData:Acticity | null | undefined}){
    const data = {
        labels,
        datasets:[
            {
                label: "Task Review Status Count",
                data:[activityData?.approvedIssues ?? 0 , activityData?.rejectedIssues ?? 0],
                backgroundColor: ['rgba(255, 99, 132, 0.5)' , 'rgba(53, 162, 235, 0.5)'],
                borderWidth: 0.5,
                barThickness: 35,
            },
        ]
    };
    return(
        <div className="w-full bg-base-300 rounded-lg shadow-lg mb-6 py-6 px-3">
            <h1 className="text-center font-semibold text-xl">{
            role === "TeamLead" ? "TeamLead Activity" : 
            role === "Manager" ? "ManagerActivity" : "ActivitySection"}</h1>
            {
                role === "TeamLead" && activityData ? (
                    <>
                        <Bar data={data}></Bar>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="font-bold text-lg">AvgActionTime:
                                <span className="font-normal text-xl">{activityData?.avgIssueAcionTime ?? 0} Days</span>
                            </p>
                            <p className="font-bold text-lg">Task Assignement Accept:
                                <span className="font-normal text-xl">{activityData?.issueAcceptanceRate ?? 0}%</span>
                            </p>
                            <p className="font-bold text-lg">Task Assignement Reject:
                                <span className="font-normal text-xl">{activityData?.issueRejectionRate ?? 0}%</span>
                            </p>
                        </div>
                    </>
                ): role === "TeamLead" && activityData && (
                    <>
                        <Bar data={data}></Bar>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="font-bold text-lg">AvgReviewTime:
                                <span className="font-normal text-xl">{activityData?.avgIssueReviewTime ?? 0} Days</span>
                            </p>
                        </div>
                    </>
                )
            }
            
        </div>
    )
}
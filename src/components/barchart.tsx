"use client";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Acticity } from '@/types/activity';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const labels = ["Accept" , "Reject"];

export default function Barchart({role , activityData , isReview = false}: 
    {role:string , activityData:Acticity | null | undefined , isReview:boolean}){
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
    const employeeRequestData = {
        labels,
        datasets:[
            {
                label: "Task Request Count",
                data:[activityData?.acceptedIssueRequests ?? 0 , activityData?.rejectedIssueRequests ?? 0],
                backgroundColor: ['rgba(255, 99, 132, 0.5)' , 'rgba(53, 162, 235, 0.5)'],
                borderWidth: 0.5,
                barThickness: 35,
            },
        ]
    };
    const employeeReviewData = {
        labels,
        datasets:[
            {
                label: "Task Review Count",
                data:[activityData?.reviewAcceptedIssues ?? 0 , activityData?.rejectedIssueReviews ?? 0],
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
            role === "Manager" ? "ManagerActivity" : 
            role === "Employee" ? "EmployeeActivity": "ActivitySection"}</h1>
            {
                role === "TeamLead" && activityData && !isReview ? (
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
                ): role === "TeamLead" && activityData && !isReview ? (
                    <>
                        <Bar data={data}></Bar>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="font-bold text-lg">AvgReviewTime:
                                <span className="font-normal text-xl">{activityData?.avgIssueReviewTime ?? 0} Days</span>
                            </p>
                        </div>
                    </>
                ) : role === "Employee" && activityData && !isReview ? (
                    <>
                        <Bar data={employeeRequestData}></Bar>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="font-bold text-lg">AcceptedTaskRequests:
                                <span className="font-normal text-xl">{activityData?.acceptedIssueRequests ?? 0}</span>
                            </p>
                            <p className="font-bold text-lg">RejectedTaskRequests:
                                <span className="font-normal text-xl">{activityData?.rejectedIssueRequests ?? 0}</span>
                            </p>
                            <p className="font-bold text-lg">RequestAcceptRate:
                                <span className="font-normal text-xl">{activityData?.issueRequestAcceptRate.toFixed(2) ?? 0}%</span>
                            </p>
                            <p className="font-bold text-lg">RequestRejectRate:
                                <span className="font-normal text-xl">{activityData?.issueRequestRejectRate.toFixed(2) ?? 0}%</span>
                            </p>
                        </div>
                    </>
                ) : role === "Employee" && activityData && isReview ? (
                    <>
                        <Bar data={employeeReviewData}></Bar>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="font-bold text-lg">AcceptedTaskReviews:
                                <span className="font-normal text-xl">{activityData?.reviewAcceptedIssues ?? 0}</span>
                            </p>
                            <p className="font-bold text-lg">RejectedTaskReviews:
                                <span className="font-normal text-xl">{activityData?.rejectedIssueReviews ?? 0}</span>
                            </p>
                            <p className="font-bold text-lg">ReviewAcceptRate:
                                <span className="font-normal text-xl">{activityData?.issueReviewAcceptRate.toFixed(2) ?? 0}%</span>
                            </p>
                            <p className="font-bold text-lg">ReviewRejectRate:
                                <span className="font-normal text-xl">{activityData?.issueReviewRejectRate.toFixed(2) ?? 0}%</span>
                            </p>
                        </div>
                    </>
                ) : role === "Manager" && activityData && !isReview ? (
                    <>
                        <Bar data={data}></Bar>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="font-bold text-lg">AvgActionTime:&nbsp;
                                <span className="font-normal text-xl">{activityData?.avgIssueReviewTime.toFixed(1) ?? 0}Days</span>
                            </p>
                            <p className="font-bold text-lg">Task Review Accept:
                                <span className="font-normal text-xl">{activityData?.approvedIssues ?? 0}</span>
                            </p>
                            <p className="font-bold text-lg">Task Review Reject:
                                <span className="font-normal text-xl">{activityData?.rejectedIssues ?? 0}</span>
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-center text-xl">Not Enough Data</p>
                    </>
                )
            }
            
        </div>
    )
}
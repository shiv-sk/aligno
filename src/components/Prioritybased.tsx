"use client";

import { IssueRates } from '@/types/prioritybased';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
export default function PriorityBasedIssue({role ,  priorityData}: {role:string , priorityData:IssueRates | null | undefined}){
    const data = {
        labels: priorityData?.prioritybased && priorityData?.prioritybased.length > 0 ? 
        priorityData?.prioritybased.map((prioritybase)=>(prioritybase.priority)):[] ,
        datasets:[
            {
                label: 'Task Assigned By You',
                data:priorityData?.prioritybased && priorityData?.prioritybased.length > 0 ? 
                priorityData?.prioritybased.map((prioritybase)=>(prioritybase.count)) : [] ,
                backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor:[
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 0.5,
            }
        ]
    };
    const options = {
        cutout: '40%',
    }
    return(
        <div className="bg-base-300 py-6 px-3 shadow-lg rounded-lg mb-6 w-full">
            <h1 className="text-center font-semibold text-xl">priorityBased Tasks </h1>
            {
                role === "TeamLead" && priorityData && priorityData ? (
                    <>
                        <div className="md:w-[550px] md:h-[500px] flex justify-center items-center mx-auto">
                            {
                                priorityData && Object.values(priorityData).every((val)=>(val === 0)) ? 
                                (
                                    <>
                                        <p className="text-center font-semibold text-xl">No enough Data!</p>
                                    </>
                                ) : (
                                    <>
                                        <Doughnut options={options} data={data} />
                                    </>
                                )
                            }
                        </div>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="border-l-2 md:text-lg font-bold px-1.5">CompletionRate:
                                <span className="font-normal md:text-xl">{priorityData?.completionRate ?? 0}%</span>
                            </p>
                            <p className="border-l-2 md:text-lg font-bold px-1.5">ActivityRate:
                                <span className="font-normal md:text-xl">{priorityData?.activityRate ?? 0}%</span>
                            </p>
                            <p className="border-l-2 md:text-lg font-bold px-1.5">OverdueRate:
                                <span className="font-normal md:text-xl">{priorityData?.overdueRate ?? 0}%</span>
                            </p>
                        </div>
                    </>
                ): role === "Admin" && priorityData && Object.values(priorityData).every((val)=>(val === 0)) ? (
                    <>
                        <div className="md:w-[550px] md:h-[500px] flex justify-center items-center mx-auto">
                            <p className="text-center font-semibold text-xl">Not enough Data!</p>
                        </div>
                    </>
                ): role === "Admin" && priorityData ? (
                    <>
                        <div className="md:w-[550px] md:h-[500px] flex justify-center items-center mx-auto">
                            <Doughnut options={options} data={data} />
                        </div>
                    </>
                ): (
                    <>
                        <div className="md:w-[550px] md:h-[500px] flex justify-center items-center mx-auto">
                            <p className="text-center">Not enough Data!</p>
                        </div>
                    </>
                )
            }
            
        </div>
    )
}
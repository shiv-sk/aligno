"use client";

import { IssueRates } from '@/types/prioritybased';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ProjectHealth({role , projecthealth}: {role:string , projecthealth:IssueRates | null | undefined}){
    const labels = ["Completionrate" , "Activityrate" , "Overduerate"];
    const data = {
        labels,
        datasets:[
            {
                label: "Project Health",
                data:[projecthealth?.completionRate ?? 0 , projecthealth?.activityRate ?? 0 , projecthealth?.overdueRate ?? 0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.6,
            },
        ] 
    }
    return(
        <div className="bg-base-300 py-6 px-3 shadow-lg rounded-lg my-6 w-full">
            <h1 className="text-center font-semibold text-xl">Projecthealth</h1>
            {
                role === "Manager" && projecthealth ? (
                    <>
                        <Line data={data}/>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="border-l-2 md:text-lg font-bold px-1.5">CompletionRate:
                                <span className="font-normal md:text-xl">{projecthealth?.completionRate || 0}%</span>
                            </p>
                            <p className="border-l-2 md:text-lg font-bold px-1.5">ActivityRate:
                                <span className="font-normal md:text-xl">{projecthealth?.activityRate || 0}%</span>
                            </p>
                            <p className="border-l-2 md:text-lg font-bold px-1.5">OverdueRate:
                                <span className="font-normal md:text-xl">{projecthealth.overdueRate || 0}%</span>
                            </p>
                        </div>
                    </>
                ) : role === "Admin" && projecthealth ? (
                    <>
                        <Line data={data}/>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="border-l-2 md:text-lg font-bold px-1.5">CompletionRate:
                                <span className="font-normal md:text-xl">{projecthealth?.completionRate || 0}%</span>
                            </p>
                            <p className="border-l-2 md:text-lg font-bold px-1.5">ActivityRate:
                                <span className="font-normal md:text-xl">{projecthealth?.activityRate || 0}%</span>
                            </p>
                            <p className="border-l-2 md:text-lg font-bold px-1.5">OverdueRate:
                                <span className="font-normal md:text-xl">{projecthealth.overdueRate || 0}%</span>
                            </p>
                        </div>
                    </>
                ) : role === "Employee" && projecthealth && (
                    <>
                        <Line data={data}/>
                        <div className="border-bg-green-900 flex flex-wrap justify-evenly py-3">
                            <p className="border-l-2 md:text-lg font-bold px-1.5">CompletionRate:
                                <span className="font-normal md:text-xl">{projecthealth?.completionRate || 0}%</span>
                            </p>
                            <p className="border-l-2 md:text-lg font-bold px-1.5">ActivityRate:
                                <span className="font-normal md:text-xl">{projecthealth?.activityRate || 0}%</span>
                            </p>
                            <p className="border-l-2 md:text-lg font-bold px-1.5">OverdueRate:
                                <span className="font-normal md:text-xl">{projecthealth.overdueRate || 0}%</span>
                            </p>
                        </div>
                    </>
                )
            }
        </div>
        
    )
}
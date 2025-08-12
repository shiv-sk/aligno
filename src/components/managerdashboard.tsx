"use client";

import Link from "next/link";
import AssignedusersTable from "./assigneduserstable";
import { GiHamburgerMenu } from "react-icons/gi";
import { ChangeEvent, useState } from "react";
import ManagerAnalyticDashboard from "./manageranalytic";

export default function ManagerDashboard({ projectId , projectName }: { projectId: string , projectName:string } ){
    const [isAnalyticView , setIsAnalyticView] = useState(false);
    const handleAnalyticClick = (e:ChangeEvent<HTMLInputElement>)=>{
        try {
            setIsAnalyticView(e.target.checked);
        } catch (error) {
            console.error("error from handleAnalyticClick! " , error);
        }
    }
    if(!projectId){
        return;
    }
    return(
        <div className="min-h-screen">
            <div className="flex flex-col items-center pt-6 pb-16 gap-6">
                <div className="flex flex-wrap justify-center items-center gap-3 py-6 px-3">
                    <p className={`text-lg ${!isAnalyticView ? "font-bold bg-base-100 shadow-lg py-2 px-3 rounded-lg" : 
                    isAnalyticView ? "font-normal bg-base-100 shadow-lg py-2 px-3 rounded-lg" : ""}`}>Actions View</p>
                    <input type="checkbox"
                    checked={isAnalyticView}
                    onChange={handleAnalyticClick} 
                    className="toggle toggle-xl" />
                    <p className={`text-lg ${isAnalyticView ? "font-bold bg-base-100 shadow-lg py-2 px-3 rounded-lg" : 
                    !isAnalyticView ? "font-normal bg-base-100 shadow-lg py-2 px-3 rounded-lg" : ""}`}>Analytic View</p>
                </div>
                {
                    isAnalyticView ? (
                        <div>
                            <ManagerAnalyticDashboard projectId={projectId} />
                        </div>
                    ) : (
                        <>
                            <div className="drawer drawer-end md:hidden">
                                <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <ul className="flex justify-between items-center w-full max-w-4xl bg-base-200 rounded-xl shadow-xl py-4 px-6">
                                        <label htmlFor="menu-drawer" className="btn btn-outline">
                                            <GiHamburgerMenu className="text-xl" />
                                        </label>
                                        <li className="flex flex-col justify-center items-center">
                                            <h2 className="text-2xl font-semibold text-gray-700">{projectName}</h2>
                                            <p className="text-sm text-gray-500 italic">
                                                Assigned as <span className="font-medium badge badge-info">Manager</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="drawer-side z-40">
                                    <label htmlFor="menu-drawer" className="drawer-overlay"></label>
                                    <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content gap-2">
                                    {/* Sidebar content here */}
                                    <Link href={`/allissues/1234`}>
                                        <li>
                                            <button className="btn w-full shadow-xl">MyProjects</button>
                                        </li>
                                    </Link>
                                    <Link href={`/createissue/${projectId}`}>
                                        <li>
                                            <button className="btn w-full btn-neutral shadow-xl">AllTasks</button>
                                        </li>
                                    </Link>
                                    <Link href={`/createissue/${projectId}`}>
                                        <li>
                                            <button className="btn w-full btn-neutral shadow-xl">CreateTask</button>
                                        </li>
                                    </Link>
                                    <Link href={`/issuereviews/${projectId}`}>
                                        <li>
                                            <button className="btn w-full btn-neutral shadow-xl">ReviewRequests</button>
                                        </li>
                                    </Link>
                                    <Link href={`/overview/${projectId}`}>
                                        <li>
                                            <button className="btn w-full btn-neutral shadow-xl">Overview</button>
                                        </li>
                                    </Link>
                                    </ul>
                                </div>
                            </div>
                                <ul className="hidden md:flex justify-around items-center w-full max-w-4xl bg-base-100 rounded-xl shadow-xl py-6 px-6">
                                    <div className="hidden md:flex gap-4">
                                        <li>
                                            <Link href={`/allissues/1234`}>
                                                <button className="btn text-lg shadow-xl">MyProjects</button>
                                            </Link>
                                        </li>
                                    </div>
                                    <div className="hidden md:flex gap-4">
                                        <li>
                                            <Link href={`/allissues/1234`}>
                                                <button className="btn btn-neutral shadow-xl">AllTasks</button>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/createissue/${projectId}`}>
                                                <button className="btn btn-neutral shadow-xl">CreateIssue</button>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/issuereviews/${projectId}`}>
                                                <button className="btn btn-neutral shadow-xl">ReviewRequests</button>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/overview/${projectId}`}>
                                                <button className="btn btn-neutral shadow-xl">Overview</button>
                                            </Link>
                                        </li>
                                    </div>
                                </ul>
                            <div className="hidden md:flex justify-center flex-col w-full max-w-4xl bg-base-300 shadow-md rounded-xl py-4 px-6 text-center">
                                <h2 className="text-2xl font-semibold text-gray-700">{projectName}</h2>
                                <p className="text-sm text-gray-500 italic">
                                    Assigned as <span className="font-medium badge badge-info">Manager</span>
                                </p>
                            </div>
                            <div className="">
                                <AssignedusersTable projectId={projectId}/>
                            </div>
                        </>
                    )
                }
                
            </div>
        </div>
    )
}
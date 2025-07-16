"use client";

import Link from "next/link";
import AssignedusersTable from "./assigneduserstable";
import { GiHamburgerMenu } from "react-icons/gi";

export default function TeamLeadDashboard({ projectId , projectName }: { projectId: string , projectName:string } ){
    return(
        <div className="min-h-screen">
            <div className="flex flex-col items-center pt-6 pb-16 gap-6">
                <div className="drawer drawer-end md:hidden">
                    <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <ul className="flex justify-between items-center w-full max-w-4xl bg-base-200 rounded-xl shadow-xl py-4 px-6">
                            <label htmlFor="menu-drawer" className="btn btn-outline">
                                <GiHamburgerMenu className="text-xl" />
                            </label>
                        </ul>
                    </div>
                    <div className="drawer-side z-40">
                        <label htmlFor="menu-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content gap-2">
                        {/* Sidebar content here */}
                        <Link href={`/allissues/1234`}>
                            <li><button className="btn w-full">All Projects</button></li>
                        </Link>
                        <Link href={`/allissues/${projectId}`}>
                            <li><button className="btn w-full btn-neutral">All Tasks</button></li>
                        </Link>
                        <Link href={`/allissuerequests`}>
                            <li><button className="btn w-full btn-neutral">Review Requests</button></li>
                        </Link>
                        <Link href={`/assignedissues`}>
                            <li><button className="btn w-full btn-neutral">Assigned Tasks</button></li>
                        </Link>
                        <Link href={`/overview/${projectId}`}>
                            <li className="btn w-full btn-neutral">Overview</li>
                        </Link>
                        </ul>
                    </div>
                </div>
                <ul className="hidden md:flex justify-around items-center w-full max-w-4xl bg-base-100 rounded-xl shadow-xl py-6 px-6">
                    <div className="hidden md:flex gap-4">
                        <li>
                            <Link href={`/allissues/1234`}>
                                <button className="btn text-lg shadow-xl">All Projects</button>
                            </Link>
                        </li>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <li>
                            <Link href={`/allissues/${projectId}`}>
                                <button className="btn btn-neutral shadow-xl">All Tasks</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/allissuerequests`}>
                                <button className="btn btn-neutral shadow-xl">Review Requests</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/assignedissues`}>
                                <button className="btn btn-neutral shadow-xl">Assigned Tasks</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/overview/${projectId}`}>
                                <button className="btn btn-neutral shadow-xl">Overview</button>
                            </Link>
                        </li>
                    </div>
                </ul>
                <div className="w-full max-w-4xl bg-base-300 shadow-md rounded-xl py-4 px-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-700">{projectName}</h2>
                    <p className="text-sm text-gray-500 italic">
                        Assigned as <span className="font-medium badge badge-info">Team Lead</span>
                    </p>
                </div>
                <div className="">
                    <AssignedusersTable projectId={projectId}/>
                </div>
            </div>
        </div>
    )
}
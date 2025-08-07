"use client";

import { useAuth } from "@/context/authcontext";
import Link from "next/link";

export default function Navbar(){
    const {user , logoutUser} = useAuth();
    return(
        <div className="navbar bg-base-100 shadow-xl">
            {
                user && user.isAdmin ? (
                    <>
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
                                    stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li className="font-bold text-lg">
                                        <Link href={"/createuser"}>AddUser</Link>
                                    </li>
                                    <li className="font-bold text-lg">
                                        <Link href={"/addproject"}>AddProject</Link>
                                    </li>
                                    <li className="font-bold text-lg">
                                        <Link href={"/allprojects"}>AllProjects</Link>
                                    </li>
                                </ul>
                            </div>
                            <Link href={"/"} className="btn btn-ghost text-2xl bg-primary text-white shadow-lg border-b-2">Aligno</Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li className="font-bold text-lg">
                                    <Link href={"/createuser"}>AddUser</Link>
                                </li>
                                <li className="font-bold text-lg">
                                    <Link href={"/addproject"}>AddProject</Link>
                                </li>
                                <li className="font-bold text-lg">
                                    <Link href={"/allprojects"}>AllProjects</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <button onClick={logoutUser} className="btn">Logout</button>
                        </div>
                    </>
                ): user && !user.isAdmin ? (
                    <>
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5" fill="none" viewBox="0 0 24 24" 
                                    stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li className="font-bold text-lg">
                                        <Link href={"/"}>MyTasks</Link>
                                    </li>
                                </ul>
                            </div>
                            <Link href={"/"} className="btn btn-ghost text-4xl">Aligno</Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li className="font-bold text-lg">
                                    <Link href={"/mytasks"}>MyTasks</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden md:navbar-end">
                            <Link href={"/login"} className="btn">Logout</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="navbar-start">
                            <Link href={"/"} className="btn btn-ghost text-2xl bg-primary text-white shadow-lg border-b-2">Aligno</Link>
                        </div>
                        <div className="navbar-end">
                            <Link href={"/login"} className="btn">Login</Link>
                        </div>
                    </>
                )
            }
            
        </div>
    )
}
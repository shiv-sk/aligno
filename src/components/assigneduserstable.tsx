/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import { useEffect, useState } from "react";

export default function AssignedusersTable({ projectId }: { projectId: string }){
    interface AssignedUsers{
        _id:string,
        userId:{
            _id:string,
            name:string,
            email:string
        },
        role:string
    }
    const [allUsers , setAllUsers] = useState<AssignedUsers[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    useEffect(()=>{
        if(!projectId){
            return;
        }
        const getAssignedUsers = async()=>{
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/projectmember/assignedusers/${projectId}` , "GET");
                console.log("response from assigned-Users-Table! " , response);
                if(response.success){
                    setAllUsers(response?.projectUsers || []);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                alert(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getAssignedUsers();
    } , [projectId]);
    return(
        <div className="overflow-x-auto py-5 px-3 shadow-xl rounded-xl bg-base-100">
            <h1 className="text-center px-2.5 py-4 text-lg font-semibold border-b-2 border-b-neutral">AssignedUsers</h1>
            <table className="table table-sm md:table-md min-w-full divide-y divide-neutral-200">
                <thead>
                <tr>
                    <th className="text-neutral text-sm">UserName</th>
                    <th className="text-neutral text-sm">UserEmail</th>
                    <th className="text-neutral text-sm">Role</th>
                </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">Loading...</td>
                            </tr>
                        ) :
                        allUsers && allUsers.length > 0 ? allUsers.map((user)=>{
                            let badgeColor = "";
                            switch (user.role){
                                case "Manager":
                                    badgeColor = "badge badge-neutral text-center mt-2.5 font-semibold";
                                    break;
                                case "TeamLead":
                                    badgeColor = "badge badge-info text-center mt-2.5 font-semibold";
                                    break;
                                case "Employee":
                                    badgeColor = "badge badge-secondary text-center mt-2.5 font-semibold ";
                                    break;
                                default:
                                    badgeColor = ""
                            }
                            return(
                                <tr 
                                className={`transition-all ease-in-out hover:bg-base-300 hover:text-neutral hover:cursor-pointer`} 
                                key={user._id}>
                                    <td>{user.userId.name}</td>
                                    <td>{user.userId.email}</td>
                                    <td className={`${badgeColor}`}>{user.role}</td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">No assigned users found.</td>
                            </tr>
                        )
                    }
                    
                </tbody>
            </table>
        </div>
    )
}
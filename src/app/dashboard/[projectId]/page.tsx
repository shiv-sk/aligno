/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import EmployeeDashboard from "@/components/employeedashboard";
import ManagerDashboard from "@/components/managerdashboard";
import TeamLeadDashboard from "@/components/tldashboard";
import { useAuth } from "@/context/authcontext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard(){
    const {projectId} = useParams();
    const {user} = useAuth();
    const [role , setRole] = useState("");
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        const getUserRole = async()=>{
            if(!user || !user._id || !projectId){
                return;
            }
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/projectmember/role?projectId=${projectId}&userId=${user._id}` , "GET");
                console.log("role of user in this project! " , response);
                if(response.success){
                    setRole(response.role || "");
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                alert(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getUserRole();
    } , [projectId , user]);
    return(
        <div className="py-5 bg-base-300 min-h-screen">
            {
                isLoading ? <div className="flex justify-center items-center min-h-screen">Loading...</div> :
                role === "TeamLead" ? <TeamLeadDashboard projectId={projectId as string}/> : 
                role === "Manager" ? <ManagerDashboard projectId={projectId as string}/> : 
                role === "Employee" ? <EmployeeDashboard projectId={projectId as string}/> : 
                <p className="flex justify-center items-center min-h-screen">No Dashboard!</p>
            }
        </div>
    )
}
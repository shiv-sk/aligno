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
        if(!user || !user._id || !projectId){
            alert("missing query params!");
            return;
        }
        setIsLoading(true);
        const getUserRole = async()=>{
            try {
                const response = await getAndDeleteReq(`/api/projectmember/role?projectId=${projectId}&userId=${user._id}` , "GET");
                // console.log("role of user in this project! " , response);
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
    
    console.log(projectId);
    return(
        <>
            {
                isLoading ? "Loading..." :
                role === "TeamLead" ? <TeamLeadDashboard/> : 
                role === "Manager" ? <ManagerDashboard/> : 
                role === "Employee" ? <EmployeeDashboard/> : <p>No Dashboard!</p>
            }
        </>
    )
}
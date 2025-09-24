/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAndDeleteReq } from "@/apiCalls/apiCalls";
import EmployeeDashboard from "@/components/employeedashboard";
import ManagerDashboard from "@/components/managerdashboard";
import TeamLeadDashboard from "@/components/tldashboard";
import { useAuth } from "@/context/authcontext";
import { useParams , useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard(){
    const {projectId} = useParams();
    const router = useRouter();
    const {user , isLoading:authLoading} = useAuth();
    const [role , setRole] = useState("");
    const [projectName , setProjectName] = useState("");
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/login");
            toast.warning("please login!");
        }
    } , [user , router , authLoading]);

    useEffect(()=>{
        const getUserRole = async()=>{
            if(!user || !user._id || !projectId){
                return;
            }
            setIsLoading(true);
            try {
                const response = await getAndDeleteReq(`/api/projectmember/role?projectId=${projectId}&userId=${user._id}` , "GET");
                // console.log("role of user in this project! " , response);
                if(response.success){
                    setRole(response.role || "");
                    setProjectName(response.projectName || "projectName");
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Server Error!.";
                toast.error(errorMessage);
            }finally{
                setIsLoading(false);
            }
        }
        getUserRole();
    } , [projectId , user , role]);
    return(
        <div className="py-5 bg-base-300 min-h-screen">
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                ) :
                role === "TeamLead" ? <TeamLeadDashboard projectId={projectId as string} projectName={projectName as string} 
                userId={user?._id as string}/> :
                role === "Manager" ? <ManagerDashboard projectId={projectId as string} projectName={projectName as string}/> :
                role === "Employee" ? <EmployeeDashboard projectId={projectId as string} projectName={projectName as string}/> :
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg font-semibold">
                        Sorry, we couldn&apos;t find this project. It might have been deleted or moved!.
                    </p>
                </div>
            }
        </div>
    )
}
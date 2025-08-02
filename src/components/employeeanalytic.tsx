import Barchart from "@/components/barchart";
import IssueOverview from "@/components/issueoverview";
import ProjectHealth from "@/components/projecthealth";

export default function EmployeeAnalyticDashboard(){
    return(
        <div className="bg-base-300 min-h-screen py-6">
            <h1 className="text-3xl font-bold text-center py-3.5 px-2 text-slate-700">EmployeeDashboard</h1>
            <div 
            className="flex flex-col justify-center items-center md:w-[720px] w-96 mx-auto bg-base-100 py-6 px-3 rounded-lg shadow-lg">
                <IssueOverview/>
                <Barchart/>
                <Barchart/>
                <ProjectHealth/>
            </div>
        </div>
    )
}
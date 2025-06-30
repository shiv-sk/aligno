import dbConnect from "@/lib/connection.db";
import checkIsAdmin from "@/lib/middleware/checkisadmin";
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';
export async function GET(req: NextRequest , {params}:{params:{projectId:string}}){
    await dbConnect();
    try {
        const projectId = params.projectId;
        if(!projectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const checkAdmin = await checkIsAdmin();
        if("status" in checkAdmin){
            return checkAdmin;
        }
        const issues = await Issue.find({projectId})
        if(issues.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issues is not found!"
            } , {status:400})
        }
        const overdueStatus = ["Reopened" , "Open" , "Assigned"];
        const openStatus = ["Reopened" , "Open" , "Assigned" , "Review"];
        const issueStatus = ["Assigned" , "Review" , "Reopened"];
        const totalIssues = issues.length;
        const completedIssues = issues.filter((issue)=>(issue.status === "Closed")).length;
        const onProcessIssues = issues.filter((issue)=>(issueStatus.includes(issue.status))).length;
        const completionRate = Math.round((completedIssues / totalIssues) * 100);
        const overdueIssues = issues.filter((issue)=>((overdueStatus.includes(issue.status)) && new Date() > new Date(issue.duedate))).length;
        const overdueRate = Math.round((overdueIssues / totalIssues) * 100);
        const activityRate = Math.round((onProcessIssues / totalIssues) * 100);
        const unAssignedIssues = issues.filter((issue)=>(issue.assignedTo === null)).length;
        const openIssues = issues.filter((issue)=>(openStatus.includes(issue.status))).length;
        let projectHealth = "Balanced";
        let teamEfficiency = "Medium";
        if(overdueRate > 40){
            projectHealth = "Delayed";
        }else if(onProcessIssues > completedIssues && overdueRate > 20){
            projectHealth = "Overloaded";
        }
        if(completionRate >= 80 && overdueIssues <= 1){
            teamEfficiency = "High";
        }else if(completionRate <= 40 && overdueRate >= 30){
            teamEfficiency = "Low";
        }
        const issueSummary = {
            completionRate,
            activityRate,
            unAssignedIssues,
            completedIssues,
            openIssues
        }
        const projectInsights = {
            teamEfficiency,
            projectHealth
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"admin issue summary! ",
            data:{issueSummary , projectInsights}
        } , {status:200})
    } catch (err) {
        console.error("AdminInsights error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"AdminInsights error! "
        } , {status:500})
    }
}
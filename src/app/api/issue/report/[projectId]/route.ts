import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";

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
        const authorizedUser = await authorizeRole(["Manager" , "TeamLead" , "Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const issues = await Issue.find({projectId , updatedAt: { $gte: startDate, $lte: endDate }}).populate("assignedTo" , "name");
        if(issues.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issues is not found!"
            } , {status:400})
        }
        const overdueStatus = ["Reopened" , "Open" , "Assigned"];
        const issueStatus = ["Assigned" , "Review"];
        const totalIssues = issues.length;
        const completedIssues = issues.filter((issue)=>(issue.status === "Closed")).length;
        const onProcessIssues = issues.filter((issue)=>(issueStatus.includes(issue.status))).length;
        const issueInReview = issues.filter((issue)=>(issue.status === "Review")).length;
        const reopenedIssues = issues.filter((issue)=>(issue.status === "Reopened")).length;
        const completionRate = Math.round((completedIssues / totalIssues) * 100);
        const overdueIssues = issues.filter((issue)=>((overdueStatus.includes(issue.status)) && new Date() > new Date(issue.duedate))).length;
        const overdueRate = Math.round((overdueIssues / totalIssues) * 100);
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
        const weeklyIssueSummary = {
            onProcessIssues,
            issueInReview,
            reopenedIssues,
            completionRate,
            overdueIssues,
            completedIssues,
            totalIssues,
            overdueRate
        }
        const insight = {
            projectHealth,
            teamEfficiency
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"formated Issues are! ",
            data:{weeklyIssueSummary , insight , issues}
        } , {status:200})
    } catch (err) {
        console.error("ganttChart error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"GantChart error! "
        } , {status:500})
    }
}
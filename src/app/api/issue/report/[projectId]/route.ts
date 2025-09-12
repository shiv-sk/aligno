import { getFilteredIssues } from "@/helpers/getfiltereddata";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
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
        const authorizedUser = await authorizeRole(["Manager" , "TeamLead" , "Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const generatedBy = authorizedUser.user.name
        const role = authorizedUser.userRole;
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const issues = await Issue.find({projectId , updatedAt: { $gte: startDate, $lte: endDate }})
        .populate("assignedTo" , "name");
        if(issues.length === 0){
            const issueSummary = {
                totalIssues:0,
                overdueIssues:0,
                completedIssues:0,
                onWorkingIssues:0,
                issueInReview:0,
                reopenedIssues:0,
            }
            const projectInsights = {
                teamEfficiency:"noData",
                projectHealth:"noData"
            }
            const projectActivity = {
                overdueRate:0,
                activityRate:0,
                completionRate:0,
            }
            const sanitizedIssues = 0
            return NextResponse.json({
                success:true,
                status:200,
                message:"Issues is not found!",
                data:{issueSummary , projectInsights , sanitizedIssues , generatedBy , projectActivity , role}
            } , {status:200})
        }
        const {totalIssues , completedIssues , onWorkingIssues , overdueIssues , 
            issueInReview , reopenedIssues , overdueRate , activityRate , completionRate} = getFilteredIssues(issues)
        let projectHealth = "Balanced";
        let teamEfficiency = "Medium";
        if(overdueRate > 40){
            projectHealth = "Delayed";
        }else if(onWorkingIssues > completedIssues && overdueRate > 20){
            projectHealth = "Overloaded";
        }
        if(completionRate >= 80 && overdueIssues <= 1){
            teamEfficiency = "High";
        }else if(completionRate <= 40 && overdueRate >= 30){
            teamEfficiency = "Low";
        }
        const issueSummary = {
            totalIssues,
            overdueIssues,
            completedIssues,
            onWorkingIssues,
            issueInReview,
            reopenedIssues
        }
        const projectInsights = {
            teamEfficiency,
            projectHealth
        }
        const projectActivity = {
            overdueRate,
            activityRate,
            completionRate,
        }
        const sanitizedIssues = issues.map((issue)=>({
            name:issue.name,
            status:issue.status,
            priority:issue.priority,
            assignedTo:issue.assignedTo?.name || "unAssigned",
            assignedAt:issue.assignedAt ? issue.assignedAt.toISOString().split("T")[0] : "-",
            completedAt:issue.completedAt ? issue.completedAt.toISOString().split("T")[0] : "-",
            duedate:issue.duedate ? issue.duedate.toISOString().split("T")[0] : "-",
        }))
        
        return NextResponse.json({
            success:true,
            status:200,
            message:"formated Issues are! ",
            data:{issueSummary , projectInsights , sanitizedIssues , generatedBy , projectActivity , role}
        } , {status:200})
    } catch (err) {
        console.error("PdfReport error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"PdfReport error! "
        } , {status:500})
    }
}
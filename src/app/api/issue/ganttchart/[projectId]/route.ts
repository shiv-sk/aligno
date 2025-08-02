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
        const issues = await Issue.find({projectId});
        if(issues.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issues is not found!"
            } , {status:400})
        }
        const getProgress = function (status: string){
            switch(status){
                case "Closed": return 100;
                case "Assigned": return 50;
                case "Open": return 10;
                case "Review": return 80;
                case "Reopened": return 70;
                default: return 10;
            }
        }
        const formattedIssueData = issues.map((issue)=>({
            id:issue._id.toString(),
            name:issue.name,
            start:new Date(issue.assignedAt ?? issue.createdAt).toISOString().split("T")[0],
            end:new Date(issue.completedAt ?? issue.duedate).toISOString().split("T")[0],
            type:"task",
            progress:getProgress(issue.status),
            isDisabled: false,
            dependencies: [],
            status:issue.status,
        }))
        const issueStatus = ["Closed" , "Assigned" , "Review"];
        const overdueStatus = ["Reopened" , "Open" , "Assigned"];
        const totalIssues = issues.length;
        const completedIssues = issues.filter((issue)=>(issue.status === "Closed")).length;
        const overdueIssues = issues.filter((issue)=>((overdueStatus.includes(issue.status)) && new Date() > new Date(issue.duedate))).length;
        const activeIssues = issues.filter((issue)=>(issueStatus.includes(issue.status))).length;
        const activityRate = Math.round((activeIssues / totalIssues) * 100);
        const overdueRate = Math.round((overdueIssues / totalIssues) * 100);
        const completionRate = Math.round((completedIssues / totalIssues) * 100);
        const issueSummary = {
            activityRate,
            overdueRate,
            completionRate,
            totalIssues,
            overdueIssues,
            completedIssues,
            activeIssues
        } 
        return NextResponse.json({
            success:true,
            status:200,
            message:"formated Issues are! ",
            data:{formattedIssueData , issueSummary}
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
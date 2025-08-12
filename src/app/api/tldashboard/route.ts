import { getFilteredIssues, getFilteredRequestIssues } from "@/helpers/getfiltereddata";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    await dbConnect();
    try {
        const searchParams = req.nextUrl.searchParams;
        const projectId = searchParams.get("projectId");
        const userId = searchParams.get("userId");
    
        if(!projectId || !userId){
            return NextResponse.json({
                success:false,
                status:400,
                message: "Both projectId and userId are required.",
            } , {status:400})
        }
    
        const authorizeUser = await authorizeRole(["TeamLead"])(projectId.toString());
        if("status" in authorizeUser){
            return authorizeUser;
        }
        let teamLeadActivity;
        const totalIssuesofProject = await Issue.find({projectId});
        if(totalIssuesofProject.length === 0){
            return NextResponse.json({
            success:true,
            status:404,
            message:"no tasks for projects"
            } , {status:404})
        } 
        const issues  = await Issue.find({assignedBy:userId}) 
        if(issues.length === 0){
            const issueOverview = {
            totalIssuesofProject:totalIssuesofProject.length ?? 0,
            totalAssignedIssues:0,
            completedIssues:0,
            issueInReview:0,
            overdueIssues:0,
            reopenedIssues:0,
            actionableIssues:0,
            issues:0
            },
            teamLeadActivity = {
                approvedIssues:0,
                rejectedIssues:0,
                avgIssueAcionTime:0,
            }
            const issuePriority = {
                activityRate:0,
                completionRate:0,
                overdueRate:0,
                prioritybased:0
            }
            const assignedissues = 0
            return NextResponse.json({
                success:true,
                status:200,
                data:{issueOverview , teamLeadActivity , issuePriority , assignedissues},
                message:"Issues are not found!"
            } , {status:200})
        }
        
        const issueRequests = await IssueRequest.find({actionTakenBy:userId})
        if(issueRequests.length === 0){
            teamLeadActivity = {
                approvedIssues:0,
                rejectedIssues:0,
                avgIssueReviewTime:0,
                issueAcceptanceRate:0,
                issueRejectionRate:0,
            }
        }
        const { totalIssues , completedIssues , issueInReview , overdueIssues , 
            reopenedIssues , completionRate , overdueRate , activityRate} = getFilteredIssues(issues);
        const issuePriorityMap = new Map<string , number>();
        if(issues.length > 0){
            for(const issue of issues){
                issuePriorityMap.set(issue.priority , (issuePriorityMap.get(issue.priority) || 0) +1)
            }
        }
        const issueOverview = {
            totalIssuesofProject:totalIssuesofProject.length,
            totalAssignedIssues:totalIssues,
            completedIssues,
            issueInReview,
            overdueIssues,
            reopenedIssues,
        }
        const {approvedIssues , rejectedIssues , issueAcceptanceRate , 
        issueRejectionRate , avgIssueAcionTime} = getFilteredRequestIssues(issueRequests , totalIssuesofProject.length);
        teamLeadActivity = {
            approvedIssues,
            rejectedIssues,
            avgIssueAcionTime,
            issueAcceptanceRate:issueAcceptanceRate.toFixed(),
            issueRejectionRate:issueRejectionRate.toFixed()
        }
        const assignedissues = issues.map((issue)=>({
            name:issue.name,
            priority:issue.priority,
            status:issue.status,
            duedate:issue.duedate
        }))
        const issuePriorityCount: {priority:string , count:number}[]= [];
        if(issuePriorityMap.size){
            for(const [priority , count] of issuePriorityMap){ 
                issuePriorityCount.push({
                    priority,
                    count
                })
            }
        }
        const issuePriority = {
            activityRate,
            completionRate,
            overdueRate,
            prioritybased:issuePriorityCount
        }
        return NextResponse.json({
            success:true,
            status:200,
            data:{ issueOverview , teamLeadActivity , issuePriority , assignedissues},
            message:"TeamLead analytic dashboard data! "
        } , {status:200})
    } catch (err) {
        console.error("TeamLead analytic dashboard error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"TeamLead analytic dashboard error! "
        } , {status:500})
    }
}
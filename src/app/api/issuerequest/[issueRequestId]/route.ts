import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , {params}:{params:{issueRequestId:string}}){
    await dbConnect();
    try {
        const issueRequestId = params.issueRequestId;
        if(!issueRequestId){
            return NextResponse.json({
                status:400,
                message:"issueId is required!" 
            } , {status:400})
        }
        const issueRequest = await IssueRequest.findById(issueRequestId);
        if(!issueRequest){
            return NextResponse.json({
                status:404,
                message:"issues request not found! "
            } , {status:404})
        }
        const {issueId , requestedBy} = issueRequest;
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                status:404,
                message:"issues not found! "
            } , {status:404})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["TeamLead"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const {duedate , priority , description , name:issueName  , assignedTo} = issue;
        const issues = await Issue.find({assignedTo:requestedBy}).populate("assignedTo" , "name email");
        if(issues.length === 0){
            return NextResponse.json({
                status:200,
                message:"No issues assigned to this user! ",
                data:{
                    userData: {},
                    issueData: null,
                    userSummary:{
                        totalAssignedIssues: 0,
                        onWorkingIssues: 0,
                        completedIssues: 0,
                        completionRate: 0,
                        overdueIssues: 0
                    }
                },
            } , {status:200})
        }
        const {name , email } = issues[0].assignedTo as unknown as { name: string; email: string };
        const overdueStatus = ["Reopened" , "Open" , "Assigned"];
        const issueStatus = ["Assigned" , "Review"];
        const totalIssues = issues.length;
        const highProrityIssues = issues.filter((issue)=>(issue.priority === "High")).length;
        const completedIssues = issues.filter((issue)=>(issue.status === "Closed")).length;
        const onWorkingIssues = issues.filter((issue)=>(issueStatus.includes(issue.status))).length;
        const completionRate = Math.round((completedIssues / totalIssues) * 100);
        const overdueIssues = issues.filter((issue)=>(
            overdueStatus.includes(issue.status) && 
            new Date() > new Date(issue.duedate))).length;
        const userSummary = {
            onWorkingIssues,
            completedIssues,
            completionRate,
            overdueIssues,
            highProrityIssues,
            totalIssues
        }
        const issueData = {
            issueId,
            issueName,
            priority,
            duedate,
            description,
            assignedTo
        }
        const userData = {
            requestedBy,
            name,
            email
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issues are! ",
            data:{userData , issueData , userSummary}
        } , {status:200})
    } catch (err) {
        console.error("error from get requestedIssues!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"requestedIssues error! "
        } , {status:500})
    }
}
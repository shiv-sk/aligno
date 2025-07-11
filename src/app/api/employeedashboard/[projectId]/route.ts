import { getFilteredIssues, getFilteredRequestedIssues } from "@/helpers/getfiltereddata";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
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
        const authorizedUser = await authorizeRole(["Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const user = authorizedUser.user;
        const issues = await Issue.find({assignedTo:user._id});
        const issueRequests = await IssueRequest.find({requestedBy:user._id});
        const {
            totalIssues , completedIssues , onWorkingIssues , completionRate , lowPriorityIssues , 
            highPriorityIssues , mediumPriorityIssues , overdueIssues} = getFilteredIssues(issues);
        const {pendingRequestIssues , approvedRequestIssues , rejectedRequestIssues , 
            requestIssueRejectionRate , requestIssueAcceptanceRate} = getFilteredRequestedIssues(issueRequests);
        const insightBox = {
            totalIssues,
            completedIssues,
            onWorkingIssues,
            completionRate,
            overdueIssues,
            requestIssueRejectionRate,
            requestIssueAcceptanceRate
        }
        const pieChart = {
            lowPriorityIssues,
            highPriorityIssues,
            mediumPriorityIssues,
            pendingRequestIssues,
            approvedRequestIssues,
            rejectedRequestIssues
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"formated Issues are! ",
            data:{insightBox , pieChart}
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
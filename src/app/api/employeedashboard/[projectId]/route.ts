import { getFilteredIssues, getIssueRequestsData, getIssueReviewsData } from "@/helpers/getfiltereddata";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import IssueReview from "@/models/issueReview.model";
import { Types } from "mongoose";
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
        const authorizedUser = await authorizeRole(["Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const user = authorizedUser.user;
        const issues = await Issue.find({projectId});
        const issueRequests = await IssueRequest.find({requestedBy:user._id});
        const issueReviews = await IssueReview.find({requestedBy:user._id});
        if(issues.length === 0){
            return NextResponse.json({
                success:true,
                status:404,
                message:"Issues are not found!"
            } , {status:404})
        }
        const issueOverview = {
            totalAssignmentRequestedIssues:0,
            assignedIssues:0,
            completedIssues:0,
            totalReviewRequest:0,
            reviewAcceptedIssues:0,
            reopenedIssues:0,
        }
        const employeeActivity = {
            overdueRate:0,
            activityRate:0,
            completionRate:0,
        }
        const userIssues = issues.filter((issue)=>(issue.assignedTo === userId as unknown as Types.ObjectId));
        const barChart = {
            acceptedIssueRequests:0,
            rejectedIssueRequests:0,
            issueRequestAcceptRate:0,
            issueRequestRejectRate:0,
            acceptedIssueReviews:0, 
            rejectedIssueReviews:0,
            issueReviewAcceptRate:0,
            issueReviewRejectRate:0,
        }
        const { overdueRate, activityRate, completionRate, reopenedIssues, 
            completedIssues, assignedIssues } = getFilteredIssues(userIssues);

        const { acceptedIssueRequests, rejectedIssueRequests , totalIssueRequests,
            issueRequestAcceptRate, issueRequestRejectRate } = getIssueRequestsData(issueRequests);

        const { acceptedIssueReviews, rejectedIssueReviews, totalIssueReviews, 
            issueReviewAcceptRate, issueReviewRejectRate } = getIssueReviewsData(issueReviews);
        
        issueOverview.totalReviewRequest = totalIssueReviews;
        issueOverview.reviewAcceptedIssues = acceptedIssueReviews;
        issueOverview.totalAssignmentRequestedIssues = totalIssueRequests;
        issueOverview.assignedIssues = assignedIssues;
        issueOverview.reopenedIssues = reopenedIssues;
        issueOverview.completedIssues = completedIssues;

        employeeActivity.activityRate = activityRate; 
        employeeActivity.completionRate = completionRate;  
        employeeActivity.overdueRate = overdueRate;

        barChart.acceptedIssueRequests = acceptedIssueRequests; 
        barChart.rejectedIssueRequests = rejectedIssueRequests;  
        barChart.issueRequestAcceptRate = issueRequestAcceptRate;  
        barChart.issueRequestRejectRate = issueRequestRejectRate;  
        barChart.acceptedIssueReviews = acceptedIssueReviews;  
        barChart.rejectedIssueReviews = rejectedIssueReviews;  
        barChart.issueReviewAcceptRate = issueReviewAcceptRate;  
        barChart.issueReviewRejectRate = issueReviewRejectRate;  
        return NextResponse.json({
            success:true,
            status:200,
            message:"formated Issues are! ",
            data:{ employeeActivity, issueOverview, barChart }
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
import { getFilteredIssues, getIssueRequestsData, getIssueReviewsData } from "@/helpers/getfiltereddata";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import IssueReview from "@/models/issueReview.model";
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

        const issues = await Issue.find({projectId});
        const issueRequests = await IssueRequest.find({requestedBy:userId});
        const issueReviews = await IssueReview.find({requestedBy:userId});
        if(issues.length === 0){
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
            const issueRequestData = {
                acceptedIssueRequests:0,
                rejectedIssueRequests:0,
                issueRequestAcceptRate:0,
                issueRequestRejectRate:0,
            }
            const issueReviewData = {
                acceptedIssueReviews:0,
                rejectedIssueReviews:0,
                issueReviewAcceptRate:0,
                issueReviewRejectRate:0,
            }
            return NextResponse.json({
                success:true,
                status:200,
                data:{ issueOverview , employeeActivity , issueRequestData , issueReviewData },
                message:"Issues are not found!"
            } , {status:200})
        }
        
        const userIssues = issues.filter((issue)=>(issue && issue.assignedTo && issue.assignedTo.equals(userId)));
        let issueRequestData;
        if(issueRequests.length === 0){
            issueRequestData = {
                acceptedIssueRequests:0,
                rejectedIssueRequests:0,
                issueRequestAcceptRate:0,
                issueRequestRejectRate:0,
            }
        }
        let issueReviewData;
        if(issueReviews.length === 0){
            issueReviewData = {
                acceptedIssueReviews:0, 
                rejectedIssueReviews:0,
                issueReviewAcceptRate:0,
                issueReviewRejectRate:0,
            }
        }

        const { overdueRate , completionRate, reopenedIssues, 
            completedIssues, assignedIssues } = getFilteredIssues(userIssues);
        
        const totalIssues = issues.length;
        const issueStatus = ["Assigned" , "Review"];
        const onWorkingIssues = issues.filter((issue)=>(issueStatus.includes(issue.status))).length;
        const activityRate = totalIssues ? Math.round((onWorkingIssues / totalIssues) * 100) : 0;

        const { acceptedIssueRequests, rejectedIssueRequests , totalIssueRequests,
            issueRequestAcceptRate, issueRequestRejectRate } = getIssueRequestsData(issueRequests);

        const { acceptedIssueReviews, rejectedIssueReviews, totalIssueReviews, 
            issueReviewAcceptRate, issueReviewRejectRate } = getIssueReviewsData(issueReviews);
        
        const issueOverview = {
            totalIssueRequests,
            assignedIssues,
            completedIssues,
            totalIssueReviews,
            acceptedIssueReviews,
            reopenedIssues,
        }

        const employeeActivity = {
            activityRate,
            completionRate,
            overdueRate,
        }

        issueRequestData = {
            acceptedIssueRequests,
            rejectedIssueRequests,
            issueRequestAcceptRate,
            issueRequestRejectRate,
        }
        
        issueReviewData = {
            acceptedIssueReviews,
            rejectedIssueReviews,
            issueReviewAcceptRate,
            issueReviewRejectRate,
        }
   
        return NextResponse.json({
            success:true,
            status:200,
            message:"Employee Analytic Data! ",
            data:{ employeeActivity, issueOverview, issueRequestData , issueReviewData }
        } , {status:200})
    } catch (err) {
        console.error("Employee Analytic Data error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Employee Analytic Data error! "
        } , {status:500})
    }
}
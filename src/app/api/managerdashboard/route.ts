import Constants from "@/constents/constants";
import { getFilteredIssues, getFilteredReviewIssues } from "@/helpers/getfiltereddata";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
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
    
        const authorizeUser = await authorizeRole(["Manager"])(projectId.toString());
        if("status" in authorizeUser){
            return authorizeUser;
        }
        let managerAcitivity;
        const issues  = await Issue.find({projectId}).populate("assignedTo" , "name email"); 
        if(issues.length === 0){
            const issueOverview = {
            totalIssues:0,
            completedIssues:0,
            openIssues:0,
            issueInReview:0,
            overdueIssues:0,
            reopenedIssues:0,
            }
            const projectHealth = {
                completionRate:0,
                overdueRate:0,
                activityRate:0,
            }
            const actionableIssues = 0, 
            managerAcitivity = {
                approvedIssues:0,
                rejectedIssues:0,
                avgIssueReviewTime:0,
            }
            return NextResponse.json({
                success:true,
                status:200,
                data:{issueOverview , managerAcitivity , actionableIssues , projectHealth},
                message:"Issues are not found!"
            } , {status:200})
        }
        
        const issueReviews = await IssueReview.find({reviewedBy:userId}).populate("requestedBy" , "name email");
        if(issueReviews.length === 0){
            managerAcitivity = {
                approvedIssues:0,
                rejectedIssues:0,
                avgIssueReviewTime:0,
            }
        }
        const actionableIssues = issues.filter((issue)=>(issue.status !== Constants.Closed));
        const { totalIssues , completedIssues , issueInReview , overdueIssues , 
            reopenedIssues , completionRate , overdueRate , activityRate , openIssues} = getFilteredIssues(issues);
        const issueOverview = {
            totalIssues,
            completedIssues,
            openIssues,
            issueInReview,
            overdueIssues,
            reopenedIssues,
        }
        const projectHealth = {
            completionRate,
            overdueRate,
            activityRate,
        }
        const {approvedIssues , rejectedIssues , avgIssueReviewTime} = getFilteredReviewIssues(issueReviews);
        managerAcitivity = {
            approvedIssues,
            rejectedIssues,
            avgIssueReviewTime
        }
        return NextResponse.json({
            success:true,
            status:200,
            data:{ issueOverview , managerAcitivity , actionableIssues , projectHealth },
            message:"Manager analytic dashboard data! "
        } , {status:200})
    } catch (err) {
        console.error("Manager analytic dashboard error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Manager analytic dashboard error! "
        } , {status:500})
    }
}
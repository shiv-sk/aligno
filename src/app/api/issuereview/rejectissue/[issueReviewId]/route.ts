import Constants from "@/constents/constants";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueReview from "@/models/issueReview.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , {params}:{params:{issueReviewId:string}}){
    await dbConnect();
    try {
        const issueReviewId = params.issueReviewId;
        if(!issueReviewId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"TaskReviewRequestId is required!"
            } , {status:400})
        }
        const issueReviewRequest = await IssueReview.findById(issueReviewId);
        if(!issueReviewRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"TaskReviewRequest is not found! "
            } , {status:400})
        }
        const {issueId} = issueReviewRequest;
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue not found! "
            } , {status:404})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["Manager"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const reviewedBy = authorizedUser.user._id
        const updatedReviewRequest = await IssueReview.findByIdAndUpdate(issueReviewId , 
            {status:Constants.Rejected , reviewedBy , reviewedAt:new Date()} , {new:true});
        if(!updatedReviewRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"TaskReviewRequest is not updated or not found! "
            } , {status:400})
        }
        issue.status = Constants.Reopened;
        const updatedIssue = await issue.save();
        if(!updatedIssue){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Task is not updated or not found"
            } , {status:400})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Task review rejected successfully! ",
            data:{updatedIssue , updatedReviewRequest}
        } , {status:200})
    } catch (err) {
        console.error("error from IssueReviewRequest!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"IssueReviewRequest creation error! "
        } , {status:500})
    }
}

import Constants from "@/constents/constants";
import { sendClosureAcceptedEmail } from "@/helpers/closureacceptedemail";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueReview from "@/models/issueReview.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , {params}:{params:{issueReviewId:string}}){
    await dbConnect();
    try {
        const issueReviewId = params.issueReviewId;
        if(!issueReviewId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issueReviewId is required!"
            } , {status:400})
        }
        const issueReviewRequest = await IssueReview.findById(issueReviewId).populate("requestedBy" , "name email");
        if(!issueReviewRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"TaskReviewRequest is not found! "
            } , {status:400})
        }
        const {projectId , issueId} = issueReviewRequest;
        const authorizedUser = await authorizeRole(["Manager"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Task is not found! "
            } , {status:400})
        }
        const {name} = issue;
        const reviewedBy = authorizedUser.user._id;
        issueReviewRequest.status = Constants.Approved;
        issueReviewRequest.reviewedBy = reviewedBy as mongoose.Types.ObjectId;
        issueReviewRequest.reviewedAt = new Date();
        const updatedReviewRequest = await issueReviewRequest.save();
        if(!updatedReviewRequest){
            return NextResponse.json({
                success:false,
                status:500,
                message:"TaskReviewRequest is not updated or not found! "
            } , {status:500})
        }
        issue.status = Constants.Closed;
        issue.completedAt = new Date();
        const updatedIssue = await issue.save();
        // const updatedIssue = await Issue.findByIdAndUpdate(issueId , 
        //     {status:Constants.Closed , completedAt:new Date()} , {new:true});
        if(!updatedIssue){
            return NextResponse.json({
                success:false,
                status:500,
                message:"Task is not updated or not found"
            } , {status:500})
        }
        const taskName = name;
        const userName = issueReviewRequest.requestedBy.name;
        const userEmail = issueReviewRequest.requestedBy.email;
        if(userEmail && userName && taskName){
            await sendClosureAcceptedEmail(taskName , userName , userEmail);
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Task review accepted successfully! ",
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

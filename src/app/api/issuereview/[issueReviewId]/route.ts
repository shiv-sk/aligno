import Constants from "@/constents/constants";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueReview from "@/models/issueReview.model";
import IssueRequest from "@/models/issueRequest.model";
import { NextRequest, NextResponse } from "next/server";
import { Issue as IssueType } from "@/types/issue";
import IssueRequestType from "@/types/issuerequest";
import IssueReviewType from "@/types/issueReview";

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
        const issueReviewRequest = await IssueReview.findById(issueReviewId)
        .populate([{path:"reviewedBy" , select:"name"} , {path:"requestedBy" , select:"name"}]).lean<IssueReviewType>();
        if(!issueReviewRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"TaskReviewRequest is not found! "
            } , {status:400})
        }
        const {issueId , requestedBy , createdAt , reviewedAt , reviewedBy , comment , attachment} = issueReviewRequest;
        const issue = await Issue.findById(issueId)
        .populate([{path:"assignedTo" , select:"name"} , {path:"projectId" , select:"name"} , {path:"createdBy" , select:"name"}])
        .lean<IssueType>();
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue not found! "
            } , {status:404})
        }
        const {projectId , createdAt:issueCreatedAt , assignedTo , name , description , priority , createdBy , status:issueStatus} = issue;
        const authorizedUser = await authorizeRole(["Manager"])(projectId._id.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const issueRequest = await IssueRequest.findOne({issueId , requestedBy:requestedBy._id , status:Constants.Approved})
        .populate([{path:"actionTakenBy" , select:"name"} , {path:"requestedBy" , select:"name"}]).lean<IssueRequestType>();
        if(!issueRequest){
            return NextResponse.json({
                success:false,
                status:404,
                message:"IssueRequest not found! "
            } , {status:404})
        }
        const {requestedBy:issueAssignmentRequestBy , createdAt:issueRequestCreatedAt , actionTakenAt , actionTakenBy} = issueRequest;
        const issueData = {
            name,
            priority,
            description,
            issueStatus,
            projectName:projectId.name || null,
            assignedTo:assignedTo.name || null
        }
        const timeLine = {
            steps:[
                {
                    label:"Task Created",
                    timeStamp:issueCreatedAt,
                    by:{
                        name:createdBy.name || null,
                        role:"Manager",
                    }
                },
                {
                    label:"Task Assignment Request Sent",
                    timeStamp:issueRequestCreatedAt,
                    by:{
                        name:issueAssignmentRequestBy.name || null,
                        role:"Employee",
                    }
                },
                {
                    label:"Task Assignment Request Approved",
                    timeStamp:actionTakenAt,
                    by:{
                        name:actionTakenBy.name || null,
                        role:"TeamLead",
                    }
                },
                {
                    label:"Task Review Request Sent",
                    timeStamp:createdAt,
                    by:{
                        name:requestedBy.name || null,
                        role:"Employee",
                    }
                },
                {
                    label:"Task Reviewed",
                    timeStamp:reviewedAt,
                    by:{
                        name:reviewedBy.name || null,
                        role:"Manager",
                    }
                },
            ]
        }
        const reviewSummary = {
            comment,
            attachment
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Task review timeline fetched successfully!",
            data:{timeLine , reviewSummary , issueData}
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

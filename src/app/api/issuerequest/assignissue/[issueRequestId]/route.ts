import Constants from "@/constents/constants";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , {params}:{params:{issueRequestId:string}}){
    try {
        const issueRequestId = params.issueRequestId;
        if(!issueRequestId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"TaskRequestId is required!"
            } , {status:400})
        }
        const issueRequest = await IssueRequest.findById(issueRequestId);
        if(!issueRequest){
            return NextResponse.json({
                success:false,
                status:404,
                message:"TaskRequest is not found!"
            } , {status:404})
        }
        const {issueId} = issueRequest;
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Task is not found!"
            } , {status:404})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["TeamLead"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        if(issue.assignedTo){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Task is already assigned!"
            } , {status:400})
        }
        const actionTakenBy = authorizedUser.user?._id;
        if(!actionTakenBy){
            return NextResponse.json({
                success:false,
                status:400,
                message:"userId missing or not correct"
            } , {status:400})
        }
        const date = new Date();
        if(date > issue.duedate){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Task is already passed duedate!"
            } , {status:400})
        }
        const {requestedBy} = issueRequest;
        issueRequest.status = Constants.Approved;
        issueRequest.actionTakenBy = actionTakenBy as mongoose.Types.ObjectId;
        issueRequest.actionTakenAt = date;
        const updatedIssueRequest = await issueRequest.save();
        if(!updatedIssueRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issueRequest is not updated! "
            } , {status:400})
        }
        if(!requestedBy){
            return NextResponse.json({
                success:false,
                status:400,
                message: "Invalid requester for the issue."
            } , {status:400})
        }
        issue.status = Constants.Assigned;
        issue.assignedTo = requestedBy;
        issue.assignedBy = actionTakenBy as mongoose.Types.ObjectId;
        issue.assignedAt = date;
        const assignedIssue = await issue.save();
        if(!assignedIssue){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issue is not updated! "
            } , {status:400})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Task successfully assigned to user from approved request.",
            data:{assignedIssue , updatedIssueRequest},
        } , {status:200})
    } catch (err) {
        console.error("assign Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"issue assign error! "
        } , {status:500})
    }
}
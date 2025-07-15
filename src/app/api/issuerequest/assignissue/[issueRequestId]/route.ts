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
                message:"issueRequestId is required!"
            } , {status:400})
        }
        const issueRequest = await IssueRequest.findById(issueRequestId);
        if(!issueRequest){
            return NextResponse.json({
                success:false,
                status:404,
                message:"IssueRequest is not found!"
            } , {status:404})
        }
        const {issueId} = issueRequest;
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found!"
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
                message:"Issue is already assigned!"
            } , {status:400})
        }
        const assignedBy = authorizedUser.user._id;
        const isValidUserObjectId = mongoose.isValidObjectId(assignedBy);
        if(!assignedBy || !isValidUserObjectId){
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
                message:"task is already passed duedate!"
            } , {status:400})
        }
        const {requestedBy} = issueRequest;
        const actionTakenBy = authorizedUser.user._id;
        const updatedIssueRequest = await IssueRequest.findByIdAndUpdate(issueRequestId , 
            {status:Constants.Approved , actionTakenBy , actionTakenAt:new Date()} , 
            {new:true});
        if(!updatedIssueRequest){
            return NextResponse.json({
                success:false,
                status:500,
                message:"IssueRequest is not found or not updated!"
            } , {status:500})
        }
        const assignedIssue = await Issue.findByIdAndUpdate(issueId , 
            {status:"Assigned" , assignedTo:requestedBy , assignedBy , assignedAt:new Date()} , 
            {new:true});
        if(!assignedIssue){
            return NextResponse.json({
                success:false,
                status:500,
                message:"Issue is not found or not Assigned!"
            } , {status:500})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issue assigned successfully! ",
            data:{assignedIssue , updatedIssueRequest}
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
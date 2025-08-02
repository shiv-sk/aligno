import Constants from "@/constents/constants";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import { Types } from "mongoose";
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
        const actionTakenBy = authorizedUser.user._id
        if(!actionTakenBy){
            return NextResponse.json({
                success:false,
                status:400,
                message:"userId missing or not correct"
            } , {status:400})
        }
        issueRequest.status = Constants.Rejected
        issueRequest.actionTakenAt = new Date()
        issueRequest.actionTakenBy = actionTakenBy as Types.ObjectId
        const updatedIssueRequest = issueRequest.save();
        if(!updatedIssueRequest){
            return NextResponse.json({
                success:false,
                status:500,
                message:"IssueRequest is not found or not updated!"
            } , {status:500})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Task request has been rejected successfully.",
            updatedIssueRequest
        } , {status:200})
    } catch (err) {
        console.error("issueRequest reject error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"issueRequest reject error! "
        } , {status:500})
    }
}
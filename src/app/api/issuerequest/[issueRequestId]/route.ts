/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
interface IssueRequestType{
    projectId:mongoose.Types.ObjectId,
    issueId:mongoose.Types.ObjectId,
    _id:string,
    requestedBy: {
        name:string,
        email:string
    },
    status:string,
    actionTakenAt:Date,
    createdAt:Date,
    updatedAt:Date,
}

export async function GET(req: NextRequest , { params }: any){
    await dbConnect();
    try {
        const {issueRequestId} = params;
        if(!issueRequestId){
            return NextResponse.json({
                status:400,
                message:"issueId is required!" 
            } , {status:400})
        }
        const issueRequest = await IssueRequest.findById(issueRequestId).populate("requestedBy" , "name email")
        .lean<IssueRequestType>();
        if(!issueRequest){
            return NextResponse.json({
                status:404,
                message:"issues request not found! "
            } , {status:404})
        }
        const {issueId , requestedBy , projectId , status} = issueRequest;
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                status:404,
                message:"issues not found! "
            } , {status:404})
        }
        const authorizedUser = await authorizeRole(["TeamLead"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const {duedate , priority , description , name:issueName} = issue;
        const issues = await Issue.find({assignedTo:requestedBy});
        const overdueStatus = ["Reopened" , "Open" , "Assigned"];
        const issueStatus = ["Assigned" , "Review"];
        const totalIssues = issues.length > 0 ? issues.length : 0;
        const highProrityIssues = totalIssues > 0 ? issues.filter((issue)=>(issue.priority === "High")).length : 0;
        const completedIssues = totalIssues > 0 ? issues.filter((issue)=>(issue.status === "Closed")).length : 0;
        const onWorkingIssues = totalIssues > 0 ? issues.filter((issue)=>(issueStatus.includes(issue.status))).length : 0;
        const completionRate = totalIssues > 0 ? Math.round((completedIssues / totalIssues) * 100): 0;
        const overdueIssues = totalIssues > 0 ? issues.filter((issue)=>(
            overdueStatus.includes(issue.status) && 
            new Date() > new Date(issue.duedate))).length : 0;
        const userSummary = {
            onWorkingIssues,
            completedIssues,
            completionRate,
            overdueIssues,
            highProrityIssues,
            totalIssues
        }
        const issueData = {
            issueId,
            issueName,
            priority,
            duedate,
            description,
        }
        const userData = {
            requestedBy,
            name:issueRequest.requestedBy?.name,
            email:issueRequest.requestedBy?.email
        }
        const issueRequestData = {
            status
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issues are! ",
            data:{userData , issueData , userSummary , issueRequestData}
        } , {status:200})
    } catch (err) {
        console.error("error from get requestedIssues!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"requestedIssues error! "
        } , {status:500})
    }
}
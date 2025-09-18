/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , { params }: any){
    await dbConnect();
    try {
        const {issueId} = params;
        if(!issueId){
            return NextResponse.json({
                status:400,
                message:"issueId is required!"
            } , {status:400})
        }
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue not found! "
            } , {status:404})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["TeamLead"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const requestedIssues = await IssueRequest.find({issueId}).populate([
            {path:"requestedBy" , select:"name email"}, 
            {path:"issueId" , select:"name"}
        ]);
        if(requestedIssues.length === 0){
            return NextResponse.json({
                status:404,
                message:"requested issues not found! "
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issue Requests are! ",
            requestedIssues
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
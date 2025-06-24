import { authorizeRole } from "@/lib/middleware/authorizerole";
import { validateInput } from "@/lib/validate";
import Issue from "@/models/issue.model";
import assignIssueSchema from "@/schemas/assignIssue.schema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , {params}:{params:{issueId:string}}){
    try {
        const issueId = params.issueId;
        if(!issueId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issueId is required!"
            } , {status:400})
        }
        const validation = await validateInput(req , assignIssueSchema);
        if(!validation.success){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Invalid Input",
                errors:validation.errors
            } , {status:400})
        }
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found!"
            } , {status:400})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["TeamLead"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const assignedBy = authorizedUser.user._id;
        const isValidUserObjectId = mongoose.isValidObjectId(assignedBy);
        if(!assignedBy || !isValidUserObjectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectId is missing or not valid!"
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
        const {requestedBy} = validation.data;
        const assignedIssue = await Issue.findByIdAndUpdate(issueId , 
            {status:"Assigned" , assignedTo:requestedBy , assignedBy , assignedAt:new Date()} , 
            {new:true});
        if(!assignedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found or not Assigned!"
            } , {status:400})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"assigned Issue is! ",
            assignedIssue
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
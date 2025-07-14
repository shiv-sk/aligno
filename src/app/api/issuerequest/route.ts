import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import { validateInput } from "@/lib/validate";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import requestIssueSchema from "@/schemas/issueRequest.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();
    try {
        const validation = await validateInput(req , requestIssueSchema);
        if(!validation.success){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Invalid Input",
                errors:validation.errors
            } , {status:400})
        }
        const { issueId } = validation.data;
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue not found! "
            } , {status:404})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const requestedBy = authorizedUser.user._id;
        const existIssueRequest = await IssueRequest.findOne({$and:[{issueId} , {requestedBy}]});
        if(existIssueRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"You are already requested! "
            } , {status:400})
        }
        const newIssueRequest = await IssueRequest.create({
            requestedBy,
            issueId,
        })
        if(!newIssueRequest){
            return NextResponse.json({
                success:false,
                status:500,
                message:"Issue is not created! "
            } , {status:500})
        }
        return NextResponse.json({
            success:true,
            status:201,
            message:"issueReuest is created! ",
            newIssueRequest
        } , {status:201})
    } catch (err) {
        console.error("error from IssueRequest!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"IssueRequest creation error! "
        } , {status:500})
    }
}

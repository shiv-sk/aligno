import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import { validateInput } from "@/lib/validate";
import Issue from "@/models/issue.model";
import IssueRequest from "@/models/issueRequest.model";
import requestIssueSchema from "@/schemas/issueRequest.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request){
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
        const { description , issueId , requestedBy } = validation.data;
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
        const existIssueRequest = await IssueRequest.findOne({$and:[{issueId} , {requestedBy}]});
        if(existIssueRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Issue is already requested! "
            } , {status:400})
        }
        const newIssueRequest = await IssueRequest.create({
            description,
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

export async function GET(req: NextRequest , {params}:{params:{issueId:string}}){
    await dbConnect();
    try {
        const issueId = params.issueId;
        if(!issueId){
            return NextResponse.json({
                status:400,
                message:"issueId is required!"
            } , {status:400})
        }
        const requestedIssues = await IssueRequest.find({issueId});
        if(requestedIssues.length === 0){
            return NextResponse.json({
                status:404,
                message:"requested issues not found! "
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issues are! ",
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
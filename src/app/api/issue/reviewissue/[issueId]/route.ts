import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
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
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found!"
            } , {status:404})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const reviewIssue = await Issue.findByIdAndUpdate(issueId , {status:"Review"} , {new:true});
        if(!reviewIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found or not review!"
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"review Issue is! ",
            reviewIssue
        } , {status:200})
    } catch (err) {
        console.error("review Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"review Issue error! "
        } , {status:500})
    }
}
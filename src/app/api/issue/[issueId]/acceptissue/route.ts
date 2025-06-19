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
            } , {status:400})
        }
        const {projectId} = issue
        const authorizedUser = await authorizeRole(["Manager"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const AcceptedIssue = await Issue.findByIdAndUpdate(issueId , {status:"Closed"} , {new:true});
        if(!AcceptedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not Accepted!"
            } , {status:400})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Accepted Issue is! ",
            AcceptedIssue
        } , {status:200})
    } catch (err) {
        console.error("Accepted Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Accept Issue error! "
        } , {status:500})
    }
}
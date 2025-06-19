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
                message:"Issue is not found or not unAssigned!"
            } , {status:400})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["TeamLead"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const unAssignedIssue = await Issue.findByIdAndUpdate(issueId , {status:"Open" , assignedTo:null , assignedBy:null} , {new:true});
        if(!unAssignedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found or not unAssigned!"
            } , {status:400})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"unAssigned Issue is! ",
            unAssignedIssue
        } , {status:200})
    } catch (err) {
        console.error("unAssign Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"issue unAssign error! "
        } , {status:500})
    }
}
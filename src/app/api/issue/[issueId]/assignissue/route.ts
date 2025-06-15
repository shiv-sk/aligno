import { validateInput } from "@/lib/validate";
import Issue from "@/models/issue.model";
import assignIssueSchema from "@/schemas/assignIssue.schema";
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
        const {requestedBy , assignedBy} = validation.data;
        const assignedIssue = await Issue.findByIdAndUpdate(issueId , {status:"Assigned" , assignedTo:requestedBy , assignedBy} , {new:true});
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
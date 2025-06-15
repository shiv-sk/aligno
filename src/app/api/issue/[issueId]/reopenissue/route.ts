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
        const reopenedIssue = await Issue.findByIdAndUpdate(issueId , {status:"Reopened"} , {new:true});
        if(!reopenedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found or not reopened!"
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Reopened Issue is! ",
            reopenedIssue
        } , {status:200})
    } catch (err) {
        console.error("Reopened Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Reopened Issue error! "
        } , {status:500})
    }
}
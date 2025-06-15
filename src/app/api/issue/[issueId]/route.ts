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
            })
        }
        const {data} = await req.json();
        const updatedIssue = await Issue.findByIdAndUpdate(issueId , {...data} , {new:true});
        if(!updatedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found or not updated!"
            })
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"updated Issue is! ",
            updatedIssue
        })
    } catch (err) {
        console.error("update Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"issue error! "
        })
    }
}

export async function GET(req: NextRequest , {params}:{params:{issueId:string}}){
    try {
        const issueId = params.issueId;
        if(!issueId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issueId is required!"
            })
        }
        const issue = await Issue.findById(issueId).populate("createdBy" , "name email");
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"issue is not found!"
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issue is! ",
            issue
        } , {status:200})
    } catch (err) {
        console.error("get issue Error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"get issue error! "
        })
    }
}

export async function DELETE(req: NextRequest , {params}:{params:{issueId:string}}){
    try {
        const issueId = params.issueId;
        if(!issueId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issueId is required!"
            })
        }
        const deletedIssue = await Issue.findByIdAndDelete(issueId);
        if(!deletedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found or not deleted!"
            })
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"deleted Issue is! ",
            deletedIssue
        })
    } catch (err) {
        console.error("delete Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Issue delete error! "
        })
    }
}
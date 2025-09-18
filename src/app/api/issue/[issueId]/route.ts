/* eslint-disable @typescript-eslint/no-explicit-any */
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , { params }: any){
    try {
        const { issueId } = params;
        if(!issueId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issueId is required!"
            } , {status:400})
        }
        const {data} = await req.json();
        const updatedIssue = await Issue.findByIdAndUpdate(issueId , {...data} , {new:true});
        if(!updatedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found or not updated!"
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"updated Issue is! ",
            updatedIssue
        } , {status:200})
    } catch (err) {
        console.error("update Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"issue error! "
        } , {status:500})
    }
}

export async function GET(req: NextRequest , { params }: any){
    try {
        const { issueId } = params;
        if(!issueId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issueId is required!"
            } , {status:400})
        }
        const issue = await Issue.findById(issueId).populate(
            [
                {path:"assignedBy" , select:"name email"} , 
                {path:"createdBy" , select:"name email"} ,
                {path:"assignedTo" , select:"name email"} ,
                {path:"projectId" , select:"name"} ,
            ]);
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
        } , {status:500})
    }
}

export async function DELETE(req: NextRequest , { params }: any){
    try {
        const { issueId } = params;
        if(!issueId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"issueId is required!"
            } , {status:400})
        }
        const deletedIssue = await Issue.findByIdAndDelete(issueId);
        if(!deletedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue is not found or not deleted!"
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"deleted Issue is! ",
            deletedIssue
        } , {status:200})
    } catch (err) {
        console.error("delete Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Issue delete error! "
        } , {status:500})
    }
}
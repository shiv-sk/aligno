/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , { params }: any){
    await dbConnect();
    try {
        const {userId} = params;
        if(!userId){
            return NextResponse.json({
                success: false,
                status:400,
                message:"userId is required!"
            } , {status:400})
        }
        const issues = await Issue.find({assignedTo:userId});
        return NextResponse.json({
            success:true,
            status:200,
            message:issues.length === 0 ? "Tasks not assigned to you!" : "Issues retrieved successfully.",
            issues
        } , {status:200})
    } catch (err) {
        console.error("error from get Issues!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Error retrieving issues. "
        } , {status:500})
    }
}
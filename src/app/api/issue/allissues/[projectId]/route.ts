/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , { params }: any){
    await dbConnect();
    try {
        const { projectId } = params;
        if(!projectId){
            return NextResponse.json({
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const issues = await Issue.find({projectId});
        if(issues.length === 0){
            return NextResponse.json({
                status:200,
                message:"issues are not found for this project! "
            } , {status:200})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issues are! ",
            issues
        } , {status:200})
    } catch (err) {
        console.error("error from get Issues!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Issues error! "
        } , {status:500})
    }
}
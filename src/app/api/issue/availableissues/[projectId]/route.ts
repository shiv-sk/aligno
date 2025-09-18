/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , { params }: any){
    await dbConnect();
    try {
        const {projectId} = params;
        if(!projectId){
            return NextResponse.json({
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const authorizedUser = await authorizeRole(["Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const issues = await Issue.find({projectId , status:{$in:["Open"]}});
        return NextResponse.json({
            success:true,
            status:200,
            message:issues.length === 0 ? "No available issues for this project." : "Available issues are.",
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
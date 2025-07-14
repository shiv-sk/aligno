import dbConnect from "@/lib/connection.db";
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , {params}:{params:{userId:string}}){
    await dbConnect();
    try {
        const userId = params.userId;
        if(!userId){
            return NextResponse.json({
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const issues = await Issue.find({assignedTo:userId});
        return NextResponse.json({
            success:true,
            status:200,
            message:issues.length === 0 ? "Issues not assigned to user! " : "Issues are! ",
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
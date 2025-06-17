import dbConnect from "@/lib/connection.db";
import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;
    const projectId = searchParams.get("projectId");
    const userId = searchParams.get("userId");

    if(!projectId || !userId){
        return NextResponse.json({
            success:false,
            status:400,
            message: "Both projectId and userId are required.",
        } , {status:400})
    }

    try {
        const projectUser = await ProjectUser.findOne({projectId , userId});
        if(!projectUser){
            return NextResponse.json({
                success:false,
                status:404,
                message:"projectUser not found! "
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"projectUser role is! ",
            role:projectUser.role
        } , {status:200})
    } catch (err) {
        console.error("error from get projectUsers!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"projectUser error! "
        } , {status:500})
    }
}
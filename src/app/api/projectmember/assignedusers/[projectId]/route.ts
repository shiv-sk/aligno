import dbConnect from "@/lib/connection.db";
import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , {params}:{params:{projectId:string}}){
    await dbConnect();
    const projectId = params.projectId;
    try {
        const projectUsers = await ProjectUser.find({projectId}).populate("userId" , "name email");
        if(projectUsers.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"projectUsers not found! "
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"projectUsers are! ",
            projectUsers
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
import dbConnect from "@/lib/connection.db";
import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();
    try {
        const { projectId, userId , role } = await req.json();
        const existProjectUser = await ProjectUser.findOne({$and:[{projectId} , {userId}]});
        if(existProjectUser){
            return NextResponse.json({
                success:false,
                status:400,
                message:"user is already assigned! "
            } , {status:400})
        }
        const newProjectUser = await ProjectUser.create({
            projectId,
            userId,
            role,
        })
        if(!newProjectUser){
            return NextResponse.json({
                success:false,
                status:500,
                message:"projectUser is not created! "
            } , {status:500})
        }
        return NextResponse.json({
            success:true,
            status:201,
            message:"projectUser is created! ",
            newProjectUser
        } , {status:201})
    } catch (err) {
        console.error("error from projectUser!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"projectUser creation error! "
        } , {status:500})
    }
}

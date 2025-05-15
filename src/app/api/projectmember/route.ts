import dbConnect from "@/lib/connection.db";
import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request){
    await dbConnect();
    try {
        const { projectId, userId , role } = await req.json();
        const newProjectUser = await ProjectUser.create({
            projectId,
            userId,
            role,
        })
        if(!newProjectUser){
            return NextResponse.json({
                status:500,
                message:"projectUser is not created! "
            })
        }
        return NextResponse.json({
            status:201,
            message:"projectUser is created! ",
            newProjectUser
        })
    } catch (err) {
        console.error("error from projectUser!" , err);
        return NextResponse.json({
            status:500,
            message:"projectUser creation error! "
        })
    }
}

export async function GET(req: NextRequest , {params}:{params:{projectId:string}}){
    await dbConnect();
    const projectId = params.projectId;
    try {
        const projectUsers = await ProjectUser.find({projectId});
        if(projectUsers.length === 0){
            return NextResponse.json({
                status:404,
                message:"projectUsers not found! "
            })
        }
        return NextResponse.json({
            status:200,
            message:"projectUsers are! ",
            projectUsers
        })
    } catch (err) {
        console.error("error from get projectUsers!" , err);
        return NextResponse.json({
            status:500,
            message:"projectUser error! "
        })
    }
}
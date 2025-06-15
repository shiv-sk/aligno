import dbConnect from "@/lib/connection.db";
import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request){
    await dbConnect();
    try {
        const { projectId, userId , role } = await req.json();
        const existProjectUser = await ProjectUser.findOne({$and:[{projectId} , {userId}]});
        if(existProjectUser){
            return NextResponse.json({
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
                status:500,
                message:"projectUser is not created! "
            } , {status:500})
        }
        return NextResponse.json({
            status:201,
            message:"projectUser is created! ",
            newProjectUser
        } , {status:201})
    } catch (err) {
        console.error("error from projectUser!" , err);
        return NextResponse.json({
            status:500,
            message:"projectUser creation error! "
        } , {status:500})
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
            } , {status:404})
        }
        return NextResponse.json({
            status:200,
            message:"projectUsers are! ",
            projectUsers
        } , {status:200})
    } catch (err) {
        console.error("error from get projectUsers!" , err);
        return NextResponse.json({
            status:500,
            message:"projectUser error! "
        } , {status:500})
    }
}
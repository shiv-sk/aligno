import dbConnect from "@/lib/connection.db";
import ProjectUser from "@/models/projectMember.model";
import mongoose from "mongoose";
import Project from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , {params}:{params:{userId:string}}){
    console.log("registered models!" , mongoose.modelNames());
    await dbConnect();
    const userId = params.userId;
    if(!userId){
        return NextResponse.json({
            success:false,
            status:400,
            message:"userId is required!"
        } , {status:400})
    }
    try {
        const projects = await ProjectUser.find({userId}).populate("projectId" , "name description");
        if(projects.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"user assigned projects not found! "
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"projects are! ",
            projects
        } , {status:200})
    } catch (err) {
        console.error("error from get projects!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"projects error! "
        } , {status:500})
    }
}
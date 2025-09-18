/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import ProjectUser from "@/models/projectMember.model";
import Project from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , { params }: any){
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
        const userProjects = await ProjectUser.find({userId})
        if(userProjects.length === 0){
            return NextResponse.json({
                success:false,
                status:200,
                message:"projects are not assigned yet "
            } , {status:200})
        }
        const projectIds = userProjects.map((project)=>(project.projectId));
        const projects = await Project.find({_id:{$in:projectIds}} , "name description")
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
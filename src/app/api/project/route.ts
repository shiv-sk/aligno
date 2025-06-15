import dbConnect from "@/lib/connection.db";
import Project from "@/models/project.model";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    await dbConnect();
    try {
        const { name , description , createdBy } = await req.json();
        const newProject = await Project.create({
            name,
            description,
            createdBy,
        })
        if(!newProject){
            return NextResponse.json({
                success:false,
                status:500,
                message:"project is not created! "
            } , {status:500})
        }
        return NextResponse.json({
            success:true,
            status:201,
            message:"project is created! ",
            newProject
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

export async function GET(){
    await dbConnect();
    try {
        const projects = await Project.find();
        if(projects.length === 0){
            return NextResponse.json({
                status:404,
                message:"project not found! "
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"projects are! ",
            projects
        } , {status:200})
    } catch (err) {
        console.error("error from get projectUsers!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"projects error! "
        } , {status:500})
    }
}
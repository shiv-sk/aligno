import Project from "@/models/project.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , {params}:{params:{projectId:string}}){
    try {
        const projectId = params.projectId;
        if(!projectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectId is required!"
            })
        }
        const {data} = await req.json();
        const updatedProject = await Project.findByIdAndUpdate(projectId , {...data} , {new:true});
        if(!updatedProject){
            return NextResponse.json({
                success:false,
                status:404,
                message:"projectuser is not found or not updated!"
            })
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"updated projectuser is! ",
            updatedProject
        })
    } catch (err) {
        console.error("update projectUser error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"projectuser error! "
        })
    }
}

export async function GET(req: NextRequest , {params}:{params:{projectId:string}}){
    try {
        const projectId = params.projectId;
        if(!projectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const project = await Project.findById(projectId).populate("createdBy" , "name email");
        if(!project){
            return NextResponse.json({
                success:false,
                status:404,
                message:"project is not found!"
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"project is! ",
            project
        } , {status:200})
    } catch (err) {
        console.error("project Error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"project error! "
        })
    }
}

export async function DELETE(req: NextRequest , {params}:{params:{projectId:string}}){
    try {
        const projectId = params.projectId;
        if(!projectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectuserId is required!"
            })
        }
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if(!deletedProject){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Project is not found or not deleted!"
            })
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"deleted Project is! ",
            deletedProject
        })
    } catch (err) {
        console.error("delete project error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"project delete error! "
        })
    }
}
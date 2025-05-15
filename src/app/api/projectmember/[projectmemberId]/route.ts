import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , {params}:{params:{projectuserId:string}}){
    try {
        const projectuserId = params.projectuserId;
        if(!projectuserId){
            return NextResponse.json({
                status:400,
                message:"projectuserId is required!"
            })
        }
        const {data} = await req.json();
        const updatedProjectuser = await ProjectUser.findByIdAndUpdate(projectuserId , {...data} , {new:true});
        if(!updatedProjectuser){
            return NextResponse.json({
                status:404,
                message:"projectuser is not found or not updated!"
            })
        }
        return NextResponse.json({
            status:200,
            message:"updated projectuser is! ",
            updatedProjectuser
        })
    } catch (err) {
        console.error("update projectUser error!" , err);
        return NextResponse.json({
            status:500,
            message:"projectuser error! "
        })
    }
}

export async function DELETE(req: NextRequest , {params}:{params:{projectuserId:string}}){
    try {
        const projectuserId = params.projectuserId;
        if(!projectuserId){
            return NextResponse.json({
                status:400,
                message:"projectuserId is required!"
            })
        }
        const deletedProjectuser = await ProjectUser.findByIdAndDelete(projectuserId);
        if(!deletedProjectuser){
            return NextResponse.json({
                status:404,
                message:"Projectuser is not found or not deleted!"
            })
        }
        return NextResponse.json({
            status:200,
            message:"deleted Projectuser is! ",
            deletedProjectuser
        })
    } catch (err) {
        console.error("delete Company error!" , err);
        return NextResponse.json({
            status:500,
            message:"company error! "
        })
    }
}
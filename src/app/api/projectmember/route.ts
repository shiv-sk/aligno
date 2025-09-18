/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import { validateInput } from "@/lib/validate";
import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";
import projectMemberSchema from "@/schemas/addProjectMember.schema"

export async function POST(req: NextRequest){
    await dbConnect();
    try {
        const validation = await validateInput(req , projectMemberSchema);
        let userDocuments;
        if(validation.success){
            userDocuments = validation.data
        }
        const assignedUsers = await ProjectUser.insertMany(userDocuments , {ordered:false});
        if(assignedUsers.length === 0){
            return NextResponse.json({
            success:false,
            status:500,
            message:"projectUser creation error! "
            } , {status:500})
        }
        return NextResponse.json({
            success:true,
            status:201,
            message:"projectUser is created! ",
            userDocuments
        } , {status:201})
    } catch (err: any) {
        console.error("error from projectUser!" , err);
        if(err.code === 11000 || err?.writeErrors){
            const duplicates = err.writeErrors?.map((e: any)=>({
                index:e.index,
                keyValue:e.keyValue
            }))
            return NextResponse.json({
            success:false,
            status:409,
            duplicates,
            message:"Some projectUser entries were duplicates",
        } , {status:409})
        }
        return NextResponse.json({
            success:false,
            status:500,
            message:"projectUser creation error! "
        } , {status:500})
    }
}

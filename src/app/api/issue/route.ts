/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import { validateInput } from "@/lib/validate";
import Issue from "@/models/issue.model";
import newIssueSchema from "@/schemas/newIssue.schema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest){
    await dbConnect();
    try {
        const validation = await validateInput<z.infer<typeof newIssueSchema>>(req , newIssueSchema);
        if(!validation.success){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Invalid Input",
                errors:validation.errors
            } , {status:400})
        }
        const { name , description , duedate , projectId , priority } = validation.data;
        const authorizedUser = await authorizeRole(["Manager"])(projectId);
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const createdBy = authorizedUser.user._id;
        const isValidUserObjectId = mongoose.isValidObjectId(createdBy);
        if(!createdBy || !isValidUserObjectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectId is missing or not valid!"
            } , {status:400})
        }
        const existIssue = await Issue.findOne({$and:[{name} , {projectId}]});
        if(existIssue){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Issue is already exist! "
            } , {status:400})
        }
        const newIssue = await Issue.create({
            name,
            description,
            createdBy,
            duedate,
            projectId,
            priority
        })
        if(!newIssue){
            return NextResponse.json({
                success:false,
                status:500,
                message:"Issue is not created! "
            } , {status:500})
        }
        return NextResponse.json({
            success:true,
            status:201,
            message:"issue is created! ",
            newIssue
        } , {status:201})
    } catch (err: any) {
        return NextResponse.json({
            success:false,
            status:500,
            message:err.message
        } , {status:500})
    }
}

export async function GET(req: NextRequest , {params}:{params:{projectId:string}}){
    await dbConnect();
    try {
        const projectId = params.projectId;
        if(!projectId){
            return NextResponse.json({
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const issues = await Issue.find({projectId});
        if(issues.length === 0){
            return NextResponse.json({
                status:404,
                message:"issues not found! "
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issues are! ",
            issues
        } , {status:200})
    } catch (err) {
        console.error("error from get Issues!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Issues error! "
        } , {status:500})
    }
}
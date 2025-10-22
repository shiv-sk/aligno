/* eslint-disable @typescript-eslint/no-explicit-any */
import uploadToCloudinary from "@/helpers/uploadoncloudinary";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import { validateInput } from "@/lib/validate";
import Issue from "@/models/issue.model";
import newIssueSchema from "@/schemas/newIssue.schema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();
    try {
        const validation = await validateInput(req , newIssueSchema);
        if(!validation.success){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Invalid Input",
                errors:validation.errors
            } , {status:400})
        }

        const formData = validation.formData;
        const files = formData?.getAll("files") as File[];
        let uploadedUrls: string[] = [];
        if(files.length > 0){
            const cloudinaryUpload = await uploadToCloudinary(files);
            uploadedUrls = cloudinaryUpload.map((file: any)=>(file.secure_url))
        }
        const { name , description , duedate , projectId , priority , links } = validation.data;
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
            priority,
            links,
            files:uploadedUrls
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

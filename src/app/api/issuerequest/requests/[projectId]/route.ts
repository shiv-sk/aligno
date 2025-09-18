/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import IssueRequest from "@/models/issueRequest.model";
import issueRequest from "@/types/issuerequest";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , { params }: any){
    await dbConnect();
    const projectId = params.projectId;
    if(!projectId){
        return NextResponse.json({
            success:false,
            status:400,
            message:"projectId is required!"
        } , {status:400})
    }
    try {
        const issueRequests = await IssueRequest.find({projectId}).populate([
            {path:"requestedBy" , select:"name email"}, 
            {path:"issueId" , select:"name projectId priority"}
        ]).lean<issueRequest[]>();
        if(issueRequests.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"TaskRequests are not found! "
            } , {status:404})
        }
        if(!projectId){
            return NextResponse.json({
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const authorizedUser = await authorizeRole(["TeamLead"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Task Requests are! ",
            issueRequests
        } , {status:200})
    } catch (err) {
        console.error("error from get requestedTasks!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"requestedTasks error! "
        } , {status:500})
    }
}
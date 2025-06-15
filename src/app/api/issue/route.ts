import dbConnect from "@/lib/connection.db";
import { validateInput } from "@/lib/validate";
import Issue from "@/models/issue.model";
import newIssueSchema from "@/schemas/newIssue.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request){
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
        const { title , description , duedate , createdBy , projectId , priority } = validation.data;
        const existIssue = await Issue.findOne({$and:[{title} , {projectId}]});
        if(existIssue){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Issue is already exist! "
            } , {status:400})
        }
        const newIssue = await Issue.create({
            title,
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
    } catch (err) {
        console.error("error from Issue!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Issue creation error! "
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
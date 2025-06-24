import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";

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
        const authorizedUser = await authorizeRole(["Manager"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const issues = await Issue.find({projectId , status:"Review"});
        if(issues.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issues is not found!"
            } , {status:400})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"Issues are! ",
            issues
        } , {status:200})
    } catch (err) {
        console.error("Accepted Issue error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Accept Issue error! "
        } , {status:500})
    }
}
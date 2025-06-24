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
        const authorizedUser = await authorizeRole(["Manager" , "TeamLead" , "Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const issues = await Issue.find({projectId});
        if(issues.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issues is not found!"
            } , {status:400})
        }
        const getProgress = function (status: string){
            switch(status){
                case "Closed": return 100;
                case "Assigned": return 50;
                case "Open": return 0;
                default: return 10;
            }
        }
        const formattedIssueData = issues.map((issue)=>({
            id:issue._id.toString(),
            name:issue.name,
            start:new Date(issue.assignedAt ?? issue.createdAt),
            end:new Date(issue.completedAt ?? issue.duedate),
            type:"task",
            progress:getProgress(issue.status),
            isDisabled: false,
            dependencies: []
        }))
        return NextResponse.json({
            success:true,
            status:200,
            message:"formated Issues are! ",
            formattedIssueData
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
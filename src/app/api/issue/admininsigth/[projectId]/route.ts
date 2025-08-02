import { getFilteredIssues, getPriorityCount } from "@/helpers/getfiltereddata";
import dbConnect from "@/lib/connection.db";
import checkIsAdmin from "@/lib/middleware/checkisadmin";
import Issue from "@/models/issue.model";
import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';
export async function GET(req: NextRequest , {params}:{params:{projectId:string}}){
    await dbConnect();
    try {
        const projectId = params.projectId;
        if(!projectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const checkAdmin = await checkIsAdmin();
        if("status" in checkAdmin){
            return checkAdmin;
        }
        const projectMembers = await ProjectUser.find({projectId});
        if(projectMembers.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"projectMembers not found!"
            } , {status:404})
        }
        const issues = await Issue.find({projectId})
        if(issues.length === 0){
            const issueOverview = {
                assignedIssues:0,
                completedIssues:0,
                unAssignedIssues:0,
                reopenedIssues:0,
                totalIssues:0,
                overdueIssues:0,
            }
            const issueSummary = {
                completionRate:0,
                activityRate:0,
                overdueRate:0,
            }
            const projectInsights = {
                teamEfficiency:"no Data",
                projectHealth:"no Data"
            }
            const issuePriority = {
                prioritybased:0
            }
            return NextResponse.json({
                success:true,
                status:200,
                data:{issueSummary , projectInsights , issueOverview , issuePriority},
                message:"Issues not found!"
            } , {status:200})
        }
        const { totalIssues , completedIssues , assignedIssues , unAssignedIssues , overdueIssues ,
        reopenedIssues , completionRate , overdueRate , activityRate } = getFilteredIssues(issues);

        const totalProjectMembers = projectMembers.filter((projectMember)=>(projectMember.role === "Employee")).length;
        const perUserIssue = totalProjectMembers ? (totalIssues / totalProjectMembers) : 0;

        let projectHealth = "Balanced";
        let teamEfficiency = "Medium";
        if(perUserIssue >= 6 && completionRate < 40 && overdueRate > 20 && activityRate < 40){
            projectHealth = "Overloaded";
        }else if(perUserIssue < 2 && completionRate < 30 && overdueRate < 20 && activityRate < 40){
            projectHealth = "Underloaded";
        }else if(perUserIssue >= 4 && (completionRate < 30 || overdueRate > 20 || activityRate < 40)){
            projectHealth = "Needs Attention";
        }
        
        if(completionRate >= 80 && overdueIssues <= 1){
            teamEfficiency = "High";
        }else if(completionRate <= 40 && overdueRate >= 30){
            teamEfficiency = "Low";
        }

        const issuePriorityCount = getPriorityCount(issues);

        const issueOverview = {
            assignedIssues,
            completedIssues,
            unAssignedIssues,
            reopenedIssues,
            totalIssues,
            overdueIssues 
        }
        const issueSummary = {
            completionRate,
            activityRate,
            overdueRate
        }
        const projectInsights = {
            teamEfficiency,
            projectHealth,
            perUserIssue,
            completionRate,
            overdueRate
        }
        const issuePriority = {
            prioritybased:issuePriorityCount
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"admin issue summary! ",
            data:{issueSummary , projectInsights , issueOverview , issuePriority}
        } , {status:200})
    } catch (err) {
        console.error("AdminInsights error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"AdminInsights error! "
        } , {status:500})
    }
}
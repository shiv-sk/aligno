import Constants from "@/constents/constants";
import { sendIssueClosureRequestEmail } from "@/helpers/issueclosureemail";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueReview from "@/models/issueReview.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();
    try {
        const {issueId , comment} = await req.json();
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue not found! "
            } , {status:404})
        }
        const {projectId, name} = issue;
        if(!projectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectId is required! "
            } , {status:400})
        }
        console.log("the projectId is! " , projectId);
        const authorizedUser = await authorizeRole(["Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const {user} = authorizedUser;
        const existIssueReviewRequest = await IssueReview.findOne({$and:[
            {issueId} , {requestedBy:user._id} , {status:Constants.Pending}
        ]});
        if(existIssueReviewRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"You are already requested! "
            } , {status:400})
        }
        const newIssueReviewRequest = await IssueReview.create({
            requestedBy:user._id,
            issueId,
            comment,
            projectId
        })
        if(!newIssueReviewRequest){
            return NextResponse.json({
                success:false,
                status:500,
                message:"IssueReview is not created! "
            } , {status:500})
        }
        issue.status = Constants.Review;
        const updatedIssue = await issue.save();
        if(!updatedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue not found! "
            } , {status:404})
        }
        const userName = user.name;
        const userEmail = user.email;
        const taskName = name;
        if(userEmail && userName && taskName){
            await sendIssueClosureRequestEmail(taskName , userName , userEmail);
        }
        return NextResponse.json({
            success:true,
            status:201,
            message:"issueReviewReuest is created! ",
            data:{newIssueReviewRequest , updatedIssue}
        } , {status:201})
    } catch (err) {
        console.error("error from IssueReviewRequest!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"IssueReviewRequest creation error! "
        } , {status:500})
    }
}

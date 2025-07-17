import Constants from "@/constents/constants";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import Issue from "@/models/issue.model";
import IssueReview from "@/models/issueReview.model";
import issueRequest from "@/types/issuerequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();
    try {
        const {issueId , requestedBy , comment} = await req.json();
        const issue = await Issue.findById(issueId);
        if(!issue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue not found! "
            } , {status:404})
        }
        const {projectId} = issue;
        const authorizedUser = await authorizeRole(["Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const existIssueReviewRequest = await IssueReview.findOne({$and:[{issueId} , {requestedBy} , {status:Constants.Pending}]});
        if(existIssueReviewRequest){
            return NextResponse.json({
                success:false,
                status:400,
                message:"You are already requested! "
            } , {status:400})
        }
        const newIssueReviewRequest = await IssueReview.create({
            requestedBy,
            issueId,
            comment
        })
        if(!newIssueReviewRequest){
            return NextResponse.json({
                success:false,
                status:500,
                message:"IssueReview is not created! "
            } , {status:500})
        }
        const updatedIssue = await Issue.findByIdAndUpdate(issueId , {status:Constants.Review} , {new:true});
        if(!updatedIssue){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issue not found! "
            } , {status:404})
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

export async function GET(){
    await dbConnect();
    try {
        const issueReviewRequests = await IssueReview.find({status:Constants.Pending}).populate([
            {path:"requestedBy" , select:"name email"}, 
            {path:"issueId" , select:"name projectId description status priority"}
        ]).lean<issueRequest[]>();
        if(issueReviewRequests.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"issueReviewRequests are not found! "
            } , {status:404})
        }
        const {projectId} = issueReviewRequests[0]?.issueId;
        if(!projectId){
            return NextResponse.json({
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const authorizedUser = await authorizeRole(["Manager"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issue Requests are! ",
            issueReviewRequests
        } , {status:200})
    } catch (err) {
        console.error("error from get requestedIssues!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"requestedIssues error! "
        } , {status:500})
    }
}
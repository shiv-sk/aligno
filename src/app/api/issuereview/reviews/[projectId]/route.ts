import Constants from "@/constents/constants";
import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import IssueReview from "@/models/issueReview.model";
import { NextRequest, NextResponse } from "next/server";
import IssueReviewInterface from "@/types/issueReview";

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
        const issueReviewRequests = await IssueReview.find({status:Constants.Pending , projectId})
        .populate( "issueId" ,"name status priority duedate").lean<IssueReviewInterface[]>();
        if(issueReviewRequests.length === 0){
            return NextResponse.json({
                success:true,
                status:200,
                message:"issueReviewRequests are not found! "
            } , {status:200})
        }
        const authorizedUser = await authorizeRole(["Manager"])(projectId);
        if("status" in authorizedUser){
            return authorizedUser;
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"issue Reviews are! ",
            issueReviewRequests
        } , {status:200})
    } catch (err) {
        console.error("error from get requestedReviewIssues!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"requestedReviewIssues error! "
        } , {status:500})
    }
}
import { sendOverdueEmail } from "@/helpers/overdueemail";
import dbConnect from "@/lib/connection.db";
import Issue from "@/models/issue.model";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();
    try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1)
        const issues = await Issue.find({duedate:{$gte:today , $lt:tomorrow}}).populate("assignedTo" , "name , email");
        if(issues.length === 0){
           return NextResponse.json({
            success:false,
            status:404,
            message:"overdue issues are not found! "
            } , {status:404}) 
        }
        for(const issue of issues){
            const issueName = issue.name;
            const duedate = issue.duedate;
            const userName = issue?.assignedTo?.name;
            const userEmail = issue?.assignedTo?.email;
            if(issueName && duedate && userEmail && userName){
                await sendOverdueEmail(issueName , userName , userEmail , new Date(duedate).toDateString());
            }
        }
        return NextResponse.json({
            success:true,
            status:201,
            message:"projectUser is created! ",
        } , {status:201})
    } catch (err) {
        console.error("error from projectUser!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"projectUser creation error! "
        } , {status:500})
    }
}

import { sendProjectAssignmentEmail } from "@/helpers/projectassignemail";
import dbConnect from "@/lib/connection.db";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();
    try {
        const userEmail = "userMail@email.com";
        const userName = "userTwo";
        const projectName = "project1";
        const role = "role1"
        let emailResponse;
        if(userEmail && userName && projectName && role){
            emailResponse = await sendProjectAssignmentEmail(projectName , userName , userEmail , role)
            console.log("response from email sending.. " , emailResponse);
        }
        if(!emailResponse){
            return NextResponse.json({
            status:500,
            message:"sendmail error! "
            })
        }
        return NextResponse.json({
            status:201,
            message:"user is created! ",
            emailResponse
        })
    } catch (err) {
        console.error("error from send mail!" , err);
        return NextResponse.json({
            status:500,
            message:"sendmail error! "
        })
    }
}
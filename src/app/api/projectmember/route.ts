import dbConnect from "@/lib/connection.db";
import { validateInput } from "@/lib/validate";
import ProjectUser from "@/models/projectMember.model";
import { NextRequest, NextResponse } from "next/server";
import projectMemberSchema from "@/schemas/addProjectMember.schema"
import { sendProjectAssignmentEmail } from "@/helpers/projectassignemail";

export async function POST(req: NextRequest){
    await dbConnect();
    try {
        const validation = await validateInput(req , projectMemberSchema);
        let userDocuments;
        if(validation.success){
            userDocuments = validation.data
        }
        const assignedUsers = await ProjectUser.insertMany(userDocuments , {ordered:false});
        if(assignedUsers.length === 0){
            return NextResponse.json({
            success:false,
            status:500,
            message:"projectUser creation error! "
            } , {status:500})
        }
        const assignUsersData = await ProjectUser.find({_id:{$in: assignedUsers.map((doc)=>(doc._id))}})
        .populate([{path:"userId" , select:"name , email"} , {path:"projectId" , select:"name"}])
        .lean();
        for(const assignInfo of assignUsersData){
            const userEmail = assignInfo?.userId?.email;
            const userName = assignInfo?.userId?.name;
            const projectName = assignInfo?.projectId.name;
            const role = assignInfo?.role
            if(userEmail && userName && projectName && role){
                await sendProjectAssignmentEmail(projectName as string , userName as string , userEmail as string , role as string)
            }  
        }
        return NextResponse.json({
            success:true,
            status:201,
            message:"projectUser is created! ",
            userDocuments
        } , {status:201})
    } catch (err: any) {
        console.error("error from projectUser!" , err);
        if(err.code === 11000 || err?.writeErrors){
            const duplicates = err.writeErrors?.map((e)=>({
                index:e.index,
                keyValue:e.keyValue
            }))
            return NextResponse.json({
            success:false,
            status:409,
            duplicates,
            message:"Some projectUser entries were duplicates",
        } , {status:409})
        }
        return NextResponse.json({
            success:false,
            status:500,
            message:"projectUser creation error! "
        } , {status:500})
    }
}

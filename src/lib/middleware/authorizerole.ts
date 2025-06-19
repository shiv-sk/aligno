import { NextResponse } from "next/server";
import { getUserFromToken } from "../utils/getuser"
import ProjectUser from "@/models/projectMember.model";

export function authorizeRole(allowedRoles: string[]){
    return async function(projectId:string){
        const user = await getUserFromToken();
        if(!user){
            return NextResponse.json({
                success:false,
                status:401,
                message: "Unauthorized",
            }, {status:401})
        }
        if(!projectId){
            return NextResponse.json({
                success:false,
                status:400,
                message: "Missing projectId"
            } , {status:400})
        }
        const assigneduser = await ProjectUser.findOne({userId: user._id , projectId});
        if(!assigneduser || !allowedRoles.includes(assigneduser.role)){
            return NextResponse.json({
                success:false,
                status:403,
                message: "Forbidden: You do not have permission for this project."
            } , {status:403})
        }
        return {user , userRole:assigneduser.role}
    };
}
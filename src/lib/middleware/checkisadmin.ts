import { NextResponse } from "next/server";
import { getUserFromToken } from "../utils/getuser"

export default async function checkIsAdmin(){
    try {
        const user = await getUserFromToken();
        if(!user){
            return NextResponse.json({
                success:false,
                status:401,
                message: "Unauthorized",
            }, {status:401})
        }
        const isAdminUser = user.isAdmin;
        if(!isAdminUser){
            return NextResponse.json({
                success:false,
                status:403,
                message: "Forbidden: only admin."
            } , {status:403})
        }
        return user
    } catch (error) {
        return NextResponse.json({
            success:false,
            status:403,
            message: error || "Forbidden: Admins only.."
        } , {status:403})
    }
}
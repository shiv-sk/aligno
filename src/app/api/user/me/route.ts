/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/connection.db";
import { getUserFromToken } from "@/lib/utils/getuser";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();
    try {
        const user = await getUserFromToken();
        return NextResponse.json({
        success:true,
        status:200,
        messgae:"current logedin user! ",
        user
        } , {status:200})
    } catch (err: any) {
        console.error("error from fetching user!" , err);
        return NextResponse.json({
        success:false,
        status:401,
        messgae:err.message || "Unauthorized"
        } , {status:401})
    }
}
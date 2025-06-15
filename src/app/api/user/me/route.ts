/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/connection.db";
import User from "@/models/user.model";
import userLoginSchema from "@/schemas/userLogin.schema";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: Request){
    await dbConnect();
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        if(!token){
            return NextResponse.json({
                success:false,
                status:401,
                messgae:"Token is missing! "
            } , {status:401})
        }
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;
        const userId = decodedToken.id
        if(!userId){
            return NextResponse.json({
                success:false,
                status:401,
                messgae:"userId is missing or token is expired! "
            } , {status:401})
        }
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({
                success:false,
                status:404,
                messgae:"User is not exists! "
            } , {status:404})
        }
        const {password: _, ...foundUser} = user.toObject();
        return NextResponse.json({
            success:true,
            status:200,
            message:"current user is! ",
            foundUser
        } , {status:200})
    } catch (err) {
        console.error("error from current user!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"current user error! "
        } , {status:500})
    }
}
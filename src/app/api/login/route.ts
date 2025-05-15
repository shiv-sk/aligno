import dbConnect from "@/lib/connection.db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    await dbConnect();
    try {
        const {email , password} = await req.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                status:404,
                messgae:"User is not exists! "
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({
                status:400,
                message:"wrong password! "
            })
        }
        user.password = ""
        return NextResponse.json({
            status:201,
            message:"user is created! ",
            user
        })
    } catch (err) {
        console.error("error from register user!" , err);
        return NextResponse.json({
            status:500,
            message:"user login error! "
        })
    }
}
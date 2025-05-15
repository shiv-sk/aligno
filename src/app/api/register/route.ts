import dbConnect from "@/lib/connection.db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    await dbConnect();
    try {
        const {name , email , password , companyId} = await req.json();
        const existUser = await User.findOne({$and:[{companyId} , {email}]})
        if(existUser){
            return NextResponse.json({
                status:400,
                messgae:"User already exists! "
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            companyId
        })
        if(!user){
            return NextResponse.json({
                status:500,
                message:"user is not created! "
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
            message:"user register error! "
        })
    }
}
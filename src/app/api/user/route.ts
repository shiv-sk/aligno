/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/connection.db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    await dbConnect();
    try {
        const {name , email , password} = await req.json();
        const existUser = await User.findOne({email});
        if(existUser){
            return NextResponse.json({
                success:false,
                status:400,
                message:"user is already exists! "
            } , {status:400})
        }
        const hashPassword = await bcrypt.hash(password , 10);
        const user = await User.create({
            name,
            email,
            password:hashPassword,
        })
        if(!user){
            return NextResponse.json({
                success:false,
                status:500,
                message:"user is not created! "
            } , {status:500})
        }
        const {password:_ , ...newUser} = user
        return NextResponse.json({
            success:true,
            status:201,
            message:"user is created! ",
            newUser
        } , {status:201})
    } catch (err) {
        console.error("error from register user!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"company creation error! "
        } , {status:500})
    }
}

export async function GET(){
    await dbConnect();
    try {
        const users = await User.find({isAdmin:{$ne:true}}).select("-password");
        if(users.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"users not found! "
            } , {status:404})
        }
        return NextResponse.json({
            success:true,
            status:200,
            message:"users are! ",
            users
        } , {status:200})
    } catch (err) {
        console.error("error from get user!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"user error! "
        } , {status:500})
    }
}   
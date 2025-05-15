import dbConnect from "@/lib/connection.db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    await dbConnect();
    try {
        const {name , email , password , companyId} = await req.json();
        const existCompany = await User.findOne({$and:[{email} , {companyId}]});
        if(existCompany){
            return NextResponse.json({
                status:400,
                message:"user is already exists! "
            })
        }
        const hashPassword = await bcrypt.hash(password , 10);
        const user = await User.create({
            name,
            email,
            password:hashPassword,
            companyId
        })
        if(!user){
            return NextResponse.json({
                status:500,
                message:"user is not created! "
            })
        }
        return NextResponse.json({
            status:201,
            message:"user is created! ",
            user
        })
    } catch (err) {
        console.error("error from register user!" , err);
        return NextResponse.json({
            status:500,
            message:"company creation error! "
        })
    }
}

export async function GET(){
    await dbConnect();
    try {
        const users = await User.find();
        if(users.length === 0){
            return NextResponse.json({
                status:404,
                message:"users not found! "
            })
        }
        return NextResponse.json({
            status:200,
            message:"users are! ",
            users
        })
    } catch (err) {
        console.error("error from get user!" , err);
        return NextResponse.json({
            status:500,
            message:"user error! "
        })
    }
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/connection.db";
import User from "@/models/user.model";
import userLoginSchema from "@/schemas/userLogin.schema";
import {validateInput} from "@/lib/validate";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request){
    await dbConnect();
    try {
        const validation = await validateInput(req , userLoginSchema);
        if(!validation.success){
            return NextResponse.json({
                success:false,
                status:400,
                message:"Invalid Input",
                errors:validation.errors
            } , {status:400})
        }
        const {email , password} = validation.data;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                success:false,
                status:404,
                messgae:"User is not exists! "
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({
                success:false,
                status:400,
                message:"InCorrect password! "
            })
        }
        const {password: _, ...foundUser} = user.toObject();

        const token = jwt.sign({id:user._id , name:user.name} , process.env.JWT_SECRET as string, {expiresIn:"3d"});

        (await cookies()).set({
            name:"accessToken",
            value:token,
            httpOnly:true,
            secure:true,
            maxAge:60*60*24*3
        })

        return NextResponse.json({
            success:true,
            status:200,
            message:"loged user is! ",
            foundUser
        } , {status:200})
    } catch (err) {
        console.error("error from login user!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"user login error! "
        })
    }
}
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , {params}:{params:{userId:string}}){
    try {
        const userId = params.userId;
        if(!userId){
            return NextResponse.json({
                status:400,
                message:"userId is required!"
            })
        }
        const {data} = await req.json();
        if(data.password){
            const hashPassword = await bcrypt.hash(data.password , 10);
            data.password = hashPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(userId , {...data} , {new:true});
        if(!updatedUser){
            return NextResponse.json({
                status:404,
                message:"user is not found or not updated!"
            })
        }
        return NextResponse.json({
            status:200,
            message:"updated user is! ",
            updatedUser
        })
    } catch (err) {
        console.error("update User error!" , err);
        return NextResponse.json({
            status:500,
            message:"User error! "
        })
    }
}

export async function DELETE(req: NextRequest , {params}:{params:{userId:string}}){
    try {
        const userId = params.userId;
        if(!userId){
            return NextResponse.json({
                status:400,
                message:"userId is required!"
            })
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return NextResponse.json({
                status:404,
                message:"user is not found or not deleted!"
            })
        }
        return NextResponse.json({
            status:200,
            message:"updated user is! ",
            deletedUser
        })
    } catch (err) {
        console.error("delete User error!" , err);
        return NextResponse.json({
            status:500,
            message:"User error! "
        })
    }
}
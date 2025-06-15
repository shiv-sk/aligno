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
            } , {status:400})
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
            } , {status:404})
        }
        return NextResponse.json({
            status:200,
            message:"updated user is! ",
            updatedUser
        } , {status:200})
    } catch (err) {
        console.error("update User error!" , err);
        return NextResponse.json({
            status:500,
            message:"User error! "
        } , {status:500})
    }
}

export async function DELETE(req: NextRequest , {params}:{params:{userId:string}}){
    try {
        const userId = params.userId;
        if(!userId){
            return NextResponse.json({
                status:400,
                message:"userId is required!"
            } , {status:400})
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return NextResponse.json({
                status:404,
                message:"user is not found or not deleted!"
            } , {status:404})
        }
        return NextResponse.json({
            status:200,
            message:"updated user is! ",
            deletedUser
        } , {status:200})
    } catch (err) {
        console.error("delete User error!" , err);
        return NextResponse.json({
            status:500,
            message:"User error! "
        } , {status:500})
    }
}
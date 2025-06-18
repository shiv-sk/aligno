import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
export async function GET(){
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        if(!accessToken){
            return NextResponse.json({
                status:403,
                success:false,
                message:"token is not found! "
            } , {status:403})
        }
        const response = NextResponse.json({
            status:200,
            success:true,
            messsage:"user loged out successfully! "
        } , {status:200})
        response.cookies.set({
            name:"accessToken",
            value:"",
            maxAge:0,
        })
        return response;
    } catch (err) {
        console.log("error from user logout! " , err);
        return NextResponse.json({
            status:500,
            success:false,
            message:"logout user error! "
        } , {status:500})
    }
}
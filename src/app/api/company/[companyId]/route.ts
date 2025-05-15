import Company from "@/models/company.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest , {params}:{params:{companyId:string}}){
    try {
        const companyId = params.companyId;
        if(!companyId){
            return NextResponse.json({
                status:400,
                message:"companyId is required!"
            })
        }
        const {data} = await req.json();
        const updatedCompany = await Company.findByIdAndUpdate(companyId , {...data} , {new:true});
        if(!updatedCompany){
            return NextResponse.json({
                status:404,
                message:"company is not found or not updated!"
            })
        }
        return NextResponse.json({
            status:200,
            message:"updated company is! ",
            updatedCompany
        })
    } catch (err) {
        console.error("update Company error!" , err);
        return NextResponse.json({
            status:500,
            message:"company error! "
        })
    }
}

export async function DELETE(req: NextRequest , {params}:{params:{companyId:string}}){
    try {
        const companyId = params.companyId;
        if(!companyId){
            return NextResponse.json({
                status:400,
                message:"companyId is required!"
            })
        }
        const deletedCompany = await Company.findByIdAndDelete(companyId);
        if(!deletedCompany){
            return NextResponse.json({
                status:404,
                message:"company is not found or not deleted!"
            })
        }
        return NextResponse.json({
            status:200,
            message:"updated company is! ",
            deletedCompany
        })
    } catch (err) {
        console.error("delete Company error!" , err);
        return NextResponse.json({
            status:500,
            message:"company error! "
        })
    }
}
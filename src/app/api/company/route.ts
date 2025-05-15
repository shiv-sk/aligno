import dbConnect from "@/lib/connection.db";
import Company from "@/models/company.model";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    await dbConnect();
    try {
        const {name , description} = await req.json();
        const existCompany = await Company.findOne({name});
        if(existCompany){
            return NextResponse.json({
                status:400,
                message:"Company name is taken! "
            })
        }
        const company = await Company.create({
            name,
            description,
        })
        if(!company){
            return NextResponse.json({
                status:500,
                message:"Company is not created! "
            })
        }
        return NextResponse.json({
            status:201,
            message:"company is created! ",
            company
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
        const companies = await Company.find();
        if(companies.length === 0){
            return NextResponse.json({
                status:404,
                message:"Companies not found! "
            })
        }
        return NextResponse.json({
            status:200,
            message:"companies are! ",
            companies
        })
    } catch (err) {
        console.error("error from register user!" , err);
        return NextResponse.json({
            status:500,
            message:"company creation error! "
        })
    }
}
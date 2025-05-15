import mongoose, { Document, Schema } from "mongoose";

interface CompanyModel extends Document{
    name: string,
    description: string,
}

const companySchema:Schema<CompanyModel> = new Schema({
    name:{
        type:String,
        required:[true , "Company name is required! "],
        trim:true,
        unique:true
    },
    description:{
        type:String,
        required:[true , "Company description is required! "],
        trim:true,
    }
} , {timestamps:true});

const Company = (mongoose.models.Company as mongoose.Model<CompanyModel>)|| mongoose.model<CompanyModel>("Company" , companySchema);
export default Company;
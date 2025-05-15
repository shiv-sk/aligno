import mongoose, { Document, Schema } from "mongoose";

interface ProjectModel extends Document{
    name: string,
    description: string,
    companyId: mongoose.Types.ObjectId,
    createdBy: mongoose.Types.ObjectId,
}

const projectSchema:Schema<ProjectModel> = new Schema({
    name:{
        type:String,
        required:[true , "Name is required! "],
    },
    description:{
        type:String,
        required:[true , "Description is required! "],
    },
    companyId:{
        type:Schema.Types.ObjectId,
        ref:"Company",
        required:[true , "CompanyId is required! "],
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true , "UserId is required! "],
    }
} , {timestamps:true});

const Project = (mongoose.models.Project as mongoose.Model<ProjectModel>) 
|| mongoose.model<ProjectModel>("Project" , projectSchema);

export default Project;
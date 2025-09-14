import mongoose, { Document, Schema } from "mongoose";

interface ProjectUserModel extends Document{
    projectId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    role: string,
}

const projectUserSchema:Schema<ProjectUserModel> = new Schema({
    projectId:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:[true , "ProjectId is required! "],
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true , "UserId is required! "],
    },
    role:{
        type:String,
        enum:["Manager" , "TeamLead" , "Employee"],
        default:"Employee"
    },
} , {timestamps:true});

projectUserSchema.index({ projectId: 1, userId: 1 }, { unique: true });
const ProjectUser = (mongoose.models.ProjectUser as mongoose.Model<ProjectUserModel>) 
|| mongoose.model<ProjectUserModel>("ProjectUser" , projectUserSchema);
export default ProjectUser;
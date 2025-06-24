import mongoose, { Document, Schema } from "mongoose";

interface IssueModel extends Document{
    _id:string,
    name: string,
    description: string,
    projectId: mongoose.Types.ObjectId,
    createdBy: mongoose.Types.ObjectId,
    assignedBy: mongoose.Types.ObjectId,
    assignedTo: mongoose.Types.ObjectId,
    status:string,
    priority:string,
    duedate:Date,
    completedAt:Date,
    assignedAt:Date,
    createdAt:Date,
    updatedAt:Date
}

const IssueSchema:Schema<IssueModel> = new Schema({
    name:{
        type:String,
        required:[true , "Issue name is required! "],
    },
    description:{
        type:String,
        required:[true , "Issue Description is required! "],
    },
    projectId:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:[true , "ProjectId is required! "],
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true , "UserId is required! "],
    },
    assignedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    status:{
        type:String,
        enum:["Open" , "Assigned" , "Review" , "Reopened" , "Closed"],
        default:"Open"
    },
    priority:{
        type:String,
        enum:["Low" , "Medium" , "High"],
        default:"Low"
    },
    duedate:{
        type:Date,
        required:[true , "Duedate is required! "]
    },
    completedAt:{
        type:Date,
        default:null
    },
    assignedAt:{
        type:Date,
        default:null
    },
} , {timestamps:true});

const Issue = (mongoose.models.Issue as mongoose.Model<IssueModel>) 
|| mongoose.model<IssueModel>("Issue" , IssueSchema);

export default Issue;
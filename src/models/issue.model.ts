import mongoose, { Document, Schema } from "mongoose";

interface IssueModel extends Document{
    title: string,
    description: string,
    projectId: mongoose.Types.ObjectId,
    createdBy: mongoose.Types.ObjectId,
    assignedBy: mongoose.Types.ObjectId,
    assignedTo: mongoose.Types.ObjectId,
    status:string,
    priority:string,
    duedate:Date,
}

const IssueSchema:Schema<IssueModel> = new Schema({
    title:{
        type:String,
        required:[true , "Issue title is required! "],
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
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:"User",
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
    }
} , {timestamps:true});

const Issue = (mongoose.models.Issue as mongoose.Model<IssueModel>) 
|| mongoose.model<IssueModel>("Issue" , IssueSchema);

export default Issue;
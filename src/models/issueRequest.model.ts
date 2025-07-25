import mongoose, { Document, Schema } from "mongoose";

interface IssueRequestModel extends Document{
    issueId: mongoose.Types.ObjectId,
    requestedBy: mongoose.Types.ObjectId,
    actionTakenBy: mongoose.Types.ObjectId,
    status:string,
    actionTakenAt:Date,
    createdAt:Date,
    updatedAt:Date,
}

const IssueRequestSchema:Schema<IssueRequestModel> = new Schema({
    issueId:{
        type:Schema.Types.ObjectId,
        ref:"Issue",
        required:[true , "ProjectId is required! "],
    },
    requestedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true , "UserId is required! "],
    },
    actionTakenBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },
    actionTakenAt:{
        type:Date,
        default:null,
    },
    status:{
        type:String,
        enum:["Pending" , "Approved" , "Rejected"],
        default:"Pending"
    },
} , {timestamps:true});

const IssueRequest = (mongoose.models.IssueRequest as mongoose.Model<IssueRequestModel>) 
|| mongoose.model<IssueRequestModel>("IssueRequest" , IssueRequestSchema);

export default IssueRequest;
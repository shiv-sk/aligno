import mongoose, { Document, Schema } from "mongoose";

interface IssueReviewModel extends Document{
    issueId: mongoose.Types.ObjectId,
    requestedBy: mongoose.Types.ObjectId,
    reviewedBy: mongoose.Types.ObjectId,
    status:string,
    reviewedAt:Date,
    attachment:string,
    comment:string,
    createdAt:Date,
    updatedAt:Date,
}

const IssueReviewSchema:Schema<IssueReviewModel> = new Schema({
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
    reviewedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },
    reviewedAt:{
        type:Date,
        default:null,
    },
    comment:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    attachment:{
        type:String,
        default:null
    },
    status:{
        type:String,
        enum:["Pending" , "Approved" , "Rejected"],
        default:"Pending"
    },
} , {timestamps:true});

const IssueReview = (mongoose.models.IssueReview as mongoose.Model<IssueReviewModel>) 
|| mongoose.model<IssueReviewModel>("IssueReview" , IssueReviewSchema);

export default IssueReview;
import mongoose, { Document, Schema } from "mongoose";

interface UserModel extends Document{
    name: string,
    email: string,
    password: string,
    isAdmin:boolean,
    isSuperAdmin:boolean,
    companyId:mongoose.Types.ObjectId,
}

const userSchema:Schema<UserModel> = new Schema({
    name:{
        type:String,
        required:[true , "Name is required! "],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true , "Email is required! "],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true , "Password is required! "],
        trim:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isSuperAdmin:{
        type:Boolean,
        default:false
    },
    companyId:{
        type:Schema.Types.ObjectId,
        ref:"Company",
        required:true
    }
} , {timestamps:true});

const User = (mongoose.models.User as mongoose.Model<UserModel>)|| mongoose.model<UserModel>("User" , userSchema);
export default User;
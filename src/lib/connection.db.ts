import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number;
}

const connection :connectionObject = {};

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log('Already connected to the database');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string, {});
        connection.isConnected = db.connections[0].readyState;
        const existingSuperAdmin = await User.findOne({isAdmin:true});
        const hashPassword = await bcrypt.hash("admin123" , 10);
        if(!existingSuperAdmin){
            await User.create({
                name:"admin",
                email:"admin@email.com",
                password:hashPassword,
                isAdmin:true,
            })
        }
        console.log("Admin is already exist! " ); 
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

export default dbConnect;
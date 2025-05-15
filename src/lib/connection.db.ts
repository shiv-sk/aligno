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
        console.log("db connection is! " , db);
        console.log("db connection array is! " , db.connections);
        connection.isConnected = db.connections[0].readyState;
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

export default dbConnect;
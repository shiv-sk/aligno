import mongoose from "mongoose";
import { z } from "zod";
const objectIdSchema = z.string().refine((value)=>{
    return mongoose.Types.ObjectId.isValid(value);
} , "inValid objectId")
export default objectIdSchema;
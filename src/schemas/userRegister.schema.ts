import { z } from "zod";
import objectIdSchema from "./objectId.schema";
const userRegisterSchema = z.object({
    name:z.string().trim().min(3).max(250),
    email:z.string().email().trim(),
    password:z.string().min(3).max(20).trim(),
    isAdmin:z.boolean().optional(),
    companyId:objectIdSchema
});
export default userRegisterSchema;
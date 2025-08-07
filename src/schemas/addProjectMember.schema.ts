import { z } from "zod";
import objectIdSchema from "./objectId.schema";
const addProjectMemberSchema = z.object({
    projectId:objectIdSchema,
    userId:objectIdSchema,
    role:z.enum(["Manager" , "TeamLead" , "Employee"]),
});
const userAssignSchema = z.array(addProjectMemberSchema);
export default userAssignSchema;

import { z } from "zod/v4";
import objectIdSchema from "./objectId.schema";
const addProjectMemberSchema = z.object({
    projectId:objectIdSchema,
    userId:objectIdSchema,
    role:z.enum(["Manager" , "TeamLead" , "Employee"]),
});
export default addProjectMemberSchema;
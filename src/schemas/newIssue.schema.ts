import { z } from "zod";
import objectIdSchema from "./objectId.schema";
const newIssueSchema = z.object({
    name:z.string().min(3).max(150).trim(),
    description:z.string().min(3).max(300).trim(),
    projectId:objectIdSchema,
    priority:z.enum(["Low" , "Medium" , "High"]),
    duedate:z.coerce.date().refine((date)=>(new Date(date) > new Date()) , {message: "Due date must be in the future"}),
});
export default newIssueSchema;

//title , description , duedate , createdBy , projectId , priority
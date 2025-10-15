import { z } from "zod";
import objectIdSchema from "./objectId.schema";
import { allowedDomains } from "@/constents/domainconstants";
const newIssueSchema = z.object({
    name:z.string().min(3).max(150).trim(),
    description:z.string().min(3).max(300).trim(),
    projectId:objectIdSchema,
    priority:z.enum(["Low" , "Medium" , "High"]),
    duedate:z.coerce.date().refine((date)=>(new Date(date) > new Date()) , {message: "Due date must be in the future"}),
    links:z.array(z.string().url().trim().refine((link)=>{
        const hostname = new URL(link).hostname;
        return allowedDomains.some((domain)=>hostname.includes(domain))
    } , {
        message:"Only Google Drive, Docs, Sheets, Slides, Gitlab, Figma, Notion, GitHub,  links are allowed!"
    })).optional()
});
export default newIssueSchema;

//title , description , duedate , createdBy , projectId , priority
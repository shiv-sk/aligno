/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import objectIdSchema from "./objectId.schema";
import { allowedDomains } from "@/constents/domainconstants";
const newIssueSchema = z.object({
    name:z.string().min(3).max(150).trim(),
    description:z.string().min(3).max(300).trim(),
    projectId:objectIdSchema,
    priority:z.enum(["Low" , "Medium" , "High"]),
    duedate:z.coerce.date().refine((date)=>(new Date(date) > new Date()) , {message: "Due date must be in the future"}),
    links:z.union([z.string(), z.array(z.string())]).optional().transform((val)=>{
        if(!val) return [];
        if(typeof val === "string"){
            try {
                const parsed = JSON.parse(val);
                if (Array.isArray(parsed)) return parsed;
                return [val];
            } catch (error) {
                return val.split(",").map((v) => v.trim());
            }
        }
        return val;
    }).refine((links)=>{
        return links.every((link)=>{
            try {
                const hostname = new URL(link).hostname;
                return allowedDomains.some((domain)=>hostname.includes(domain))
            } catch (error) {
                return false;
            }
        })
    } , {
        message:"Only Google Drive, Docs, Sheets, Slides, Gitlab, Figma, Notion, GitHub links are allowed!"
    }),
});
export default newIssueSchema;

//title , description , duedate , createdBy , projectId , priority
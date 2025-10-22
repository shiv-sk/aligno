/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodTypeAny , infer as zInfer } from "zod";

export async function validateInput<S extends ZodTypeAny>(req:Request , schema:ZodTypeAny):
Promise<{success:true; data:zInfer<S>; formData?: FormData }| {success:false; errors:any }>{
    const contentType = req.headers.get("content-type") || "";
    try {
        let parsedBody: Record<string , any> = {}
        let formData: FormData | undefined;
        if(contentType.includes("multipart/form-data")){
            formData = await req.formData();
            formData.forEach((value , key)=>{
                if(parsedBody[key]){
                    parsedBody[key] = Array.isArray(parsedBody[key]) ? 
                    [...parsedBody[key], value] : [parsedBody[key], value];
                }else{
                    parsedBody[key] = value;
                }
            })
        }else{
            parsedBody = await req.json();
        } 
        const parsed = schema.safeParse(parsedBody);
        if(!parsed.success){
            return{
                success:false,
                errors:parsed.error.flatten().fieldErrors
            }
        }
        return{
            success:true,
            data:parsed.data,
            formData
        }
    } catch (error) {
        return{
            success:false,
            errors:error
        }
    }
}
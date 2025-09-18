/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodTypeAny , infer as zInfer } from "zod";

export async function validateInput<S extends ZodTypeAny>(req:Request , schema:ZodTypeAny):
Promise<{success:true; data:zInfer<S> }| {success:false; errors:any }>{
    try {
        const body = await req.json();
        const parsed = schema.safeParse(body);
        if(!parsed.success){
            return{
                success:false,
                errors:parsed.error.flatten().fieldErrors
            }
        }
        return{
            success:true,
            data:parsed.data
        }
    } catch (error) {
        return{
            success:false,
            errors:error
        }
    }
}
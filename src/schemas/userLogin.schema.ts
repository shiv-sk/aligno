import { z } from "zod";
const userLoginSchema = z.object({
    email:z.string().email().trim(),
    password:z.string().min(3).max(20).trim(),
});
export default userLoginSchema;
import { z } from "zod";
const addCompanySchema = z.object({
    name:z.string().min(3).max(150).trim(),
    description:z.string().min(3).max(300).trim(),
});
export default addCompanySchema;
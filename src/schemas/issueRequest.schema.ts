import { z } from "zod";
import objectIdSchema from "./objectId.schema";
const requestIssueSchema = z.object({
    issueId:objectIdSchema,
    requestedBy:objectIdSchema,
    description:z.string().min(3).max(300).trim(),
});
export default requestIssueSchema;

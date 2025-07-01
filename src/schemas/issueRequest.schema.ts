import { z } from "zod";
import objectIdSchema from "./objectId.schema";
const requestIssueSchema = z.object({
    issueId:objectIdSchema,
    requestedBy:objectIdSchema,
});
export default requestIssueSchema;

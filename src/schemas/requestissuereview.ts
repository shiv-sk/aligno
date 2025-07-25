import { z } from "zod/v4";
import objectIdSchema from "./objectId.schema";
const requestIssueReviewSchema = z.object({
    issueId:objectIdSchema,
    requestedBy:objectIdSchema,
    comment:z.string().min(3).max(1000).trim(),
});
export default requestIssueReviewSchema;
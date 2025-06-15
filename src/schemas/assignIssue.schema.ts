import { z } from "zod";
import objectIdSchema from "./objectId.schema";
const assignIssueSchema = z.object({
    requestedBy:objectIdSchema,
    assignedBy:objectIdSchema,
});
export default assignIssueSchema;
import { z } from "zod";
import objectIdSchema from "./objectId.schema";
const assignIssueSchema = z.object({
    requestedBy:objectIdSchema,
});
export default assignIssueSchema;
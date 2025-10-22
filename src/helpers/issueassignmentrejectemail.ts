import { Resend } from 'resend';
import IssueAssignmentRejectEmailTemplate from '../../email/issueassignmentreject';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendIssueAssignmentRejectedEmail(taskName: string , userName: string , userMail: string){
    try {
        const { data, error } = await resend.emails.send({
            from: 'Aligno <onboarding@aligno.live>',
            to: userMail,
            subject: 'Task Assignment Request',
            react:IssueAssignmentRejectEmailTemplate({taskName , userName}),
        })
        if(error){
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
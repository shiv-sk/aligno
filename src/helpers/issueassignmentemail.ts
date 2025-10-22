import { Resend } from 'resend';
import IssueAssignEmailTemplate from '../../email/issueassignment';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendIssueAssignmentEmail(taskName: string , userName: string , userMail: string , duedate:string){
    try {
        const { data, error } = await resend.emails.send({
            from: 'Aligno <onboarding@aligno.live>',
            to: userMail,
            subject: 'Task Assignment Request',
            react:IssueAssignEmailTemplate({taskName , userName , duedate}),
        })
        if(error){
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
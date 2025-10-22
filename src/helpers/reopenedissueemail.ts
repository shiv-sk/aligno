import { Resend } from 'resend';
import IssueReopenedEmailTemplate from '../../email/reopenedissue';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendReopenedIssueEmail(taskName: string , userName: string , userMail: string){
    try {
        const { data, error } = await resend.emails.send({
            from: 'Aligno <onboarding@aligno.live>',
            to: userMail,
            subject: 'Task Review Request',
            react:IssueReopenedEmailTemplate({taskName , userName}),
        })
        if(error){
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
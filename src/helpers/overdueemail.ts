import { Resend } from 'resend';
import issueAssignEmailTemplate from '../../email/issueassignment';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendOverdueEmail(taskName: string , userName: string , userMail: string , duedate:string){
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: userMail,
            subject: 'Hello world',
            react:issueAssignEmailTemplate({taskName , userName , duedate}),
        })
        if(error){
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
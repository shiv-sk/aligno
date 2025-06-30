import { Resend } from 'resend';
import ClosureAcceptedEmailTemplate from '../../email/closureaccepted';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendClosureAcceptedEmail(taskName: string , userName: string , userMail: string){
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: userMail,
            subject: 'Hello world',
            react:ClosureAcceptedEmailTemplate({taskName , userName}),
        })
        if(error){
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
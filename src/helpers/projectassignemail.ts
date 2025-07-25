import { Resend } from 'resend';
import ProjectAssignEmailTemplate from '../../email/projectassign';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendProjectAssignmentEmail(projectName: string , userName: string , userMail: string , role:string , adminmail:string){
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: userMail,
            subject: 'Hello world',
            react:ProjectAssignEmailTemplate({projectName , userName , role , adminmail}),
        })
        if(error){
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
import { Head, Html, Preview, Row, Section, Text } from "@react-email/components";

interface IssueAssignment{
    userName:string,
    taskName:string,
    overdue:string,
}
export default function overdueEmailTemplate({taskName , userName , overdue}: IssueAssignment){
    return(
        <Html lang="en">
            <Head/>
            <Preview>
                Reminder: Task Overdue - {taskName}
            </Preview>
            <Section>
                <Row>
                    <Text>
                        Hello {userName},   
                    </Text>
                </Row>
                <Row>
                    <Text>
                        This is a friendly reminder that your task <strong>{taskName}</strong> is overdue.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        The task is currently overdue by <strong>{overdue}</strong>. 
                        Please log in to Aligno to review and take the necessary action.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you have any questions or need support, feel free to contact your Team Lead or Manager.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}
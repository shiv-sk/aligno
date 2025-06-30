import { Head, Html, Preview, Row, Section, Text } from "@react-email/components";

interface IssueAssignment{
    userName:string,
    taskName:string,
    duedate:string
}
export default function issueAssignEmailTemplate({taskName , userName , duedate}: IssueAssignment){
    return(
        <Html lang="en">
            <Head/>
            <Preview>
                New Task Assigned: {taskName}
            </Preview>
            <Section>
                <Row>
                    <Text>
                        Hello {userName},   
                    </Text>
                </Row>
                <Row>
                    <Text>
                        We’re happy to inform you that your task assignment request for{" "}<strong>{taskName}</strong> has been accepted.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Please complete the task before the due date:<strong> {duedate}</strong>.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you have any queries, feel free to contact your Team Lead or Manager. 
                        Their contact details are available on your Aligno dashboard.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Log in to Aligno to view and start working on the task.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
    
}
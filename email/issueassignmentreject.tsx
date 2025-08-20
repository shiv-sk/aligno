import { Head, Html, Preview, Row, Section, Text } from "@react-email/components";

interface IssueAssignment{
    userName:string,
    taskName:string,
}
export default function IssueAssignmentRejectEmailTemplate({taskName , userName}: IssueAssignment){
    return(
        <Html lang="en">
            <Head/>
            <Preview>
                Task Assignment Request Rejected: {taskName}
            </Preview>
            <Section>
                <Row>
                    <Text>
                        Hello {userName},   
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Your request to be assigned the task <strong>{taskName}</strong> has
                        been <strong>rejected</strong>. 
                    </Text>
                </Row>
                <Row>
                    <Text>
                        The rejection may be due to workload distribution or project
                        priorities. We encourage you to focus on your current tasks and
                        continue contributing effectively.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        You can log in to Aligno to track your assigned tasks and review
                        their status anytime.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Thank you for your understanding.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}
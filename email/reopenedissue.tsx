import { Head, Html, Preview, Row, Section, Text } from "@react-email/components";

interface IssueAssignment{
    userName:string,
    taskName:string,
}
export default function IssueReopenedEmailTemplate({taskName , userName}: IssueAssignment){
    return(
        <Html lang="en">
            <Head/>
            <Preview>
                Task Closure Request Rejected: {taskName}
            </Preview>
            <Section>
                <Row>
                    <Text>
                        Hello {userName},   
                    </Text>
                </Row>
                <Row>
                    <Text>
                        We appreciate your efforts and dedication in completing the task <strong>{taskName}</strong>. 
                    </Text>
                </Row>
                <Row>
                    <Text>
                        However, after reviewing your closure request, 
                        we found that the task does not fully meet the required criteria and has been reopened for further updates.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Please review the feedback provided in Aligno and take the necessary actions to complete the task as expected.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Log in to Aligno to view the task status and continue your progress.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}
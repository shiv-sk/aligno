import { Head, Html, Preview, Row, Section, Text } from "@react-email/components";

interface IssueAssignment{
    userName:string,
    taskName:string,
}
export default function IssueClosureRequest({taskName , userName}: IssueAssignment){
    return(
        <Html lang="en">
            <Head/>
            <Preview>
                Requesting To Close Task: {taskName}
            </Preview>
            <Section>
                <Row>
                    <Text>
                        Hello {userName},   
                    </Text>
                </Row>
                <Row>
                    <Text>
                        I’m grateful for the opportunity to work on <strong>{taskName}</strong> and for your trust in assigning it to me.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        I’ve completed the task as per the given requirements. 
                        Please review it to confirm if everything meets the expected criteria.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Thank you once again for your support and guidance.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Log in to Aligno to view the closure request and take appropriate action.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}
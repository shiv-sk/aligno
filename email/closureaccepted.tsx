import { Head, Html, Preview, Row, Section, Text } from "@react-email/components";

interface IssueAssignment{
    userName:string,
    taskName:string,
}
export default function ClosureAcceptedEmailTemplate({taskName , userName}: IssueAssignment){
    return(
        <Html lang="en">
            <Head/>
            <Preview>
                Closure Request Accepted: {taskName}
            </Preview>
            <Section>
                <Row>
                    <Text>
                        Hello {userName},   
                    </Text>
                </Row>
                <Row>
                    <Text>
                        We’re happy to inform you that your task closure request for{" "}<strong>{taskName}</strong> has been accepted..
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Thank you for your valuable contribution and dedication toward completing the task. 
                        We truly appreciate your time and effort.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Log in to Aligno to view the task closure details.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}
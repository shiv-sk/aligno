import { Head, Html, Preview, Row, Section, Text } from "@react-email/components";

interface IssueAssignment{
    userName:string,
    projectName:string,
    role:string,
    adminmail:string
}
export default function ProjectAssign({projectName , userName , role , adminmail}: IssueAssignment){
    return(
        <Html lang="en">
            <Head/>
            <Preview>
                Assigned into new Project: {projectName}
            </Preview>
            <Section>
                <Row>
                    <Text>
                        Hello {userName},   
                    </Text>
                </Row>
                <Row>
                    <Text>
                        We’re pleased to inform you that you’ve been assigned to a new project: 
                        <strong>{projectName}</strong>, as a <strong>{role}</strong>.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Please log in to Aligno to view project details and begin contributing to the team’s progress.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you have any questions or need assistance, feel free to reach out to ${adminmail}.
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}
import { Container } from "@mantine/core";
import { ChallengeLayout } from "../../_components/Layouts/ChallengeLayout/ChallengeLayout";

export default function Layout ({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ChallengeLayout>
            <Container size='xl' style={{ padding: "20px" }}>
                {children}
            </Container>
        </ChallengeLayout>
    );
}

import { Box, Divider, Space, Center, Card, Title, Button, Alert, Text } from "@mantine/core";
import { IconSend, IconInfoCircle } from "@tabler/icons-react";
import { FC } from "react";
import { ChallengePrimitive } from "../../../../_core/_primitives/ChallengePrimitive";
import { ChallengeMainData } from "../../_components/shared/ChallengeMainData";
import { PrizesSection } from "../../_components/shared/PrizesSection";

interface PreviewPublishedChallengePublicDataProps {
    challenge: ChallengePrimitive;
}

export const PreviewPublishedChallengePublicData: FC<PreviewPublishedChallengePublicDataProps> = ({ challenge }) => {

    return (
        <Box>
            <ChallengeMainData challenge={challenge} />

            <Divider my="xl" />
            <PrizesSection challenge={challenge} />

            <Space h='4rem' />
            <ParticipationsSection />

            <Space h='2rem' />
        </Box>
    );
};


const ParticipationsSection: FC<{
}> = ({ }) => {

    return (
        <Center>
            <Card withBorder shadow="md" radius='md' w={'100%'}>
                <Center>
                    <Title order={2} size="h2" style={{ fontSize: '2.6rem', fontWeight: 900 }}>
                        Participations
                    </Title>
                </Center >

                <Space h={'1rem'} />

                <Center>
                    <Button
                        leftSection={<IconSend size={18} />}
                        variant='light'
                        onClick={() => { }}
                        disabled={true}
                    >
                        Submit solution
                    </Button>
                </Center>

                <Space h={'1rem'} />

                <Center>
                    <Alert
                        variant="light"
                        color="blue"
                        title="No participants yet"
                        icon={<IconInfoCircle />}
                    >
                        <Text>
                            No one has send their solution yet.
                        </Text>

                        <Text>
                            If you want to complete the challenge, start working in your solution and send it when it's ready!
                        </Text>
                    </Alert>
                </Center>
            </Card>
        </Center>

    );
};

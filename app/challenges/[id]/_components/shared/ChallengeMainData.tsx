import { FC } from "react";
import { ChallengePrimitive } from "../../../../_core/_primitives/ChallengePrimitive";
import { Center, Title, Space, List, ListItem, Text, Badge } from "@mantine/core";
import { formatDate } from "../../../../_utils/formatDate";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getChallengeHighestPrize } from "../../../../_utils/getChallengeHighestPrize";

export const ChallengeMainData: FC<{
    challenge: ChallengePrimitive;
}> = ({ challenge }) => {
    const highestPrize = getChallengeHighestPrize(challenge);

    return (
        <>
            <Center>
                <Title order={1} size="h1" ta='center' style={{ fontSize: '3rem', fontWeight: 900 }}>
                    {challenge.title}
                </Title>
            </Center>

            <Space h='0.5rem' />
            <Center>
                <Text
                    component="h2"
                    variant="gradient"
                    ta='center'
                    style={{ fontSize: '2.6rem', fontWeight: 900 }}
                >
                    Win {formatPrice(highestPrize)}
                </Text>
            </Center>

            {
                challenge.isCompleted
                &&
                <>
                    <Space h='0.5rem' />
                    <Center>
                        <Badge variant="gradient" size="xl" color="cyan">Completed</Badge>
                    </Center>
                </>
            }

            <Space h='3rem' />
            <Title order={2} size="h2" style={{ fontSize: '2.6rem', fontWeight: 900 }}>
                Challenge details
            </Title>
            <Text size="xl" fw={400} style={{ whiteSpace: 'pre-wrap' }}>
                {challenge.summary}
            </Text>

            <ChallengeDetailsSection title="Main objective" content={challenge.mainObjetive} />
            <ChallengeDetailsSection title="Secondary goals" content={challenge.otherObjetives} />
            <ChallengeDetailsSection title="Requirements" content={challenge.requirements} />
            <ChallengeDetailsSection title="Evaluation criteria" content={challenge.evaluationCriteria} />
            <ChallengeDetailsSection title="Additional information" content={challenge.additionalComments} />
            <ChallengeDetailsSection title="Contact" content={challenge.contactInformation} />

            <Space h={'2rem'} />
            <Title order={3} size="h3" style={{ fontSize: '1.6rem', fontWeight: 900 }}>
                Other specs
            </Title>
            <List>
                <ListItem>
                    <Text size="xl" fw={400} >
                        {challenge.configuration.allowMultipleParticipationsPerUser
                            ?
                            'Multiple participations per user are allowed'
                            :
                            'Only 1 participation per user'
                        }
                    </Text>
                </ListItem>
                <ListItem>
                    <Text size="xl" fw={400} >
                        {challenge.configuration.limitOfParticipations
                            ?
                            `There's a limit of ${challenge.configuration.limitOfParticipations} participations. Rejected solutions are not taken into account`
                            :
                            "There's no limit of participations"
                        }
                    </Text>
                </ListItem>

                <ListItem>
                    <Text size="xl" fw={400} >
                        {challenge.configuration.deadline
                            ?
                            `The challenge has a deadline. New participations will not be accepted after ${formatDate(new Date(challenge.configuration.deadline))}`
                            :
                            "No deadline. The creator of the challenge will close or mark the challenge as completed at will"
                        }
                    </Text>
                </ListItem>
            </List>
        </>
    );
};

const ChallengeDetailsSection: FC<{
    title: string;
    content: string | null;
}> = ({ title, content }) => {
    if (!content) return null;

    return (
        <>
            <Space h={'2rem'} />
            <Title order={3} size="h3" style={{ fontSize: '1.6rem', fontWeight: 900 }}>
                {title}
            </Title>
            <Text size="xl" fw={400} style={{ whiteSpace: 'pre-wrap' }}>
                {content}
            </Text>
        </>
    );
};
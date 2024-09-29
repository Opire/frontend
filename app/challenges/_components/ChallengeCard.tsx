import { Avatar, Badge, Card, CardSection, Center, Flex, Group, Skeleton, Text, Tooltip } from "@mantine/core";
import { FC, Ref } from "react";
import { useRouter } from "next/navigation";
import { ChallengePrimitive } from "../../_core/_primitives/ChallengePrimitive";
import { useHover } from "@mantine/hooks";
import { useGetUserPublicInfoFromAnyPlatform } from "../../../hooks/useGetUserPublicInfoFromAnyPlatform";
import { getRelativeTime } from "../../_utils/getRelativeTime";
import { getChallengeHighestPrize } from "../../_utils/getChallengeHighestPrize";
import { formatPrice } from "../../_utils/formatPrice";

interface ChallengeCardProps {
    data: ChallengePrimitive;
    inputRef?: Ref<HTMLDivElement>;
}

export const ChallengeCard: FC<ChallengeCardProps> = ({
    data: challenge,
    inputRef
}) => {
    const router = useRouter();
    const {
        isLoading,
        username,
        avatarURL,
    } = useGetUserPublicInfoFromAnyPlatform({ userId: challenge.creatorId })
    const { hovered, ref: hoverRef } = useHover();
    const highestPrize = getChallengeHighestPrize(challenge);

    const redirectToDetails = () => {
        router.push(`/challenges/${challenge.id}`)
    }

    return (
        <Card
            ref={hoverRef}
            withBorder
            shadow='md'
            radius="md"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 100ms ease-out',
                transform: hovered ? 'scale(1.01)' : ''
            }}
            onClick={redirectToDetails}
        >
            <CardSection withBorder p="sm" ref={inputRef}>
                <Flex align={'center'} gap={'8px'}>
                    {
                        !isLoading
                            ?
                            <>
                                <Tooltip label={username}>
                                    <Avatar
                                        src={avatarURL}
                                        alt={username}
                                        size='md'
                                        radius='xl'
                                    />
                                </Tooltip>
                                <Text lineClamp={2} fw={500}>{challenge.title}</Text>
                            </>
                            :
                            <Skeleton h='2rem' />
                    }
                </Flex>
            </CardSection>

            <CardSection p="sm">
                <Group style={{ gap: "6px" }}>
                    {
                        challenge.isCompleted
                            ?
                            <Badge variant="outline" color="green">Completed</Badge>
                            :
                            <Badge variant="outline" color="blue">Active</Badge>
                    }

                    {
                        !challenge.isAcceptingParticipations
                        &&
                        <Badge variant="outline" color="orange">Closed for new participations</Badge>
                    }
                </Group>
            </CardSection>

            <CardSection p="sm">
                <Center>
                    <Text c={'dimmed'} fw={500} lineClamp={2}>{challenge.summary}</Text>
                </Center>
            </CardSection>

            <CardSection p="sm">
                <Group justify="center">
                    <Text
                        variant="gradient"
                        style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                    >
                        {formatPrice(highestPrize)}
                    </Text>
                </Group>
            </CardSection>


            <CardSection withBorder p="md">
                <Group
                    justify="flex-end"
                    align="flex-end"
                    style={{ height: "100%" }}
                    wrap="nowrap"
                >
                    <Text
                        c="dimmed"
                        size="xs"
                        style={{
                            textAlign: "end",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span>Created</span>
                        <span>{getRelativeTime(new Date(challenge.createdAt))}</span>
                    </Text>
                </Group>
            </CardSection>
        </Card>
    );
};

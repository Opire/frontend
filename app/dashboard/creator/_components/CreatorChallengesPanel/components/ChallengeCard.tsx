import { Button, Card, Group, Space, Text } from "@mantine/core";
import { FC, Ref } from "react";
import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { useRouter } from "next/navigation";

interface ChallengeCardProps {
    data: ChallengePrimitive;
    inputRef?: Ref<HTMLDivElement>;
}

export const ChallengeCard: FC<ChallengeCardProps> = ({
    data,
    inputRef,
}) => {
    const router = useRouter();

    const redirectToDetails = () => {
        router.push(`/challenges/${data.id}`);
    };

    return (
        <Card
            ref={inputRef}
            withBorder
            shadow="md"
            radius="md"
            style={{ justifyContent: "space-between" }}
        >
            <Group justify="center">
                <Text
                    size="xl"
                >
                    {data.title}
                </Text>
            </Group>

            <Space h='20px' />

            <Group justify="space-between">
                <Button
                    component="a"
                    variant='subtle'
                    onClick={redirectToDetails}
                >
                    Go to details
                </Button>
            </Group>
        </Card>
    );
};

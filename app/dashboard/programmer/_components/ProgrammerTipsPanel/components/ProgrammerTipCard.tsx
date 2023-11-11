import { Avatar, Button, Card, Group, Space, Text } from "@mantine/core";
import { FC, Ref } from "react";
import { formatPrice } from "../../../../../_utils/formatPrice";
import { TipByProgrammerDTO } from "../../../../../_core/_dtos/TipByProgrammerDTO";

interface ProgrammerTipCardProps {
    data: TipByProgrammerDTO;
    inputRef?: Ref<HTMLDivElement>;
}

export const ProgrammerTipCard: FC<ProgrammerTipCardProps> = ({
    data,
    inputRef
}) => {

    return (
        <Card
            ref={inputRef}
            withBorder
            shadow="md"
            radius="md"
        >
            <Group justify="center">
                <Avatar
                    src={data.creator.avatarURL}
                    radius='xl'
                    size='lg'
                />
                <Text
                    style={{ fontSize: '40px' }}
                    fw={700}
                    size="xl"
                    variant='gradient'
                >
                    {formatPrice(data.price)}
                </Text>
            </Group>

            <Space h='20px' />

            <Group justify="center">
                <Button
                    component="a"
                    variant='subtle'
                    target="_blank"
                    href={data.commentURL}
                >
                    Go to issue
                </Button>
            </Group>
        </Card>
    );
};

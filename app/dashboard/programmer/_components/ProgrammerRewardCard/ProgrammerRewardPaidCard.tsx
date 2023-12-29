import { FC, Ref } from "react";
import { Avatar, AvatarGroup, Card, CardSection, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { CustomImage } from "../../../../_components/CustomImage";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { IssueByProgrammerDTO } from "../../../../_core/_dtos/IssueByProgrammerDTO";
import { useUserAuth } from "../../../../../hooks/useUserAuth";
import { getRewardsPriceForProgrammer } from "../../../../_utils/getRewardsPriceForProgrammer";

interface ProgrammerRewardPaidCardProps {
    data: IssueByProgrammerDTO;
    inputRef?: Ref<HTMLDivElement>;
}

export const ProgrammerRewardPaidCard: FC<ProgrammerRewardPaidCardProps> = ({
    data,
    inputRef
}) => {
    const userAuth = useUserAuth()!;
    const totalIssueRewardPrice = getRewardsPriceForProgrammer({ issue: data, userAuth })

    return (
        <Card
            ref={inputRef}
            withBorder
            shadow="md"
            radius="md"
        >
            <CardSection withBorder p="sm">
                <Group justify="space-between">
                    <Group>
                        <Avatar src={data.organizationLogoURL} size='md' radius='xl' />
                        <Text>{data.organizationName}</Text>
                    </Group>

                    <Group>
                        <CustomImage
                            src={`/icons/${data.platform.toLowerCase()}.png`}
                            fallbackSrc='/icons/fallback.png'
                            alt={data.platform}
                            height={30}
                            width={30}
                        />
                    </Group>
                </Group>
            </CardSection>

            <CardSection p="sm">
                <Group>
                    <Link href={data.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Title order={3}>{data.title}</Title>
                    </Link>
                </Group>
            </CardSection>

            <CardSection p="sm">
                <Group justify="center" style={{ flexDirection: 'column' }}>
                    <Text
                        component="div"
                        size={'xs'}
                        style={{ textAlign: 'center' }}
                    >
                        <Text>
                            Total received:
                        </Text>

                        <Text
                            style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                            variant='gradient'
                        >
                            {formatPrice({ unit: 'USD_CENT', value: totalIssueRewardPrice })}
                        </Text>
                    </Text>
                </Group>

            </CardSection>


            <CardSection withBorder inheritPadding p="md" style={{ minHeight: '88px', height: '100%' }}>
                <Group justify="flex-end" align='flex-end' style={{ height: '100%' }}>
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
                        <span>{getRelativeTime(new Date(data.createdAt))}</span>
                    </Text>
                </Group>
            </CardSection>
        </Card >
    );
};

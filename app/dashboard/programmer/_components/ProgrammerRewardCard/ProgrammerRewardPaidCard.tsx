import { FC, Ref } from "react";
import { Avatar, Card, CardSection, Group, Text, Title } from "@mantine/core";
import { CustomImage } from "../../../../_components/CustomImage";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { IssueByProgrammerDTO } from "../../../../_core/_dtos/IssueByProgrammerDTO";
import { useHover } from "@mantine/hooks";
import { useRouter } from "next/navigation";

interface ProgrammerRewardPaidCardProps {
    data: IssueByProgrammerDTO;
    inputRef?: Ref<HTMLDivElement>;
}

export const ProgrammerRewardPaidCard: FC<ProgrammerRewardPaidCardProps> = ({
    data,
    inputRef,
}) => {
    const totalIssueRewardPrice = data.programmer.alreadyPaid;
    const { hovered, ref: hoverRef } = useHover();
    const router = useRouter();

    const redirectToDetails = () => {
        router.push(`/issues/${data.issueId}`);
    };

    return (
        <Card
            ref={hoverRef}
            withBorder
            shadow="md"
            radius="md"
            style={{ cursor: "pointer", transition: "transform 100ms ease-out", transform: hovered ? "scale(1.01)" : "" }}
            onClick={redirectToDetails}
        >
            <CardSection withBorder p="sm" ref={inputRef}>
                <Group justify="space-between">
                    <Group>
                        <Avatar src={data.organization.logoURL} size='md' radius='xl' />
                        <div
                            style={{ display: "flex", flexWrap: "wrap" }}
                        >
                            <Text lineClamp={1} c={"dimmed"}>{data.organization.name}</Text>
                            <span>&nbsp;/&nbsp;</span>
                            <Text lineClamp={1}>{data.project.name}</Text>
                        </div>
                    </Group>

                </Group>
            </CardSection>

            <CardSection p="sm">
                <Group wrap="nowrap">
                    <CustomImage
                        src={`/icons/${data.platform.toLowerCase()}.png`}
                        fallbackSrc='/icons/fallback.png'
                        alt={data.platform}
                        height={44}
                        width={44}
                    />
                    <Title order={3}>{data.title}</Title>
                </Group>
            </CardSection>

            <CardSection p="sm">
                <Group justify="center" style={{ flexDirection: "column" }}>
                    <Text
                        component="div"
                        size={"xs"}
                        style={{ textAlign: "center" }}
                    >
                        <Text>
                            Total received:
                        </Text>

                        <Text
                            style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                            variant='gradient'
                        >
                            {formatPrice(totalIssueRewardPrice)}
                        </Text>
                    </Text>
                </Group>

            </CardSection>

            <CardSection withBorder inheritPadding p="md" style={{ minHeight: "88px", height: "100%" }}>
                <Group justify="flex-end" align='flex-end' style={{ height: "100%" }}>
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

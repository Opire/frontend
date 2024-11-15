import { FC, Ref } from "react";
import { Avatar, AvatarGroup, Card, CardSection, Group, HoverCard, HoverCardDropdown, HoverCardTarget, Text, Title } from "@mantine/core";
import { CustomImage } from "../../../../_components/CustomImage";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { IssueByCreatorDTO } from "../../../../_core/_dtos/IssueByCreatorDTO";
import { Price } from "../../../../_core/_vos/Price";
import { useHover } from "@mantine/hooks";
import { useRouter } from "next/navigation";

interface CreatorRewardPaidCardProps {
    data: IssueByCreatorDTO;
    inputRef?: Ref<HTMLDivElement>;
}

export const CreatorRewardPaidCard: FC<CreatorRewardPaidCardProps> = ({
    data,
    inputRef,
}) => {
    const totalIssueRewardPrice = Price.sum([Price.fromPrimitives(data.alreadyPaid), Price.fromPrimitives(data.pendingToBePaid)]);
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
                            Total:
                        </Text>

                        <Text
                            style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                            variant='gradient'
                        >
                            {formatPrice(totalIssueRewardPrice.toPrimitives())}
                        </Text>
                    </Text>
                </Group>

            </CardSection>

            <CardSection withBorder inheritPadding p="md" style={{ minHeight: "88px", height: "100%" }}>
                <Group justify="space-between" align='flex-end' style={{ height: "100%" }}>
                    <AvatarGroup>
                        {
                            data.usersTrying.filter(userTrying => userTrying.alreadyPaid.value > 0).map((userTrying) => (
                                <>
                                    <HoverCard withArrow shadow="md" closeDelay={0} openDelay={0} key={userTrying.id}>
                                        <HoverCardTarget>
                                            <Avatar src={userTrying.avatarURL} alt={userTrying.username} color="teal" size='lg' radius='xl' />
                                        </HoverCardTarget>
                                        <HoverCardDropdown>
                                            <Text
                                                variant='default'
                                            >
                                                    Paid {formatPrice(userTrying.alreadyPaid)}
                                            </Text>
                                        </HoverCardDropdown>
                                    </HoverCard>
                                </>
                            ))
                        }
                    </AvatarGroup>

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

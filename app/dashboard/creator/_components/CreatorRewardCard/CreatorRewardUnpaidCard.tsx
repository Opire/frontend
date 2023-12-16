import { FC, Ref } from "react";
import { Avatar, AvatarGroup, Button, Card, CardSection, Flex, Group, HoverCard, HoverCardDropdown, HoverCardTarget, Modal, SimpleGrid, Space, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { ClaimerUserCard } from "../ClaimerUserCard";
import { handleClickPayClaimer } from "./PayClaimerButton";
import { CustomImage } from "../../../../_components/CustomImage";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { splitToShow } from "../../../../_utils/splitToShow";
import { IssueByCreatorDTO } from "../../../../_core/_dtos/IssueByCreatorDTO";

interface CreatorRewardUnpaidCardProps {
    data: IssueByCreatorDTO;
    inputRef?: Ref<HTMLDivElement>;
}

const MAX_NUMBER_OF_USERS_TO_SHOW = 3;

export const CreatorRewardUnpaidCard: FC<CreatorRewardUnpaidCardProps> = ({
    data,
    inputRef
}) => {
    const [opened, { open, close }] = useDisclosure(false);

    // TODO: be careful we are adding assuming that are the same currency
    const paidIssueRewardPrice = data.rewards.filter(reward => reward.status === 'Completed').reduce((acc, reward) => {
        return acc + reward.price.value
    }, 0);

    const unpaidIssueRewardPrice = data.rewards.filter(reward => reward.status !== 'Completed').reduce((acc, reward) => {
        return acc + reward.price.value
    }, 0);

    const claimerUsers = data.usersTrying.filter(userTrying => userTrying.hasClaimed);
    const [claimerUsersToShow, claimerUsersHidden] = splitToShow(claimerUsers, MAX_NUMBER_OF_USERS_TO_SHOW);
    const hasMoreUsers = claimerUsersHidden.length > 0;

    const amountOfExtraUsers = claimerUsersHidden.length;

    const handleClickPay = async () => {
        if (claimerUsers.length > 1) {
            open();
            return;
        }

        if (claimerUsers.length === 1) {
            const claimer = claimerUsers[0];
            await handleClickPayClaimer(claimer.id, data.id);
        }
    }

    return (
        <>

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
                    <Group justify="space-between">
                        <Text
                            component="div"
                            size={'xs'}
                            style={{ textAlign: 'center' }}
                        >
                            <Text>
                                Already paid:
                            </Text>

                            <Text
                                style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                variant='gradient'
                            >
                                {formatPrice({ unit: 'USD_CENT', value: paidIssueRewardPrice })}
                            </Text>
                        </Text>
                    </Group>

                    <Space h='20px' />

                    <Group justify="center" style={{ flexDirection: 'column' }}>
                        <Text
                            component="div"
                            size={'xs'}
                            style={{ textAlign: 'center' }}
                        >
                            <Text>
                                Pending to be paid:
                            </Text>

                            <Text
                                style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                                variant='gradient'
                            >
                                {formatPrice({ unit: 'USD_CENT', value: unpaidIssueRewardPrice })}
                            </Text>
                        </Text>

                        {
                            claimerUsers.length > 0
                            &&
                            <Button
                                m='0 auto'
                                size="compact-xl"
                                variant='gradient'
                                onClick={handleClickPay}
                            >
                                Pay
                            </Button>
                        }
                    </Group>

                </CardSection>


                <CardSection withBorder inheritPadding p="md" style={{ minHeight: '88px', height: '100%' }}>
                    <Group justify="space-between" align='flex-end' style={{ height: '100%' }}>
                        <Flex direction="column" gap="8px">
                            {claimerUsersToShow.length > 0 && (
                                <Text c="dimmed" size={"sm"}>
                                    Claimed by
                                </Text>
                            )}

                            <Group gap="xs">
                                <AvatarGroup>
                                    {
                                        claimerUsersToShow.map((claimerUser) => {
                                            const totalPaidToUser = data.rewards.filter(reward => reward.rewardedUserId === claimerUser.id).reduce((acc, reward) => {
                                                return acc + reward.price.value
                                            }, 0)

                                            return (
                                                <HoverCard
                                                    withArrow
                                                    shadow="md"
                                                    closeDelay={0}
                                                    openDelay={0}
                                                    key={claimerUser.id}
                                                >
                                                    <HoverCardTarget>
                                                        <Avatar
                                                            src={claimerUser.avatarURL}
                                                            alt={claimerUser.username}
                                                            color="teal"
                                                            size='md'
                                                            radius='xl'
                                                        />
                                                    </HoverCardTarget>

                                                    <HoverCardDropdown>
                                                        <ClaimerUserCard
                                                            user={claimerUser}
                                                            paidPrice={totalPaidToUser}
                                                        />
                                                    </HoverCardDropdown>
                                                </HoverCard>
                                            )
                                        })
                                    }
                                    {hasMoreUsers && (
                                        <HoverCard withArrow shadow="md" closeDelay={0} openDelay={0}>
                                            <HoverCardTarget>
                                                <Avatar
                                                    size='md'
                                                    radius='xl'
                                                >
                                                    {`+${amountOfExtraUsers}`}
                                                </Avatar>
                                            </HoverCardTarget>
                                            <HoverCardDropdown>
                                                {claimerUsersHidden.map((claimerUser) => <div key={claimerUser.id}>{claimerUser.username}</div>)}
                                            </HoverCardDropdown>
                                        </HoverCard>
                                    )}
                                </AvatarGroup>


                            </Group>
                        </Flex>

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
                </CardSection >
            </Card >

            <Modal opened={opened} onClose={close} title="Select user to be paid" centered>
                <SimpleGrid
                    cols={1}
                    verticalSpacing="xl"
                >
                    {claimerUsers.map(claimerUser => {
                        const totalPaidToUser = data.rewards.filter(reward => reward.rewardedUserId === claimerUser.id).reduce((acc, reward) => {
                            return acc + reward.price.value
                        }, 0)

                        return <ClaimerUserCard
                            key={claimerUser.id}
                            user={claimerUser}
                            issueId={data.id}
                            paidPrice={totalPaidToUser}
                            pendingPrice={unpaidIssueRewardPrice}
                        />
                    }
                    )}
                </SimpleGrid>
            </Modal>
        </>
    );
};

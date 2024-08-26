import { FC, Ref, useState } from "react";
import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    CardSection,
    Flex,
    Group,
    HoverCard,
    HoverCardDropdown,
    HoverCardTarget,
    Modal,
    SimpleGrid,
    Space,
    Text,
    Title,
} from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { ClaimerUserCard } from "../ClaimerUserCard";
import { handleClickPayClaimer } from "./PayClaimerButton";
import { CustomImage } from "../../../../_components/CustomImage";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { splitToShow } from "../../../../_utils/splitToShow";
import { IssueByCreatorDTO } from "../../../../_core/_dtos/IssueByCreatorDTO";
import { useRouter } from "next/navigation";
import { clientCustomFetch } from "../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../constants";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { mutate } from "swr";

interface CreatorRewardUnpaidCardProps {
    data: IssueByCreatorDTO;
    inputRef?: Ref<HTMLDivElement>;
}

const MAX_NUMBER_OF_USERS_TO_SHOW = 3;

export const CreatorRewardUnpaidCard: FC<CreatorRewardUnpaidCardProps> = ({
    data,
    inputRef,
}) => {
    const [isRemovingRewards, setIsRemovingRewards] = useState(false);
    const [
        isModalForRemoveRewardsOpened,
        { open: openModalForRemoveRewards, close: closeModalForRemoveRewards },
    ] = useDisclosure(false);

    const [
        isModalForSelectUserToPayOpened,
        {
            open: openModalForSelectUserToPay,
            close: closeModalForSelectUserToPay,
        },
    ] = useDisclosure(false);
    const { hovered, ref: hoverRef } = useHover();
    const router = useRouter();

    const claimerUsers = data.usersTrying.filter(
        (userTrying) => userTrying.hasClaimed
    );
    const [claimerUsersToShow, claimerUsersHidden] = splitToShow(
        claimerUsers,
        MAX_NUMBER_OF_USERS_TO_SHOW
    );
    const hasMoreUsers = claimerUsersHidden.length > 0;
    const amountOfExtraUsers = claimerUsersHidden.length;

    const canRewardsBeRemoved =
        claimerUsers.length === 0 && data.alreadyPaid.value === 0;

    const redirectToDetails = () => {
        router.push(`/issues/${data.issueId}`);
    };

    const handleClickPay = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        if (claimerUsers.length > 1) {
            openModalForSelectUserToPay();
            return;
        }

        if (claimerUsers.length === 1) {
            const claimer = claimerUsers[0];
            await handleClickPayClaimer(claimer.id, data.issueId);
        }
    };

    const handleClickRemove = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        openModalForRemoveRewards();
    };

    async function removeRewards() {
        setIsRemovingRewards(true);

        try {
            await clientCustomFetch(
                API_ROUTES.REWARDS.DELETE_ALL_FROM_CREATOR(),
                {
                    method: "DELETE",
                    body: {
                        issue: {
                            id: data.issueId,
                        },
                    },
                }
            );

            notifications.show({
                title: "Rewards deleted",
                message: `We successfully deleted all the rewards that you created for the issue ${data.url}`,
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "teal",
                icon: <IconCheck />,
            });

            setTimeout(() => {
                mutate(API_ROUTES.REWARDS.CREATED_BY_ME());
                setIsRemovingRewards(false);
            }, 500);
        } catch (error) {
            notifications.show({
                title: "Error while trying to delete the rewards",
                message: "Please review that none has claimed the rewards",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "red",
                icon: <IconX />,
            });
            setIsRemovingRewards(false);
        }
    }

    return (
        <>
            <Card
                ref={hoverRef}
                withBorder
                shadow={"md"}
                radius="md"
                style={{
                    cursor: "pointer",
                    transition: "transform 100ms ease-out",
                    transform: hovered ? "scale(1.01)" : "",
                }}
                onClick={redirectToDetails}
            >
                <CardSection withBorder p="sm" ref={inputRef}>
                    <Group justify="space-between">
                        <Group>
                            <Avatar
                                src={data.organization.logoURL}
                                size="md"
                                radius="xl"
                            />
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <Text lineClamp={1} c={"dimmed"}>
                                    {data.organization.name}
                                </Text>
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
                            fallbackSrc="/icons/fallback.png"
                            alt={data.platform}
                            height={44}
                            width={44}
                        />
                        <Title order={3}>{data.title}</Title>
                    </Group>
                </CardSection>

                <CardSection p="sm">
                    <Group justify="space-between">
                        <Text
                            component="div"
                            size={"xs"}
                            style={{ textAlign: "center" }}
                        >
                            <Text>Already paid:</Text>

                            <Text
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                }}
                                variant="gradient"
                            >
                                {formatPrice(data.alreadyPaid)}
                            </Text>
                        </Text>
                    </Group>

                    <Space h="20px" />

                    <Group justify="center" style={{ flexDirection: "column" }}>
                        <Text
                            component="div"
                            size={"xs"}
                            style={{ textAlign: "center" }}
                        >
                            <Text>Pending to be paid:</Text>

                            <Text
                                style={{
                                    fontSize: "2.4rem",
                                    fontWeight: "bold",
                                }}
                                variant="gradient"
                            >
                                {formatPrice(data.pendingToBePaid)}
                            </Text>
                        </Text>

                        {claimerUsers.length > 0 && (
                            <Button
                                m="0 auto"
                                size="compact-xl"
                                variant="gradient"
                                onClick={handleClickPay}
                            >
                                Pay
                            </Button>
                        )}

                        {canRewardsBeRemoved && (
                            <Button
                                m="0 auto"
                                size="compact-xl"
                                variant="filled"
                                color="red"
                                onClick={handleClickRemove}
                                loading={isRemovingRewards}
                                disabled={isRemovingRewards}
                            >
                                Delete
                            </Button>
                        )}
                    </Group>
                </CardSection>

                <CardSection
                    withBorder
                    inheritPadding
                    p="md"
                    style={{ minHeight: "88px", height: "100%" }}
                >
                    <Group
                        justify="space-between"
                        align="flex-end"
                        style={{ height: "100%" }}
                    >
                        <Flex direction="column" gap="8px">
                            {claimerUsersToShow.length > 0 && (
                                <Text c="dimmed" size={"sm"}>
                                    Claimed by
                                </Text>
                            )}

                            <Group gap="xs">
                                <AvatarGroup>
                                    {claimerUsersToShow.map((claimerUser) => {
                                        const totalPaidToUser =
                                            claimerUser.alreadyPaid;

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
                                                        src={
                                                            claimerUser.avatarURL
                                                        }
                                                        alt={
                                                            claimerUser.username
                                                        }
                                                        color="teal"
                                                        size="md"
                                                        radius="xl"
                                                    />
                                                </HoverCardTarget>

                                                <HoverCardDropdown>
                                                    <ClaimerUserCard
                                                        user={claimerUser}
                                                        paidPrice={
                                                            totalPaidToUser
                                                        }
                                                    />
                                                </HoverCardDropdown>
                                            </HoverCard>
                                        );
                                    })}
                                    {hasMoreUsers && (
                                        <HoverCard
                                            withArrow
                                            shadow="md"
                                            closeDelay={0}
                                            openDelay={0}
                                        >
                                            <HoverCardTarget>
                                                <Avatar size="md" radius="xl">
                                                    {`+${amountOfExtraUsers}`}
                                                </Avatar>
                                            </HoverCardTarget>
                                            <HoverCardDropdown>
                                                {claimerUsersHidden.map(
                                                    (claimerUser) => (
                                                        <div
                                                            key={claimerUser.id}
                                                        >
                                                            {
                                                                claimerUser.username
                                                            }
                                                        </div>
                                                    )
                                                )}
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
                            <span>
                                {getRelativeTime(new Date(data.createdAt))}
                            </span>
                        </Text>
                    </Group>
                </CardSection>
            </Card>

            <Modal
                opened={isModalForSelectUserToPayOpened}
                onClose={closeModalForSelectUserToPay}
                title="Select user to be paid"
                centered
            >
                <SimpleGrid cols={1} verticalSpacing="xl">
                    {claimerUsers.map((claimerUser) => (
                        <ClaimerUserCard
                            key={claimerUser.id}
                            user={claimerUser}
                            issueId={data.issueId}
                            paidPrice={claimerUser.alreadyPaid}
                            pendingPrice={data.pendingToBePaid}
                        />
                    ))}
                </SimpleGrid>
            </Modal>

            <Modal
                opened={isModalForRemoveRewardsOpened}
                onClose={closeModalForRemoveRewards}
                title={<strong>Confirm action</strong>}
                closeOnClickOutside={false}
                centered
            >
                <section>
                    <Text>
                        Are you sure you want to remove all the rewards that you
                        created for this issue?
                    </Text>

                    <Space h={"1rem"} />
                    <Text>
                        This will deduct the amount of{" "}
                        <strong>{formatPrice(data.pendingToBePaid)}</strong>{" "}
                        from the issue, reducing the possibility of being solved
                        by a developer.
                    </Text>
                </section>

                <Space h={"3rem"} />

                <Flex>
                    <Button
                        m="0 auto"
                        variant="outline"
                        onClick={closeModalForRemoveRewards}
                    >
                        Go back
                    </Button>

                    <Button
                        m="0 auto"
                        variant="filled"
                        color="red"
                        onClick={() => {
                            closeModalForRemoveRewards();
                            removeRewards();
                        }}
                        disabled={isRemovingRewards}
                    >
                        Confirm & delete rewards
                    </Button>
                </Flex>
            </Modal>
        </>
    );
};

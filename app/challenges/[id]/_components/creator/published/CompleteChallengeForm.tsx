import { Button, Modal, Space, Title, Container, List, ListItem, ThemeIcon, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconLock, IconTrophyFilled, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";

interface CompleteChallengeFormProps {
    challenge: ChallengeDTO;
}

export function CompleteChallengeForm({ challenge }: CompleteChallengeFormProps): React.ReactElement {
    const router = useRouter();

    const [isCompletingChallenge, setIsCompletingChallenge] = useState(false);

    const [
        isModalToCompleteChallengeOpen,
        { close: closeCompleteChallengeModal, open: openCompleteChallengeModal },
    ] = useDisclosure();

    async function completeChallenge() {
        try {
            const wasAbleToPayPrizes = challenge.canPrizesBePaid;

            setIsCompletingChallenge(true);

            await clientCustomFetch(
                API_ROUTES.CHALLENGES.COMPLETE(challenge.id),
                {
                    method: "POST",
                },
            );

            setTimeout(() => {
                notifications.show({
                    title: "Challenge completed successfully",
                    message: wasAbleToPayPrizes
                        ? "Congratulations on your completed challenge! If you had some participations pending to pay, remember to proceed with the payment when you are ready"
                        : "Congratulations on your completed challenge! You can now start paying the approved participants based on the prizes their solutions deserve",
                    withBorder: true,
                    withCloseButton: true,
                    autoClose: 10_000,
                    color: "teal",
                });

                router.refresh();

                closeCompleteChallengeModal();
                setIsCompletingChallenge(false);
            }, 1000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setIsCompletingChallenge(false);
        }
    }

    return (
        <>
            <Button
                onClick={openCompleteChallengeModal}
                variant="gradient"
                size="md"
                disabled={isCompletingChallenge || challenge.participations.length === 0}
                loading={isCompletingChallenge}
                leftSection={<IconLock />}
            >
                Complete challenge
            </Button>

            <Modal
                opened={isModalToCompleteChallengeOpen}
                onClose={closeCompleteChallengeModal}
                title={<Title size={"h2"}>Are you sure you want to complete this challenge?</Title>}
                centered
                size={"xl"}
                closeOnEscape={true}
                closeOnClickOutside={false}
                withCloseButton={true}
            >
                <Container size={"lg"}>
                    <Space h='0.5rem' />

                    <List
                        spacing="xs"
                        size="sm"
                        center
                    >
                        <ListItem
                            icon={
                                <ThemeIcon color="red" size={24} radius="xl">
                                    <IconX style={{ width: rem(16), height: rem(16) }} />
                                </ThemeIcon>
                            }
                        >
                            New participations won&apos;t be allowed
                        </ListItem>

                        <ListItem
                            icon={
                                <ThemeIcon color="red" size={24} radius="xl">
                                    <IconX style={{ width: rem(16), height: rem(16) }} />
                                </ThemeIcon>
                            }
                        >
                            Nothing related to the challenge will be editable anymore
                        </ListItem>

                        {
                            !challenge.canPrizesBePaid &&
                            <ListItem
                                icon={
                                    <ThemeIcon color="teal" size={24} radius="xl">
                                        <IconTrophyFilled style={{ width: rem(16), height: rem(16) }} />
                                    </ThemeIcon>
                                }
                            >
                                You will be able to pay the prizes to the approved participants
                            </ListItem>
                        }

                        <ListItem
                            icon={
                                <ThemeIcon color="teal" size={24} radius="xl">
                                    <IconCheck style={{ width: rem(16), height: rem(16) }} />
                                </ThemeIcon>
                            }
                        >
                            The challenge will be considered as completed
                        </ListItem>
                    </List>

                    <Space h='3rem' />

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
                        <Button
                            onClick={closeCompleteChallengeModal}
                            variant="subtle"
                            size="md"
                        >
                            Go back
                        </Button>

                        <Button
                            variant="gradient"
                            size="md"
                            loading={isCompletingChallenge}
                            disabled={isCompletingChallenge}
                            onClick={completeChallenge}
                            leftSection={<IconLock />}
                        >
                            Complete challenge
                        </Button>

                    </div>
                </Container>
            </Modal>
        </>
    );
}

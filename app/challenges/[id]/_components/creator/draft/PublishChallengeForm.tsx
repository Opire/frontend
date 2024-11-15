import { Button, Modal, Text, Space, Title, Alert, Divider, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconInfoCircle, IconLock, IconLockOpen, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface PublishChallengeFormProps {
    challengeId: string;
    isDisabled: boolean;
    isLoading: boolean;
}

export function PublishChallengeForm({ challengeId, isDisabled, isLoading }: PublishChallengeFormProps): React.ReactElement {
    const router = useRouter();

    const [isPublishingChallenge, setIsPublishingChallenge] = useState(false);

    const [
        isModalToPublishChallengeOpen,
        { close: closePublishChallengeModal, open: openPublishChallengeModal },
    ] = useDisclosure();

    async function publishChallenge(allowParticipationsAfterPublish: boolean) {
        try {
            setIsPublishingChallenge(true);

            await clientCustomFetch(
                API_ROUTES.CHALLENGES.PUBLISH_DRAFT(challengeId),
                {
                    method: "POST",
                },
            );

            if (allowParticipationsAfterPublish) {
                await clientCustomFetch(
                    API_ROUTES.CHALLENGES.ALLOW_NEW_PARTICIPATIONS(challengeId),
                    {
                        method: "POST",
                    },
                );
            }

            const message = allowParticipationsAfterPublish
                ? "Now everyone is able to see the challenge, and participants can start to submit their solutions! Attract more attention by sharing it in your social media!"
                : "Now everyone is able to see the challenge! Attract more attention by sharing it in your social media, but rembember that you need to enable new participations before participants can submit their solutions";

            setTimeout(() => {
                notifications.show({
                    title: "Challenge published successfully",
                    message,
                    withBorder: true,
                    withCloseButton: true,
                    autoClose: 10_000,
                    color: "teal",
                    icon: <IconCheck />,
                });

                window.scrollTo(0, 0);
                router.refresh();

                setIsPublishingChallenge(false);
            }, 1000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            notifications.show({
                title: "Challenge cannot be published",
                message:
                    "Please, review that all the required fields are filled",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "red",
                icon: <IconX />,
            });
            setIsPublishingChallenge(false);
        }
    }

    return (
        <>
            <Button
                onClick={openPublishChallengeModal}
                variant="gradient"
                disabled={isDisabled || isPublishingChallenge || isLoading}
                loading={isPublishingChallenge || isLoading}
            >
                Publish challenge
            </Button>

            <Modal
                opened={isModalToPublishChallengeOpen}
                onClose={closePublishChallengeModal}
                title={<Title size={"h2"}>Choose how to publish your challenge</Title>}
                centered
                size={"xl"}
                closeOnEscape={true}
                closeOnClickOutside={false}
                withCloseButton={true}
            >
                <Container size={"lg"}>
                    <Alert
                        variant="light"
                        color="blue"
                        title="Non-reversible action"
                        icon={<IconInfoCircle />}
                    >
                        <Text>
                            Publishing your challenge means that it will be <u>visible for everyone</u>.
                        </Text>

                        <Space h='1rem' />

                        <Text>
                            <strong>This cannot be undone</strong>, so make sure that you are happy with the challenge configuration before continue. Once published, <strong>you will not be able to edit your challenge</strong>.
                        </Text>

                        <Space h='1rem' />

                        <Text>
                            You only will be able to <strong>increase the prizes, increase the limit of participations, and extend the deadline</strong>. The rest of the content will not be editable anymore.
                        </Text>

                    </Alert>

                    <Space h='1rem' />
                    <Text>
                        You can publish your challenge in two ways:
                    </Text>
                    <Space h='1rem' />

                    <Title size={"h4"}>With open participations</Title>
                    <Text>
                        The challenge will be published, and the participants will be able to submit their solutions right away.
                    </Text>
                    <Space h='1rem' />
                    <Text>
                        This is ideal if you are ready to start receiving the solutions, and do not need to wait before the participants start to work in their solutions.
                    </Text>

                    <Space h='2rem' />

                    <Title size={"h4"}>With closed participations</Title>
                    <Text>
                        The challenge will be published, but nobody will be able to submit a solution.
                    </Text>
                    <Space h='1rem' />
                    <Text>
                        This can give you some time to promote the challenge, share it in social media, or arrange any setup before start receiving solutions.
                    </Text>

                    <Space h='1rem' />

                    <Divider />
                    <Space h='1rem' />

                    <Text>
                        Once the challenge is published, you will be able to close/open the participations at will as many times as you need, so don&apos;t worry if you are not sure which option to pick right now.
                    </Text>

                    <Space h='2rem' />

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
                        <Button
                            onClick={closePublishChallengeModal}
                            variant="subtle"
                            size="md"
                        >
                            Go back
                        </Button>

                        <Button
                            variant="light"
                            size="md"
                            loading={isPublishingChallenge}
                            disabled={isPublishingChallenge}
                            onClick={() => publishChallenge(false)}
                            leftSection={<IconLock />}
                        >
                            With closed participations
                        </Button>

                        <Button
                            variant="filled"
                            size="md"
                            loading={isPublishingChallenge}
                            disabled={isPublishingChallenge}
                            onClick={() => publishChallenge(true)}
                            leftSection={<IconLockOpen />}
                        >
                            With open participations
                        </Button>
                    </div>
                </Container>
            </Modal>
        </>
    );
}

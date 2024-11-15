import { Button, Modal, Text, Space, Title, Alert, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

interface DeleteChallengeFormProps {
    challengeId: string;
    isDisabled: boolean;
    isLoading: boolean;
}

export function DeleteChallengeForm({ challengeId, isDisabled, isLoading }: DeleteChallengeFormProps): React.ReactElement {
    const router = useRouter();

    const [isDeletingChallenge, setIsDeletingChallenge] = useState(false);

    const [
        isModalToDeleteChallengeOpen,
        { close: closeDeleteChallengeModal, open: openDeleteChallengeModal },
    ] = useDisclosure();

    async function deleteChallenge() {
        try {
            setIsDeletingChallenge(true);

            await clientCustomFetch(
                API_ROUTES.CHALLENGES.BY_ID(challengeId),
                {
                    method: "DELETE",
                },
            );

            setTimeout(() => {
                setIsDeletingChallenge(false);

                notifications.show({
                    title: "Challenge deleted successfully",
                    message: "The challenge has been completely removed from the platform",
                    withBorder: true,
                    withCloseButton: true,
                    autoClose: 10_000,
                    color: "teal",
                });

                mutate(API_ROUTES.CHALLENGES.CREATED_BY_ME());
                router.push("/dashboard/creator/challenges");
                window.scrollTo(0, 0);
            }, 1000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setIsDeletingChallenge(false);
        }
    }

    return (
        <>
            <Button
                onClick={openDeleteChallengeModal}
                variant="outline"
                color="red"
                disabled={isDisabled || isDeletingChallenge || isLoading}
                loading={isDeletingChallenge || isLoading}
            >
                Delete challenge
            </Button>

            <Modal
                opened={isModalToDeleteChallengeOpen}
                onClose={closeDeleteChallengeModal}
                title={<Title size={"h2"}>Confirm action</Title>}
                centered
                size={"xl"}
                closeOnEscape={true}
                closeOnClickOutside={false}
                withCloseButton={true}
            >
                <Container size={"lg"}>
                    <Alert
                        variant="light"
                        color="yellow"
                        title="Non-reversible action"
                        icon={<IconInfoCircle />}
                    >
                        <Text>
                            Are you sure you want to delete this challenge? <strong>Once deleted, you will not be able to access to it</strong>, and it will be completely removed from the platform.
                        </Text>

                        <Space h='1rem' />

                        <Text>
                            <strong>This cannot be undone</strong>, so make sure that you do not want to keep or edit the configuration.
                        </Text>
                    </Alert>

                    <Space h='2rem' />

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
                        <Button
                            onClick={closeDeleteChallengeModal}
                            variant="subtle"
                            size="md"
                        >
                            Go back
                        </Button>

                        <Button
                            variant="filled"
                            size="md"
                            loading={isDeletingChallenge}
                            disabled={isDeletingChallenge}
                            onClick={deleteChallenge}
                        >
                            Delete challenge
                        </Button>
                    </div>
                </Container>
            </Modal>
        </>
    );
}

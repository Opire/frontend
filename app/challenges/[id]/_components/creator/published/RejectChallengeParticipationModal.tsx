import { Button, Container, Group, Modal, Space, Text, Textarea, Title } from "@mantine/core";
import { FC, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { ChallengeParticipationPrimitive } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { useForm } from "@mantine/form";

interface RejectChallengeParticipationModalProps {
    challenge: ChallengeDTO;
    participation: ChallengeParticipationPrimitive;
    isOpened: boolean;
    onClose: () => void;
    onParticipationRejected: () => void;
}

export const RejectChallengeParticipationModal: FC<
    RejectChallengeParticipationModalProps
> = ({
    challenge,
    participation,
    isOpened,
    onClose,
    onParticipationRejected,
}) => {
    const [isRejectingParticipation, setIsRejectingParticipation] =
            useState(false);

    const form = useForm({
        initialValues: {
            reasonForRejection: "",
        },
    });

    async function reject ({ reasonForRejection }: { reasonForRejection: string }) {
        try {
            setIsRejectingParticipation(true);

            await clientCustomFetch(
                API_ROUTES.CHALLENGES.REJECT_PARTICIPATION({ challengeId: challenge.id, participationId: participation.id }),
                {
                    method: "POST",
                    body: {
                        participation: {
                            reasonForRejection,
                        },
                    },
                },
            );

            notifications.show({
                title: "Solution rejected",
                message: "The feedback you provided will be sent to the participant",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
            });
            setTimeout(() => {
                onParticipationRejected();
                setIsRejectingParticipation(false);
            }, 500);

            onClose();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            notifications.show({
                title: "Error while rejecting the solution",
                message:
                        "Please, try again later. Contact us at opiredev@gmail.com if the problem persist",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "red",
                icon: <IconX />,
            });
            setIsRejectingParticipation(false);
        }
    }

    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            title={
                <Title size={"h3"}>
                        Reject solution
                </Title>
            }
            size={"xl"}
            closeOnEscape={true}
            closeOnClickOutside={false}
            withCloseButton={true}
        >
            <Container size={"lg"}>
                <Text>
                        If you continue, the participation will be rejected. This mean that the solution has not been considered successful based on the evaluation criteria of the challenge.
                </Text>

                <Space h="1rem" />

                <Text>
                        Please, provide thoughtful feedback and describe in detail what&apos;s the reason for the rejection. This will be sent to the participant, so it&apos;s possible that they will submit another solution based on the feedback you provide.
                </Text>

                <Space h="2rem" />

                <form onSubmit={form.onSubmit(reject)}>
                    <Textarea
                        withAsterisk
                        description="Explain why are you rejecting this solution"
                        label="Reason for rejection"
                        key='reasonForRejection'
                        required
                        autosize
                        minRows={4}
                        {...form.getInputProps("reasonForRejection")}
                    />

                    <Space h='2rem' />

                    <Group justify="space-between" mt="md">
                        <Button variant="subtle" size="md" onClick={onClose}>
                                Go back
                        </Button>

                        <Button
                            type="submit"
                            variant="gradient"
                            size="md"
                            loading={isRejectingParticipation}
                            disabled={isRejectingParticipation}
                        >
                                Reject & send feedback
                        </Button>
                    </Group>
                </form>
            </Container>

        </Modal>
    );
};

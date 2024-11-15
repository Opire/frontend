import { Button, Container, Group, Modal, Space, Text, Title } from "@mantine/core";
import { FC, useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { ChallengeParticipationPrimitive } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";

interface ApproveChallengeParticipationModalProps {
    challenge: ChallengeDTO;
    participation: ChallengeParticipationPrimitive;
    isOpened: boolean;
    onClose: () => void;
    onParticipationApproved: () => void;
}

export const ApproveChallengeParticipationModal: FC<
    ApproveChallengeParticipationModalProps
> = ({
    challenge,
    participation,
    isOpened,
    onClose,
    onParticipationApproved,
}) => {
    const canPrizesBePaid = challenge.canPrizesBePaid;

    const [isApprovingParticipation, setIsApprovingParticipation] =
            useState(false);

    async function approve () {
        try {
            setIsApprovingParticipation(true);

            await clientCustomFetch(
                API_ROUTES.CHALLENGES.APPROVE_PARTICIPATION({ challengeId: challenge.id, participationId: participation.id }),
                {
                    method: "POST",
                },
            );

            notifications.show({
                title: "Solution approved",
                message: canPrizesBePaid
                    ? "You can already pay the participant if you want, or do it later!"
                    : "You will be able to pay the participant after the challenge is completed",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "teal",
                icon: <IconCheck />,
            });
            setTimeout(() => {
                onParticipationApproved();
                setIsApprovingParticipation(false);
            }, 500);

            onClose();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            notifications.show({
                title: "Error while approving the participation",
                message:
                        "Please, try again later. Contact us at opiredev@gmail.com if the problem persist",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "red",
                icon: <IconX />,
            });
            setIsApprovingParticipation(false);
        }
    }

    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            title={
                <Title size={"h3"}>
                        Approve solution
                </Title>
            }
            size={"xl"}
            closeOnEscape={true}
            closeOnClickOutside={false}
            withCloseButton={true}
        >
            <Container size={"lg"}>
                <Text>
                        If you continue, the solution will be approved. This mean that the solution has been considered successful based on the evaluation criteria of the challenge.
                </Text>

                <Space h="1rem" />

                <Text>
                    {
                        canPrizesBePaid
                            ? "After approving the solution, you can pay the participant immediately or choose to do it later."
                            : "Once the solution is approved, it will remain in that state. You can pay the participants with approved solutions once the challenge is marked as completed."
                    }
                </Text>

                <Space h="2rem" />

                <Group justify="space-between" mt="md">
                    <Button variant="subtle" size="md" onClick={onClose}>
                            Go back
                    </Button>

                    <Button
                        variant="filled"
                        size="md"
                        loading={isApprovingParticipation}
                        disabled={isApprovingParticipation}
                        onClick={approve}
                    >
                            Approve
                    </Button>
                </Group>
            </Container>
        </Modal>
    );
};

import { Button, Container, Group, Modal, Space, Text, Title } from "@mantine/core";
import { FC, useState } from "react";
import { IconCheck, IconHandStop, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";

interface ToggleIsChallengeAcceptingNewParticipationsModalProps {
    challenge: ChallengePrimitive;
    isOpened: boolean;
    onClose: () => void;
    onChallengeUpdated: () => void;
}

export const ToggleIsChallengeAcceptingNewParticipationsModal: FC<ToggleIsChallengeAcceptingNewParticipationsModalProps> = ({
    challenge,
    isOpened,
    onClose,
    onChallengeUpdated = () => { },
}) => {
    const [isUpdatingChallenge, setIsUpdatingChallenge] = useState(false);

    const isGoingToStopNewParticipations = challenge.isAcceptingParticipations;

    async function updateChallenge () {
        try {
            setIsUpdatingChallenge(true);

            await clientCustomFetch(
                isGoingToStopNewParticipations
                    ? API_ROUTES.CHALLENGES.DENY_NEW_PARTICIPATIONS(challenge.id)
                    : API_ROUTES.CHALLENGES.ALLOW_NEW_PARTICIPATIONS(challenge.id),
                {
                    method: "POST",
                },
            );

            notifications.show({
                title: isGoingToStopNewParticipations ? "Participations stopped" : "New participations allowed",
                message: isGoingToStopNewParticipations ? "No more participants will be able to submit their solution. Don't forget to re-allow new participations once you're ready to start receiving solutions for your challenge" : "Now any participant will be able to submit their solution to the challenge 🎉",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: isGoingToStopNewParticipations ? "red" : "teal",
                icon: isGoingToStopNewParticipations ? <IconHandStop /> : <IconCheck />,
            });
            setTimeout(() => {
                onChallengeUpdated();
                setIsUpdatingChallenge(false);
            }, 500);

            onClose();
        } catch (error) {
            notifications.show({
                title: "Error while updating the challenge",
                message: "Please, try again later. Contact us at opiredev@gmail.com if the problem persist",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "red",
                icon: <IconX />,
            });
            setIsUpdatingChallenge(false);
        }
    }

    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            title={<Title size={"h3"}>{isGoingToStopNewParticipations ? "Disallow new participations" : "Allow new participations"}</Title>}
            size={"xl"}
            closeOnEscape={true}
            closeOnClickOutside={false}
            withCloseButton={true}
        >
            <Container size={"lg"}>
                <Text>
                    {isGoingToStopNewParticipations
                        ? "If you continue, you will prevent new participants from submitting their solution to the challenge. This can be reverted at any time."
                        : "If you continue, participants will be able to submit their solution to the challenge. Make sure you are prepared to start reviewing their participations. This can be reverted later if you change your mind."
                    }
                </Text>

                <Space h='2rem' />

                <Group justify="space-between" mt="md">
                    <Button
                        variant="subtle"
                        size="md"
                        onClick={onClose}
                    >
                        Go back
                    </Button>

                    <Button
                        variant="filled"
                        size="md"
                        loading={isUpdatingChallenge}
                        disabled={isUpdatingChallenge}
                        onClick={updateChallenge}
                    >
                        {isGoingToStopNewParticipations ? "Stop receiving participations" : "Start receiving participations"}
                    </Button>
                </Group>
            </Container>
        </Modal>
    );
};

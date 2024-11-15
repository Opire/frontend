import { Button, Flex } from "@mantine/core";
import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { mutate } from "swr";
import { API_ROUTES } from "../../../../../../constants";
import { ToggleIsChallengeAcceptingNewParticipationsModal } from "./ToggleIsChallengeAcceptingNewParticipationsModal";

interface PublishedChallengeCreatorActionsProps {
    challenge: ChallengePrimitive;
}

export const PublishedChallengeCreatorActions: FC<PublishedChallengeCreatorActionsProps> = ({ challenge }) => {
    const router = useRouter();
    const [isModalForToggleChallengeAcceptsParticipationsOpen, { close: closeModalForToggleChallengeAcceptsParticipations, open: openModalForToggleChallengeAcceptsParticipations }] = useDisclosure();

    function onChallengeUpdated () {
        mutate(API_ROUTES.CHALLENGES.BY_ID(challenge.id));
        router.refresh();
    }

    return (
        <>
            <Flex>
                <Button
                    leftSection={challenge.isAcceptingParticipations ? <IconPlayerPause size={18} /> : <IconPlayerPlay size={18} />}
                    variant='light'
                    onClick={openModalForToggleChallengeAcceptsParticipations}
                >
                    {challenge.isAcceptingParticipations ? "Disable new participations" : "Enable new participations"}
                </Button>
            </Flex>

            <ToggleIsChallengeAcceptingNewParticipationsModal
                challenge={challenge}
                isOpened={isModalForToggleChallengeAcceptsParticipationsOpen}
                onClose={closeModalForToggleChallengeAcceptsParticipations}
                onChallengeUpdated={onChallengeUpdated}
            />
        </>
    );
};

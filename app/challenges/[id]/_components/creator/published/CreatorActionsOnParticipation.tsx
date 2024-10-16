import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { IconCheck, IconTrash, IconTrophyFilled } from "@tabler/icons-react";
import { FC, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { mutate } from "swr";
import { API_ROUTES } from "../../../../../../constants";
import { ToggleIsChallengeAcceptingNewParticipationsModal } from "./ToggleIsChallengeAcceptingNewParticipationsModal";
import { ChallengeParticipationPrimitive } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";

interface CreatorActionsOnParticipationProps {
    challenge: ChallengeDTO;
    participation: ChallengeParticipationPrimitive;
}

export const CreatorActionsOnParticipation: FC<CreatorActionsOnParticipationProps> = ({ challenge, participation }) => {
    const router = useRouter();
    const [isModalForToggleChallengeAcceptsParticipationsOpen, { close: closeModalForToggleChallengeAcceptsParticipations, open: openModalForToggleChallengeAcceptsParticipations }] = useDisclosure();

    function onChallengeUpdated() {
        mutate(API_ROUTES.CHALLENGES.BY_ID(challenge.id));
        router.refresh();
    }

    const { canApprove, canReject, canPay } = useMemo(() => {
        const canApprove = participation.status === 'waiting_for_approval';
        const canReject = participation.status === 'waiting_for_approval' || participation.status === 'approved';
        const canPay = participation.status === 'approved';

        return { canApprove, canReject, canPay }
    }, [participation]);

    return (
        <>
            <Flex gap={'md'}>

                {
                    canApprove
                    &&
                    <Tooltip label="Approve solution">
                        <ActionIcon size="md" variant="light" color="cyan">
                            <IconCheck />
                        </ActionIcon>
                    </Tooltip>
                }

                {
                    canPay
                    &&
                    <Tooltip label={challenge.canPrizesBePaid ? 'Pay prize' : 'The challenge needs to be completed before you can pay the participants'}>
                        <ActionIcon size="md" variant="light" color="green" disabled={!challenge.canPrizesBePaid} >
                            <IconTrophyFilled />
                        </ActionIcon>
                    </Tooltip>
                }

                {
                    canReject
                    &&
                    <Tooltip label="Reject solution">
                        <ActionIcon size="md" variant="light" color="red" >
                            <IconTrash />
                        </ActionIcon>
                    </Tooltip>
                }
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
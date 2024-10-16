import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { IconCheck, IconTrash, IconTrophyFilled } from "@tabler/icons-react";
import { FC, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { mutate } from "swr";
import { API_ROUTES } from "../../../../../../constants";
import { ChallengeParticipationPrimitive } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { ApproveChallengeParticipationModal } from "./ApproveChallengeParticipationModal";
import { RejectChallengeParticipationModal } from "./RejectChallengeParticipationModal";

interface CreatorActionsOnParticipationProps {
    challenge: ChallengeDTO;
    participation: ChallengeParticipationPrimitive;
}

export const CreatorActionsOnParticipation: FC<CreatorActionsOnParticipationProps> = ({ challenge, participation }) => {
    const router = useRouter();
    const [isModalForApproveOpen, { close: closeModalForApprove, open: openModalForApprove }] = useDisclosure();
    const [isModalForPayOpen, { close: closeModalForPay, open: openModalForPay }] = useDisclosure();
    const [isModalForRejectOpen, { close: closeModalForReject, open: openModalForReject }] = useDisclosure();

    function onChallengeUpdated() {
        mutate(API_ROUTES.CHALLENGES.BY_ID(challenge.id));
        router.refresh();
    }

    function onParticipationApproved() {
        onChallengeUpdated();

        if (challenge.canPrizesBePaid) {
            openModalForPay();
        }
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
                        <ActionIcon size="md" variant="light" color="cyan" onClick={openModalForApprove}>
                            <IconCheck />
                        </ActionIcon>
                    </Tooltip>
                }

                {
                    canPay
                    &&
                    <Tooltip label={challenge.canPrizesBePaid ? 'Pay prize' : 'The challenge needs to be completed before you can pay the participant'}>
                        <ActionIcon size="md" variant="light" color="green" disabled={!challenge.canPrizesBePaid} onClick={openModalForPay}>
                            <IconTrophyFilled />
                        </ActionIcon>
                    </Tooltip>
                }

                {
                    canReject
                    &&
                    <Tooltip label="Reject solution">
                        <ActionIcon size="md" variant="light" color="red" onClick={openModalForReject}>
                            <IconTrash />
                        </ActionIcon>
                    </Tooltip>
                }
            </Flex>

            <ApproveChallengeParticipationModal
                challenge={challenge}
                participation={participation}
                isOpened={isModalForApproveOpen}
                onClose={closeModalForApprove}
                onParticipationApproved={onParticipationApproved}
            />

            <RejectChallengeParticipationModal
                challenge={challenge}
                participation={participation}
                isOpened={isModalForRejectOpen}
                onClose={closeModalForReject}
                onParticipationRejected={onChallengeUpdated}
            />
        </>
    );
};
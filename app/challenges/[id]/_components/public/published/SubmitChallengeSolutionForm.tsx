import { Button } from "@mantine/core";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { IconSend } from "@tabler/icons-react";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { redirectAfterLogin } from "../../../../../_utils/redirectAfterLogin";
import { useDisclosure } from "@mantine/hooks";
import { mutate } from "swr";
import { API_ROUTES } from "../../../../../../constants";
import { SubmitChallengeSolutionModal } from "./SubmitChallengeSolutionModal";
import { useTriggerCallbackOnQueryParamFirstMatch } from "../../../../../../hooks/useTriggerCallbackOnQueryParamFirstMatch";

interface SubmitChallengeSolutionFormProps {
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}

export const SubmitChallengeSolutionForm: FC<SubmitChallengeSolutionFormProps> = ({ challenge, userAuth }) => {
    const router = useRouter();
    const [isModalOpen, { close, open }] = useDisclosure();

    useTriggerCallbackOnQueryParamFirstMatch({ queryParamKey: 'submit-solution', callback: open });

    function handleClickSubmitSolution() {
        if (userAuth) {
            open();
            return;
        }

        redirectAfterLogin.prepareNextRedirection(`/challenges/${challenge.id}?submit-solution=true`);
        router.push('?login=true');
    }

    function onSolutionSubmitted() {
        mutate(API_ROUTES.CHALLENGES.BY_ID(challenge.id));
        router.refresh();
    }

    return (
        <>
            <Button
                leftSection={<IconSend size={18} />}
                variant='light'
                onClick={handleClickSubmitSolution}
                disabled={!challenge.isAcceptingParticipations}
            >
                Submit solution
            </Button>

            <SubmitChallengeSolutionModal
                challengeId={challenge.id}
                isOpened={isModalOpen}
                onClose={close}
                onSolutionSubmitted={onSolutionSubmitted}
            />
        </>
    );
};
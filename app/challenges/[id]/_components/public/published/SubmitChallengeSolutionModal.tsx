import { Button, Container, Group, Modal, Space, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { useForm } from '@mantine/form';
import { IconCheck, IconTrophy, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";

interface SubmitChallengeSolutionModalProps {
    challengeId: string;
    isOpened: boolean;
    onClose: () => void;
    onSolutionSubmitted?: () => void;
}

export const SubmitChallengeSolutionModal: FC<SubmitChallengeSolutionModalProps> = ({
    challengeId,
    isOpened,
    onClose,
    onSolutionSubmitted = () => { },
}) => {
    const [isSubmittingSolution, setIsSubmittingSolution] = useState(false);

    const form = useForm({
        initialValues: {
            proposedSolution: '',
        },
        validate: {
            proposedSolution: (value: string) => {
                let validURL;

                try {
                    validURL = new URL(value);
                } catch (_) {
                    return 'Invalid URL'

                }
                const isValid = validURL.protocol === 'http:' || validURL.protocol === 'https:';

                if (!isValid) {
                    return 'Invalid URL'
                }
            },
        },
    });

    async function submitSolution({ proposedSolution }: { proposedSolution: string }) {
        try {
            setIsSubmittingSolution(true);

            await clientCustomFetch(API_ROUTES.CHALLENGES.PARTICIPATE(challengeId), {
                method: 'POST',
                body: {
                    participation: {
                        proposedSolution,
                    }
                }
            });

            notifications.show({
                title: 'Solution submitted sucesfully',
                message: "The creator of the challenge has been notified. We'll let you know once your solution has been approved or rejected. Good luck! 🎉",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'teal',
                icon: <IconCheck />,
            })
            setTimeout(() => {
                onSolutionSubmitted();
                setIsSubmittingSolution(false);
            }, 500);

            onClose();
        } catch (error) {
            notifications.show({
                title: 'Error while submitting the solution',
                message: "Please, review that you provided a valid URL that points to your solution for this challenge",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'red',
                icon: <IconX />,
            })
            setIsSubmittingSolution(false);
        }
    }

    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            size={'xl'}
            title={<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}><IconTrophy size={16} color="teal" /><span>Submit your solution for the challenge</span></div>}
            closeOnEscape={true}
            closeOnClickOutside={false}
            withCloseButton={true}
        >
            <form onSubmit={form.onSubmit(submitSolution)}>
                <Container size='xs'>
                    <TextInput
                        withAsterisk
                        label="Link to your solution"
                        description="Make sure this link can be accessed by the creator of the challenge"
                        placeholder="e.g. https://github.com/Opire/docs/pull/10"
                        key='proposedSolution'
                        required
                        {...form.getInputProps('proposedSolution')}
                    />
                </Container>

                <Space h='1rem' />

                <Group justify="flex-end" mt="md">
                    <Button
                        type="submit"
                        variant="gradient"
                        size="md"
                        loading={isSubmittingSolution}
                        disabled={isSubmittingSolution}
                    >
                        Submit
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}
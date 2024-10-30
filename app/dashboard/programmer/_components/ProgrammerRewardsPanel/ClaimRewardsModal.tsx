import { Button, Container, Group, Modal, Space, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { useForm } from '@mantine/form';
import { IconCheck, IconDiamond, IconX } from "@tabler/icons-react";
import { clientCustomFetch } from "../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../constants";
import { notifications } from "@mantine/notifications";

interface ClaimRewardsModalProps {
    isOpened: boolean;
    onClose: () => void;
    prefilledIssueURL?: string;
    onRewardsClaimed?: () => void;
}

export const ClaimRewardsModal: FC<ClaimRewardsModalProps> = ({
    isOpened,
    onClose,
    prefilledIssueURL,
    onRewardsClaimed = () => { },
}) => {
    const [isClaimingRewards, setIsClaimingRewards] = useState(false);

    const form = useForm({
        initialValues: {
            issueURL: prefilledIssueURL ?? '',
            pullRequestURL: '',
        },
        validate: {
            issueURL: (value: string) => {
                let validURL;

                try {
                    validURL = new URL(value);
                } catch (_) {
                    return 'Invalid issue URL'

                }
                const isValid = validURL.protocol === 'http:' || validURL.protocol === 'https:';

                if (!isValid) {
                    return 'Invalid issue URL'
                }
            },
            pullRequestURL: (value: string) => {
                let validURL;

                try {
                    validURL = new URL(value);
                } catch (_) {
                    return 'Invalid pull request URL'

                }
                const isValid = validURL.protocol === 'http:' || validURL.protocol === 'https:';

                if (!isValid) {
                    return 'Invalid pull request URL'
                }
            },
        },
    });

    async function claimRewards({ issueURL, pullRequestURL }: { issueURL: string; pullRequestURL: string }) {
        try {
            setIsClaimingRewards(true);

            await clientCustomFetch(API_ROUTES.ISSUES.CLAIM_FROM_ISSUE_URL(), {
                method: 'POST',
                body: {
                    issue: {
                        url: issueURL
                    },
                    pullRequest: {
                        url: pullRequestURL
                    }
                }
            });

            notifications.show({
                title: 'Rewards claimed successfully',
                message: "",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'teal',
                icon: <IconCheck />,
            })
            setTimeout(() => {
                onRewardsClaimed();
                setIsClaimingRewards(false);
            }, 500);

            onClose();
        } catch (error) {
            notifications.show({
                title: 'Error while trying to claim the rewards',
                message: "Please review that the issue and the pull request are public and can be accessed by anyone",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'red',
                icon: <IconX />,
            })
            setIsClaimingRewards(false);
        }
    }

    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            size={'xl'}
            title={<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}><IconDiamond size={16} color="teal" /><span>Claim rewards from an issue</span></div>}
            closeOnEscape={true}
            closeOnClickOutside={false}
            withCloseButton={true}
        >
            <form onSubmit={form.onSubmit(claimRewards)}>
                <Container size='xs'>
                    <TextInput
                        withAsterisk
                        label="Issue URL"
                        placeholder="https://github.com/Opire/docs/issues/2"
                        key='issueURL'
                        required
                        disabled={prefilledIssueURL !== undefined}
                        {...form.getInputProps('issueURL')}
                    />

                    <Space h='1rem' />

                    <TextInput
                        withAsterisk
                        label="Pull Request URL"
                        placeholder="https://github.com/Opire/docs/pull/10"
                        key='pullRequestURL'
                        required
                        {...form.getInputProps('pullRequestURL')}
                    />
                </Container>

                <Space h='1rem' />

                <Group justify="flex-end" mt="md">
                    <Button
                        type="submit"
                        variant="gradient"
                        size="md"
                        loading={isClaimingRewards}
                    >
                        Claim
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}
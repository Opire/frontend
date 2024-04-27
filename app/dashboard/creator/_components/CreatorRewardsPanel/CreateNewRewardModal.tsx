import { Button, Container, Group, Modal, NumberInput, Space, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { useForm } from '@mantine/form';
import { IconCheck, IconDiamond, IconX } from "@tabler/icons-react";
import { clientCustomFetch } from "../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../constants";
import { notifications } from "@mantine/notifications";
import { mutate } from "swr";

interface CreateNewRewardModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const CreateNewRewardModal: FC<CreateNewRewardModalProps> = ({
    isOpened,
    onClose
}) => {
    const [isCreatingReward, setIsCreatingReward] = useState(false);


    const form = useForm({
        initialValues: {
            issueURL: '',
            rewardPrice: 0,
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
            rewardPrice: (value: number) => {
                const isValid = value >= 20;

                if (!isValid) {
                    return 'Invalid reward price';
                }
            },
        },
    });

    async function createNewReward({ issueURL, rewardPrice }: { issueURL: string; rewardPrice: number }) {
        try {
            setIsCreatingReward(true);

            await clientCustomFetch(API_ROUTES.REWARDS.CREATE_FROM_ISSUE_URL(), {
                method: 'POST', body: {
                    reward: {
                        price: {
                            value: rewardPrice,
                            unit: "USD"
                        },
                    },
                    issue: {
                        url: issueURL
                    }
                }
            });

            notifications.show({
                title: 'Reward created sucesfully',
                message: "",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'teal',
                icon: <IconCheck />,
            })
            mutate(API_ROUTES.REWARDS.CREATED_BY_ME)
            onClose()
        } catch (error) {
            notifications.show({
                title: 'Error while trying to create the reward',
                message: "Please review that the issue is public and can be accessed by anyone",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'red',
                icon: <IconX />,
            })
        } finally {
            setIsCreatingReward(false);
        }
    }

    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            size={'xl'}
            title={<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'ce' }}><IconDiamond size={16} color="teal" /> Create a new reward on issue</div>}
            closeOnEscape={true}
            closeOnClickOutside={false}
            withCloseButton={true}

        >
            <form onSubmit={form.onSubmit(createNewReward)}>
                <Container size='xs'>
                    <TextInput
                        withAsterisk
                        label="Issue URL"
                        placeholder="https://github.com/Opire/docs/issues/2"
                        key='issueURL'
                        required
                        {...form.getInputProps('issueURL')}
                    />

                    <Space h='1rem' />

                    <NumberInput
                        withAsterisk
                        label="Reward price"
                        placeholder="Dollars"
                        prefix="$"
                        min={20}
                        key='rewardPrice'
                        required
                        {...form.getInputProps('rewardPrice')}
                    />
                </Container>

                <Space h='1rem' />

                <Group justify="flex-end" mt="md">
                    <Button
                        type="submit"
                        variant="gradient"
                        size="md"
                        loading={isCreatingReward}
                    >
                        Submit
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}
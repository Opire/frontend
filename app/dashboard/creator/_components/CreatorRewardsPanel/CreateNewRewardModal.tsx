import { Button, Container, Group, Modal, NumberInput, Space, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { useForm } from "@mantine/form";
import { IconCheck, IconDiamond, IconX } from "@tabler/icons-react";
import { clientCustomFetch } from "../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../constants";
import { notifications } from "@mantine/notifications";

interface CreateNewRewardModalProps {
    isOpened: boolean;
    onClose: () => void;
    prefilledIssueURL?: string;
    onNewRewardCreated?: () => void;
}

export const CreateNewRewardModal: FC<CreateNewRewardModalProps> = ({
    isOpened,
    onClose,
    prefilledIssueURL,
    onNewRewardCreated = () => { },
}) => {
    const [isCreatingReward, setIsCreatingReward] = useState(false);

    const form = useForm({
        initialValues: {
            issueURL: prefilledIssueURL ?? "",
            rewardPrice: 0,
        },
        validate: {
            issueURL: (value: string) => {
                let validURL;

                try {
                    validURL = new URL(value);
                } catch (_) {
                    return "Invalid issue URL";
                }
                const isValid = validURL.protocol === "http:" || validURL.protocol === "https:";

                if (!isValid) {
                    return "Invalid issue URL";
                }
            },
            rewardPrice: (value: number) => {
                const isValid = value >= 20;

                if (!isValid) {
                    return "Invalid reward price. Rewards start at $20";
                }
            },
        },
    });

    async function createNewReward ({ issueURL, rewardPrice }: { issueURL: string; rewardPrice: number }) {
        try {
            setIsCreatingReward(true);

            await clientCustomFetch(API_ROUTES.REWARDS.CREATE_FROM_ISSUE_URL(), {
                method: "POST",
                body: {
                    reward: {
                        price: {
                            value: rewardPrice,
                            unit: "USD",
                        },
                    },
                    issue: {
                        url: issueURL,
                    },
                },
            });

            notifications.show({
                title: "Reward created successfully",
                message: "",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "teal",
                icon: <IconCheck />,
            });

            setTimeout(() => {
                onNewRewardCreated();
                setIsCreatingReward(false);
            }, 500);

            onClose();
        } catch (error) {
            notifications.show({
                title: "Error while trying to create the reward",
                message: "Please review that the issue is public and can be accessed by anyone",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "red",
                icon: <IconX />,
            });
            setIsCreatingReward(false);
        }
    }

    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            size={"xl"}
            title={<div style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center" }}><IconDiamond size={16} color="teal" /><span>Create a new reward on issue</span></div>}
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
                        disabled={prefilledIssueURL !== undefined}
                        {...form.getInputProps("issueURL")}
                    />

                    <Space h='1rem' />

                    <NumberInput
                        withAsterisk
                        label="Reward price"
                        placeholder="Dollars"
                        prefix="$"
                        min={0}
                        key='rewardPrice'
                        required
                        {...form.getInputProps("rewardPrice")}
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
                        Create
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};

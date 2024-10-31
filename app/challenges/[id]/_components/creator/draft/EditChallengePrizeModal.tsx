import {
    Blockquote,
    Button,
    Container,
    Grid,
    Group,
    Modal,
    NumberInput,
    Space,
    Switch,
    TagsInput,
} from "@mantine/core";
import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "@mantine/form";
import {
    IconInfoCircle,
    IconInfoHexagon,
    IconTrophy,
} from "@tabler/icons-react";
import {
    ChallengePrizePrimitive,
    EMPTY_CHALLENGE_PRIZE_AMOUNT,
} from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import {
    getChallengePrizeMaxPosition,
    getChallengePrizeMinPosition,
    isPrimitiveSpecificPositionPrize,
    isPrimitiveThresholdPrize,
    isPrimitiveThresholdWithoutLimitPrize,
} from "../../../../../_utils/challengePrizes";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { getPriceInUSD } from "../../../../../_utils/formatPrice";

interface EditChallengePrizeModalProps {
    prize: ChallengePrizePrimitive;
    canPrizeBeDowngraded?: boolean;
    otherPrizes: ChallengePrizePrimitive[];
    isOpened: boolean;
    onClose: () => void;
    onPrizeUpdated: (updatedPrize: ChallengePrizePrimitive) => void;
}

export const EditChallengePrizeModal: FC<EditChallengePrizeModalProps> = ({
    prize,
    canPrizeBeDowngraded = true,
    otherPrizes,
    isOpened,
    onClose,
    onPrizeUpdated,
}) => {
    const [isCheckingPrize, setIsCheckingPrize] = useState(false);
    const [prizeInvalidReason, setPrizeInvalidReason] = useState<string | null>(
        null
    );
    const isPrizeFilled = Boolean(prize.amount) || prize.benefits.length > 0;
    const isPrizeValid = prizeInvalidReason === null && isPrizeFilled;
    const isPrizeForSpecificPosition = isPrimitiveSpecificPositionPrize(prize)

    const form = useForm<ChallengePrizePrimitive>({
        initialValues: {
            ...prize,
            amount: prize.amount ? {
                unit: "USD",
                value: getPriceInUSD(prize.amount),
            } : null
        },
        onValuesChange: (values) => {
            checkIsPrizeValid(values);
        },
    });

    const prizeAffectedPositionsDescription = useMemo(() => {
        const baseMessage = "This prize will be given";
        const prize = form.getValues();

        if (isPrimitiveSpecificPositionPrize(prize)) {
            return `${baseMessage} to the winner that ends in the position ${getChallengePrizeMinPosition(
                prize
            )}`;
        }

        if (isPrimitiveThresholdPrize(prize)) {
            return `${baseMessage} to the winners that end in the positions ${getChallengePrizeMinPosition(
                prize
            )} ~ ${getChallengePrizeMaxPosition(prize)}`;
        }

        if (isPrimitiveThresholdWithoutLimitPrize(prize)) {
            return `${baseMessage} to the winners that end in the position ${getChallengePrizeMinPosition(
                prize
            )} and onwards`;
        }

        return null;
    }, [form.getValues()]);

    async function updatePrize(newPrize: ChallengePrizePrimitive) {
        onPrizeUpdated(newPrize);
        onClose();
    }

    async function checkIsPrizeValid(newPrize: ChallengePrizePrimitive) {
        try {
            setIsCheckingPrize(true);

            await clientCustomFetch(
                API_ROUTES.CHALLENGES.CHECK_DRAFT_PRIZES(),
                {
                    method: "POST",
                    body: {
                        challenge: {
                            configuration: {
                                prizes: [...otherPrizes, newPrize],
                            },
                        },
                    },
                    avoidNotificationOnError: true,
                    onError: (error) => {
                        setPrizeInvalidReason(error.error);
                    },
                }
            );

            setPrizeInvalidReason(null);
        } catch (error) {
            // Do nothing
        } finally {
            setIsCheckingPrize(false);
        }
    }

    // Reset initial values when modal open
    useEffect(() => {
        if (isOpened) {
            form.setValues({
                ...prize,
                amount: prize.amount ? {
                    unit: "USD",
                    value: getPriceInUSD(prize.amount),
                } : null
            });
        }
    }, [isOpened]);

    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            size={"xl"}
            title={
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconTrophy size={16} color="teal" />
                    <span>Edit prize amount and benefits</span>
                </div>
            }
            closeOnEscape={true}
            closeOnClickOutside={false}
            withCloseButton={true}
        >
            <form onSubmit={form.onSubmit(updatePrize)}>
                <Container size="xs">
                    <Grid h={"100%"} gutter={"1rem"}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <NumberInput
                                label="Prize amount"
                                placeholder={
                                    isPrizeForSpecificPosition
                                        ? "Amount to pay to every approved participant"
                                        : "Amount to pay to the participant once approved"
                                }
                                prefix="$"
                                key={form.key("amount.value")}
                                min={!canPrizeBeDowngraded && prize.amount ? getPriceInUSD(prize.amount) : 0}
                                {...form.getInputProps("amount.value")}
                                onChange={(value) =>
                                    form.setFieldValue("amount", value ? {
                                        unit: "USD",
                                        value: +value,
                                    } : null)
                                }
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Switch
                                label="Prize for only one participant"
                                labelPosition="left"
                                mt="xl"
                                checked={isPrizeForSpecificPosition}
                                disabled={true}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12 }}>
                            <TagsInput
                                label="Benefits (non-monetary prizes)"
                                placeholder={'Press Enter to add a benefit'}
                                description="Add up to 10"
                                maxTags={10}
                                key={form.key("benefits")}
                                {...form.getInputProps("benefits")}
                            />
                        </Grid.Col>

                        {isPrizeForSpecificPosition && (
                            <Grid.Col span={{ base: 12 }}>
                                <NumberInput
                                    label="Winner's position in the leaderboard after receiving this prize"
                                    key={form.key("position")}
                                    {...form.getInputProps("position")}
                                    disabled={true}
                                />
                            </Grid.Col>
                        )}

                        {!isPrizeForSpecificPosition && (
                            <>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <NumberInput
                                        label="Initial position in the leaderboard"
                                        key={form.key("fromPosition")}
                                        {...form.getInputProps("fromPosition")}
                                        disabled={true}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <NumberInput
                                        label="Final position in the leaderboard"
                                        key={form.key("toPosition")}
                                        {...form.getInputProps("toPosition")}
                                        disabled={true}
                                    />
                                </Grid.Col>
                            </>
                        )}
                    </Grid>

                    {prizeAffectedPositionsDescription &&
                        !prizeInvalidReason && (
                            <Blockquote
                                color="blue"
                                icon={<IconInfoCircle />}
                                mt="xl"
                            >
                                {prizeAffectedPositionsDescription}
                            </Blockquote>
                        )}

                    {!prizeAffectedPositionsDescription && (
                        <Blockquote
                            color="yellow"
                            icon={<IconInfoHexagon />}
                            mt="xl"
                        >
                            This prize can't have any possible winners.
                        </Blockquote>
                    )}

                    {prizeInvalidReason && (
                        <Blockquote
                            color="yellow"
                            icon={<IconInfoHexagon />}
                            mt="xl"
                        >
                            {prizeInvalidReason}
                        </Blockquote>
                    )}
                </Container>

                <Space h="1rem" />

                <Group justify="flex-end" mt="md">
                    <Button
                        type="submit"
                        variant="gradient"
                        size="md"
                        loading={isCheckingPrize}
                        disabled={isCheckingPrize || !isPrizeValid}
                    >
                        Edit prize
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};

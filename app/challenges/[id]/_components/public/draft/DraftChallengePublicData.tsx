import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC, useMemo } from "react";
import React from "react";
import { ChallengePrizePrimitive } from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import {
    getChallengePrizeMaxPosition,
    getChallengePrizeMinPosition,
    isPrimitiveSpecificPositionPrize,
    isPrimitiveThresholdPrize,
    isPrimitiveThresholdWithoutLimitPrize,
    sortPrizes,
} from "../../../../../_utils/challengePrizes";
import {
    Badge,
    Box,
    Button,
    Card,
    Center,
    Checkbox,
    Fieldset,
    Flex,
    Grid,
    NumberInput,
    Space,
    Table,
    Text,
    Textarea,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { formatPrice } from "../../../../../_utils/formatPrice";
import { formatDateTime } from "../../../../../_utils/formatDate";
import { IconCircleCheckFilled, IconLineDashed } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";

interface DraftChallengePublicDataProps {
    challenge: ChallengePrimitive;
}

export const DraftChallengePublicData: FC<DraftChallengePublicDataProps> = ({
    challenge,
}) => {

    const prizes = useMemo(
        () => sortPrizes(challenge.configuration.prizes),
        [challenge]
    );


    function previewPublishedChallenge() {
        window.open(`/challenges/${challenge.id}/preview`, '_blank')?.focus();
    }

    return (
        <>
            <section style={{ height: "auto" }}>
                <Center>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            marginRight: "1rem",
                        }}
                    >
                        🚧 Challenge under construction
                    </Text>

                    <Tooltip
                        label={`Updated at ${formatDateTime(
                            challenge
                                ? new Date(challenge.updatedAt)
                                : new Date()
                        )}`}
                    >
                        <IconCircleCheckFilled size={24} />
                    </Tooltip>
                </Center>

                <Box style={{ padding: "0 2rem" }}>
                    <form>
                        <Grid h={"100%"} gutter={"2rem"}>
                            <Grid.Col span={{ base: 12 }}>
                                <TextInput
                                    label="Title"
                                    description="Descriptive title of the challenge"
                                    value={challenge.title}
                                    disabled={true}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <DatePickerInput
                                    label="Deadline"
                                    description="The challenge will be automatically closed on this date"
                                    value={
                                        challenge.configuration.deadline
                                            ? new Date(
                                                challenge.configuration.deadline
                                            )
                                            : null
                                    }
                                    disabled={true}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <NumberInput
                                    label="Limit of participations"
                                    description="Will take into account both approved and pending of approval"
                                    value={
                                        challenge.configuration
                                            .limitOfParticipations ?? undefined
                                    }
                                    disabled={true}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <Checkbox
                                    label="Allow multiple participations per user"
                                    description="If allowed, you may want to limit the number of participations to avoid facing an unmanageable amount of them"
                                    checked={
                                        challenge.configuration
                                            .allowMultipleParticipationsPerUser ??
                                        false
                                    }
                                    disabled={true}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12 }} mt="1rem">
                                <Card withBorder shadow="md">
                                    <Center>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: "1.4rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Prizes
                                        </Text>
                                    </Center>

                                    <Space h={"1rem"} />

                                    <Center>
                                        <Table.ScrollContainer minWidth={400}>
                                            <Table verticalSpacing="md" highlightOnHover>
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th ta={"center"}>
                                                            Position
                                                        </Table.Th>
                                                        <Table.Th ta={"center"}>
                                                            Amount
                                                        </Table.Th>
                                                        <Table.Th ta={"center"}>
                                                            Benefits
                                                        </Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>

                                                <Table.Tbody ta={"center"}>
                                                    {prizes.map(
                                                        (prize, index) => (
                                                            <Table.Tr
                                                                key={index}
                                                            >
                                                                <PrizeRow
                                                                    prize={
                                                                        prize
                                                                    }
                                                                />
                                                            </Table.Tr>
                                                        )
                                                    )}
                                                </Table.Tbody>
                                            </Table>
                                        </Table.ScrollContainer>
                                    </Center>
                                </Card>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12 }}>
                                <Fieldset legend="Challenge description">
                                    <Grid h={"100%"} gutter={"2rem"}>
                                        <Grid.Col span={{ base: 12 }}>
                                            <Textarea
                                                label="Introduction / brief summary"
                                                description="Explain to the potential participants what this challenge is about"
                                                withAsterisk
                                                autosize
                                                minRows={4}
                                                value={
                                                    challenge.summary ??
                                                    undefined
                                                }
                                                disabled={true}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Main objetive"
                                                description="One-liner. What's the really important thing to do in this challenge?"
                                                withAsterisk
                                                autosize
                                                minRows={1}
                                                value={
                                                    challenge.mainObjetive ??
                                                    undefined
                                                }
                                                disabled={true}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Other objetives"
                                                description="Nice-to-have, or things to consider, but not the essence of the challenge"
                                                autosize
                                                minRows={1}
                                                value={
                                                    challenge.otherObjetives ??
                                                    undefined
                                                }
                                                disabled={true}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Requirements"
                                                description="What the participants need to do in order to have their solution considered as a potential winner"
                                                withAsterisk
                                                autosize
                                                minRows={4}
                                                value={
                                                    challenge.requirements ??
                                                    undefined
                                                }
                                                disabled={true}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Evaluation criteria"
                                                description="What will be taken into account to decide if a solution is approved and which prize does it deserve"
                                                withAsterisk
                                                autosize
                                                minRows={4}
                                                value={
                                                    challenge.evaluationCriteria ??
                                                    undefined
                                                }
                                                disabled={true}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Contact information"
                                                description={`Communication channels for participants to contact you in case of doubts, questions, feedback...`}
                                                withAsterisk
                                                autosize
                                                minRows={2}
                                                value={
                                                    challenge.contactInformation ??
                                                    undefined
                                                }
                                                disabled={true}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Additional comments"
                                                description="Anything you want to add in order to clarify any aspect of the challenge"
                                                autosize
                                                minRows={2}
                                                value={
                                                    challenge.additionalComments ??
                                                    undefined
                                                }
                                                disabled={true}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </Fieldset>
                            </Grid.Col>
                        </Grid>

                        <Space h={"2rem"} />
                    </form>
                </Box>

                <Space h={"1rem"} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: '1rem' }}>
                    <Button
                        onClick={previewPublishedChallenge}
                        variant="light"
                    >
                        Preview published version
                    </Button>
                    <Tooltip label="Only the creator of the challenge can publish it">
                        <Button
                            onClick={() => { }}
                            variant="gradient"
                            disabled={true}
                        >
                            Publish challenge
                        </Button>
                    </Tooltip>
                </div>
            </section>
        </>
    );
};

const PrizeRow: FC<{
    prize: ChallengePrizePrimitive;
}> = ({ prize }) => {
    const isSpecificPositionPrize = isPrimitiveSpecificPositionPrize(prize);
    const isThresholdPrize = isPrimitiveThresholdPrize(prize);
    const isThresholdWithoutLimitPrize =
        isPrimitiveThresholdWithoutLimitPrize(prize);

    return (
        <>
            <Table.Td>
                {isSpecificPositionPrize &&
                    `${getChallengePrizeMinPosition(prize)}`}
                {isThresholdPrize &&
                    `From ${getChallengePrizeMinPosition(
                        prize
                    )} to ${getChallengePrizeMaxPosition(prize)}`}
                {isThresholdWithoutLimitPrize &&
                    `From ${getChallengePrizeMinPosition(prize)} onwards`}
            </Table.Td>

            <Table.Td>
                {
                    prize.amount
                        ?
                        formatPrice(prize.amount)
                        :
                        <IconLineDashed />
                }
            </Table.Td>

            <Table.Td>
                <Flex gap={'xs'} display={'inline-flex'} mx={'1rem'}>
                    {
                        prize.benefits.length > 0 ?
                            prize.benefits.map((benefit) => (
                                <Badge
                                    key={benefit}
                                    variant="outline"
                                    color='gray'
                                    size='sm'
                                >
                                    {benefit}
                                </Badge>
                            )
                            )
                            :
                            <IconLineDashed />
                    }
                </Flex>
            </Table.Td>
        </>
    );
};

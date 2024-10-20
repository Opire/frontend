import { Button, Container, Flex, Group, Modal, Space, Text, Title } from "@mantine/core";
import { FC, useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { ChallengeParticipationPrimitive } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { useGetAvailableChallengePrizes } from "../../../../../../hooks/useGetAvailableChallengePrizes";
import { ChallengePrizePrimitive } from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import { formatPrice } from "../../../../../_utils/formatPrice";

interface PayChallengeParticipationModalProps {
    challenge: ChallengeDTO;
    participation: ChallengeParticipationPrimitive;
    isOpened: boolean;
    onClose: () => void;
    onParticipationPaid: () => void;
}

export const PayChallengeParticipationModal: FC<
    PayChallengeParticipationModalProps
> = ({
    challenge,
    participation,
    isOpened,
    onClose,
    onParticipationPaid,
}) => {
        const { availablePrizes } = useGetAvailableChallengePrizes({ challengeId: challenge.id, revalidateOnFocus: true });
        const [selectedPrize, setSelectedPrize] = useState<ChallengePrizePrimitive | null>(null);
        const canPrizesBePaid = challenge.canPrizesBePaid;

        const [isPayingParticipation, setIsPayingParticipation] = useState(false);

        const handleClose = () => {
            setSelectedPrize(null);
            onClose();
        }

        async function pay() {
            if (!selectedPrize) {
                return;
            }

            try {
                setIsPayingParticipation(true);

                const response = await clientCustomFetch(
                    API_ROUTES.PAYMENTS.LINK_TO_PAY_CHALLENGE_PRIZE(challenge.id),
                    {
                        method: "POST",
                        body: {
                            participation: {
                                id: participation.id,
                                prize: selectedPrize,
                            }
                        },
                    }
                );
                const responseData = await response.json();

                if (!responseData) {
                    throw new Error("Error while getting link to pay the participation");
                }

                window.open(responseData.url, "_blank");

                onParticipationPaid();
                setIsPayingParticipation(false);
                handleClose();
            } catch (error) {
                setIsPayingParticipation(false);
            }
        }

        return (
            <Modal
                centered={true}
                opened={isOpened}
                onClose={handleClose}
                title={
                    <Title size={"h3"}>
                        Pay participant
                    </Title>
                }
                size={"xl"}
                closeOnEscape={true}
                closeOnClickOutside={false}
                withCloseButton={true}
            >
                <Container size={'lg'}>
                    <Text>
                        After selecting the prize to pay, you will be redirected to a Stripe Checkout session where you can securely pay the participant. Your payment method won't be visible by the participant or even Opire.
                    </Text>

                    <Space h="1rem" />

                    <Flex gap={'1rem'} wrap={'wrap'}>
                        {availablePrizes.map((prize) => (
                            <Button
                                key={prize.amount.value}
                                onClick={() => setSelectedPrize(prize)}
                                variant={selectedPrize === prize ? "filled" : "outline"}
                                color={selectedPrize === prize ? "teal" : "gray"}
                            >
                                {formatPrice(prize.amount)}
                            </Button>
                        ))}
                    </Flex>

                    <Space h="2rem" />

                    <Group justify="space-between" mt="md">
                        <Button variant="subtle" size="md" onClick={handleClose}>
                            Go back
                        </Button>

                        <Button
                            variant="filled"
                            size="md"
                            loading={isPayingParticipation}
                            disabled={!canPrizesBePaid || !selectedPrize || isPayingParticipation}
                            onClick={pay}
                        >
                            Pay selected prize
                        </Button>
                    </Group>
                </Container>
            </Modal>
        );
    };

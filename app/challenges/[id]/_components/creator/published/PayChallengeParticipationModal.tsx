import {
  Badge,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Modal,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { FC, useState } from 'react';
import { clientCustomFetch } from '../../../../../_utils/clientCustomFetch';
import { API_ROUTES } from '../../../../../../constants';
import { ChallengeDTO } from '../../../../../_core/_primitives/ChallengePrimitive';
import { ChallengeParticipationPrimitive } from '../../../../../_core/_primitives/ChallengeParticipationPrimitive';
import { useGetAvailableChallengePrizes } from '../../../../../../hooks/useGetAvailableChallengePrizes';
import { ChallengePrizePrimitive } from '../../../../../_core/_primitives/ChallengePrizePrimitive';
import { formatPrice } from '../../../../../_utils/formatPrice';
import { useHover } from '@mantine/hooks';
import {
  isPrimitiveSpecificPositionPrize,
  isPrimitiveThresholdPrize,
  isPrimitiveThresholdWithoutLimitPrize,
} from '../../../../../_utils/challengePrizes';
import { getOrdinalPositionDescription } from '../../shared/utils';

interface PayChallengeParticipationModalProps {
  challenge: ChallengeDTO;
  participation: ChallengeParticipationPrimitive;
  isOpened: boolean;
  onClose: () => void;
  onParticipationPaid: () => void;
}

export const PayChallengeParticipationModal: FC<PayChallengeParticipationModalProps> = ({
  challenge,
  participation,
  isOpened,
  onClose,
  onParticipationPaid,
}) => {
  const { availablePrizes } = useGetAvailableChallengePrizes({
    challengeId: challenge.id,
    revalidateOnFocus: true,
  });
  const [selectedPrize, setSelectedPrize] = useState<ChallengePrizePrimitive | null>(null);
  const canPrizesBePaid = challenge.canPrizesBePaid;

  const [isPayingParticipation, setIsPayingParticipation] = useState(false);

  const handleClose = () => {
    setSelectedPrize(null);
    onClose();
  };

  async function pay() {
    if (!selectedPrize) {
      return;
    }

    try {
      setIsPayingParticipation(true);

      const response = await clientCustomFetch(
        API_ROUTES.PAYMENTS.LINK_TO_PAY_CHALLENGE_PRIZE(challenge.id),
        {
          method: 'POST',
          body: {
            participation: {
              id: participation.id,
              prize: selectedPrize,
            },
          },
        }
      );
      const responseData = await response.json();

      if (!responseData) {
        throw new Error('Error while getting link to pay the participation');
      }

      if (responseData.url) {
        window.open(responseData.url, '_blank');
      }

      setTimeout(() => {
        onParticipationPaid();
        setIsPayingParticipation(false);
        handleClose();
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsPayingParticipation(false);
    }
  }

  return (
    <Modal
      centered={true}
      opened={isOpened}
      onClose={handleClose}
      title={<Title size={'h3'}>Pay participant</Title>}
      size={'xl'}
      closeOnEscape={true}
      closeOnClickOutside={false}
      withCloseButton={true}
    >
      <Container size={'lg'}>
        <Text>Select the prize you want to pay to the participant.</Text>

        <Space h="1rem" />

        <Text>
          If the prize contains a monetary amount, you will be redirected to a Stripe Checkout
          session where you can securely pay the participant. Your payment method won&apos;t be
          visible by the participant or even Opire.
        </Text>

        <Space h="1rem" />

        <Text>
          If the prize contains benefits, the participant will be notified that they have won the
          prize but you will have to manually deliver it to them.
        </Text>

        <Space h="2rem" />

        <Grid style={{ justifyItems: 'center', alignItems: 'center' }}>
          {availablePrizes.map((prize, index) => (
            <Grid.Col key={index} span={'auto'} flex={1}>
              <PrizeCard
                prize={prize}
                isSelected={selectedPrize === prize}
                onSelect={() => setSelectedPrize(prize)}
              />
            </Grid.Col>
          ))}
        </Grid>

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

const PrizeCard: FC<{
  prize: ChallengePrizePrimitive;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ prize, isSelected, onSelect }) => {
  const { hovered, ref } = useHover();

  const isSpecificPositionPrize = isPrimitiveSpecificPositionPrize(prize);
  const isThresholdPrize = isPrimitiveThresholdPrize(prize);
  const isThresholdWithoutLimitPrize = isPrimitiveThresholdWithoutLimitPrize(prize);

  return (
    <Card
      ref={ref}
      withBorder
      radius={'lg'}
      shadow="md"
      p={'xl'}
      h={'100%'}
      w={'100%'}
      style={{
        transition: 'box-shadow 0.3s ease-in-out',
        boxShadow: hovered ? '0 4px 30px rgba(16, 152, 173, 0.5)' : undefined,
        cursor: 'pointer',
        border: isSelected ? '2px solid #10ACAD' : undefined,
        opacity: isSelected ? 1 : 0.75,
      }}
      onClick={onSelect}
    >
      <Center style={{ margin: 'auto 0', height: '100%' }}>
        <Flex direction={'column'} align={'center'} justify={'center'} h={'100%'}>
          <Text style={{ fontWeight: 700, fontSize: '1.6rem' }}>
            {isSpecificPositionPrize && `${getOrdinalPositionDescription(prize.position)} prize`}
            {isThresholdPrize &&
              `${getOrdinalPositionDescription(prize.fromPosition)} to ${getOrdinalPositionDescription(prize.toPosition)} prize`}
            {isThresholdWithoutLimitPrize &&
              `${getOrdinalPositionDescription(prize.fromPosition)} prize onwards`}
          </Text>

          {prize.amount && (
            <Text variant="gradient" style={{ fontWeight: 900, fontSize: '2.4rem' }}>
              {formatPrice(prize.amount)}
            </Text>
          )}

          {prize.benefits.length > 0 && (
            <>
              <Space h={'0.5rem'} />

              <Flex gap={'xs'} wrap={'wrap'}>
                {prize.benefits.map(benefit => (
                  <Badge key={benefit} variant="gradient">
                    {benefit}
                  </Badge>
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Center>
    </Card>
  );
};

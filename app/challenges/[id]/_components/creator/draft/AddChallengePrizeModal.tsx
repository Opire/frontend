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
} from '@mantine/core';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from '@mantine/form';
import { IconInfoCircle, IconInfoHexagon, IconTrophy } from '@tabler/icons-react';
import {
  CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE,
  ChallengePrizePrimitive,
  SpecificPositionPrizePrimitive,
  ThresholdPrizePrimitive,
  ThresholdWithoutLimitPrizePrimitive,
} from '../../../../../_core/_primitives/ChallengePrizePrimitive';
import {
  getChallengePrizeMaxPosition,
  getChallengePrizeMinPosition,
  isPrimitiveSpecificPositionPrize,
  isPrimitiveThresholdPrize,
  isPrimitiveThresholdWithoutLimitPrize,
} from '../../../../../_utils/challengePrizes';
import { clientCustomFetch } from '../../../../../_utils/clientCustomFetch';
import { API_ROUTES } from '../../../../../../constants';
import { getPriceInUSD } from '../../../../../_utils/formatPrice';

interface AddChallengePrizeModalProps {
  currentPrizes: ChallengePrizePrimitive[];
  isOpened: boolean;
  onClose: () => void;
  onNewPrize: (newPrize: ChallengePrizePrimitive) => void;
}

export const AddChallengePrizeModal: FC<AddChallengePrizeModalProps> = ({
  currentPrizes,
  isOpened,
  onClose,
  onNewPrize,
}) => {
  const [isCheckingPrize, setIsCheckingPrize] = useState(false);
  const [prizeInvalidReason, setPrizeInvalidReason] = useState<string | null>(null);
  const isPrizeValid = prizeInvalidReason === null;

  const [isPrizeForSpecificPosition, setIsPrizeForSpecificPosition] = useState(true);

  const lastPrize = useMemo(() => currentPrizes.at(-1), [currentPrizes]);
  const lastPrizeAmount = useMemo(
    () =>
      currentPrizes
        .slice()
        .reverse()
        .find(prize => prize.amount)?.amount ?? null,
    [currentPrizes]
  );

  const initialAvailablePosition = useMemo(() => {
    if (!lastPrize) {
      return 1;
    }

    if (isPrimitiveSpecificPositionPrize(lastPrize)) {
      return lastPrize.position + 1;
    }

    const lastPosition = (
      lastPrize as ThresholdPrizePrimitive | ThresholdWithoutLimitPrizePrimitive
    ).toPosition;

    if (!Number.isNaN(+lastPosition)) {
      return (lastPosition as number) + 1;
    }

    return 1;
  }, [lastPrize]);

  const form = useForm<ChallengePrizePrimitive>({
    initialValues: {
      amount: {
        unit: 'USD',
        value: lastPrizeAmount ? getPriceInUSD(lastPrizeAmount) - 1 : 1000,
      },
      benefits: [],
      position: initialAvailablePosition,
      fromPosition: undefined,
      toPosition: undefined,
    },
    onValuesChange: values => {
      checkIsPrizeValid(values);
    },
  });

  const newPrizeAffectedPositionsDescription = useMemo(() => {
    const baseMessage = 'This new prize will be given';
    const prize = form.getValues();

    if (isPrimitiveSpecificPositionPrize(prize)) {
      return `${baseMessage} to the winner that ends in the position ${getChallengePrizeMinPosition(prize)}`;
    }

    if (isPrimitiveThresholdPrize(prize)) {
      return `${baseMessage} to the winners that end in the positions ${getChallengePrizeMinPosition(prize)} ~ ${getChallengePrizeMaxPosition(prize)}`;
    }

    if (isPrimitiveThresholdWithoutLimitPrize(prize)) {
      return `${baseMessage} to the winners that end in the position ${getChallengePrizeMinPosition(prize)} and onwards`;
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getValues()]);

  function handleChangeIsPrizeForSpecificPosition(isChecked: boolean) {
    const values = form.getValues();
    const amount = values.amount;
    const benefits = values.benefits;

    if (isChecked) {
      form.setValues({
        amount,
        benefits,
        position: initialAvailablePosition,
        fromPosition: undefined,
        toPosition: undefined,
      } as SpecificPositionPrizePrimitive);
    } else {
      form.setValues({
        amount,
        benefits,
        position: undefined,
        fromPosition: initialAvailablePosition,
        toPosition: CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE,
      } as ThresholdWithoutLimitPrizePrimitive);
    }

    setIsPrizeForSpecificPosition(isChecked);
  }

  async function addNewPrize(newPrize: ChallengePrizePrimitive) {
    onNewPrize(newPrize);
    onClose();
  }

  async function checkIsPrizeValid(newPrize: ChallengePrizePrimitive) {
    try {
      setIsCheckingPrize(true);

      await clientCustomFetch(API_ROUTES.CHALLENGES.CHECK_DRAFT_PRIZES(), {
        method: 'POST',
        body: {
          challenge: {
            configuration: {
              prizes: [...currentPrizes, newPrize],
            },
          },
        },
        avoidNotificationOnError: true,
        onError: error => {
          setPrizeInvalidReason(error.error);
        },
      });

      setPrizeInvalidReason(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        amount: {
          unit: 'USD',
          value: lastPrizeAmount ? getPriceInUSD(lastPrizeAmount) - 1 : 1000,
        },
        benefits: [],
        position: initialAvailablePosition,
        fromPosition: undefined,
        toPosition: undefined,
      } as SpecificPositionPrizePrimitive);

      setIsPrizeForSpecificPosition(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  return (
    <Modal
      centered={true}
      opened={isOpened}
      onClose={onClose}
      size={'xl'}
      title={
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconTrophy size={16} color="teal" />
          <span>Add a new prize to the challenge</span>
        </div>
      }
      closeOnEscape={true}
      closeOnClickOutside={false}
      withCloseButton={true}
    >
      <form onSubmit={form.onSubmit(addNewPrize)}>
        <Container size="xs">
          <Grid h={'100%'} gutter={'1rem'}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput
                label="Prize amount"
                placeholder={
                  isPrizeForSpecificPosition
                    ? 'Amount to pay to every approved participant'
                    : 'Amount to pay to the participant once approved'
                }
                prefix="$"
                key={form.key('amount.value')}
                min={0}
                max={lastPrizeAmount ? getPriceInUSD(lastPrizeAmount) - 1 : undefined}
                {...form.getInputProps('amount.value')}
                onChange={value =>
                  form.setFieldValue(
                    'amount',
                    value
                      ? {
                          unit: 'USD',
                          value: +value,
                        }
                      : null
                  )
                }
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Switch
                label="Prize for only one participant"
                labelPosition="left"
                mt="xl"
                checked={isPrizeForSpecificPosition}
                onChange={event =>
                  handleChangeIsPrizeForSpecificPosition(event.currentTarget.checked)
                }
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <TagsInput
                label="Benefits (non-monetary prizes)"
                placeholder={'Press Enter to add a benefit'}
                description="Add up to 10"
                maxTags={10}
                key={form.key('benefits')}
                {...form.getInputProps('benefits')}
              />
            </Grid.Col>

            {isPrizeForSpecificPosition && (
              <Grid.Col span={{ base: 12 }}>
                <NumberInput
                  label="Winner's position in the leaderboard after receiving this prize"
                  key={form.key('position')}
                  min={1}
                  {...form.getInputProps('position')}
                />
              </Grid.Col>
            )}

            {!isPrizeForSpecificPosition && (
              <>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <NumberInput
                    label="Initial position in the leaderboard"
                    key={form.key('fromPosition')}
                    {...form.getInputProps('fromPosition')}
                    min={1}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <NumberInput
                    label="Final position in the leaderboard"
                    key={form.key('toPosition')}
                    {...form.getInputProps('toPosition')}
                    onChange={value =>
                      form.setFieldValue(
                        'toPosition',
                        value && !Number.isNaN(+value)
                          ? +value
                          : CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE
                      )
                    }
                    min={
                      (form.getValues() as any).fromPosition
                        ? (form.getValues() as any).fromPosition + 1
                        : 1
                    }
                  />
                </Grid.Col>
              </>
            )}
          </Grid>

          {newPrizeAffectedPositionsDescription && !prizeInvalidReason && (
            <Blockquote color="blue" icon={<IconInfoCircle />} mt="xl">
              {newPrizeAffectedPositionsDescription}
            </Blockquote>
          )}

          {!newPrizeAffectedPositionsDescription && (
            <Blockquote color="yellow" icon={<IconInfoHexagon />} mt="xl">
              This prize cannnot have any possible winners.
            </Blockquote>
          )}

          {prizeInvalidReason && (
            <Blockquote color="yellow" icon={<IconInfoHexagon />} mt="xl">
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
            Add prize
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

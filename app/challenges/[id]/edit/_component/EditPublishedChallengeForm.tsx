import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Text,
  em,
  Grid,
  NumberInput,
  Space,
  TextInput,
  Table,
  Flex,
  Badge,
  Tooltip,
  ActionIcon,
  Fieldset,
  Textarea,
} from '@mantine/core';
import { FC, useMemo, useState } from 'react';
import {
  ChallengeDTO,
  EditPublishedChallengeDTO,
} from '../../../../_core/_primitives/ChallengePrimitive';
import {
  getChallengePrizeMaxPosition,
  getChallengePrizeMinPosition,
  isPrimitiveSpecificPositionPrize,
  isPrimitiveThresholdPrize,
  isPrimitiveThresholdWithoutLimitPrize,
  sortPrizes,
} from '../../../../_utils/challengePrizes';
import { clientCustomFetch } from '../../../../_utils/clientCustomFetch';
import { API_ROUTES } from '../../../../../constants';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconLineDashed, IconPlus, IconTrash } from '@tabler/icons-react';
import { ChallengePrizePrimitive } from '../../../../_core/_primitives/ChallengePrizePrimitive';
import { EditChallengePrizeModal } from '../../_components/creator/draft/EditChallengePrizeModal';
import { DatePickerInput } from '@mantine/dates';
import { AddChallengePrizeModal } from '../../_components/creator/draft/AddChallengePrizeModal';
import { formatPrice } from '../../../../_utils/formatPrice';
import { useGetChallenge } from '../../../../../hooks/useGetChallenge';

interface EditPublishedChallengeFormProps {
  challenge: ChallengeDTO;
}

export const EditPublishedChallengeForm: FC<EditPublishedChallengeFormProps> = ({
  challenge: initialChallenge,
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { challenge } = useGetChallenge({
    initialChallenge,
    revalidateOnFocus: true,
  });

  const [isModalToAddPrizeOpen, { close: closeAddPrizeModal, open: openAddPrizeModal }] =
    useDisclosure();

  const [isModalToEditPrizeOpen, { close: closeEditPrizeModal, open: openEditPrizeModal }] =
    useDisclosure();

  const [isUpdatingChallenge, setIsUpdatingChallenge] = useState(false);
  const [indexPrizeToUpdate, setIndexPrizeToUpdate] = useState<number | null>(null);

  const form = useForm<EditPublishedChallengeDTO>({
    mode: 'uncontrolled',
    initialValues: {
      configuration: challenge.configuration,
    },
  });

  const prizes = useMemo(
    () => sortPrizes(form.getValues().configuration.prizes),
    [form.getValues()]
  );

  const { prizeToUpdate, otherPrizes } = useMemo(() => {
    if (indexPrizeToUpdate === null) {
      return { prizeToUpdate: null, otherPrizes: prizes };
    }

    const prizeToUpdate = prizes[indexPrizeToUpdate];
    const otherPrizes = prizes.filter((_, i) => i !== indexPrizeToUpdate);

    return { prizeToUpdate, otherPrizes };
  }, [prizes, indexPrizeToUpdate]);

  const isPrizeToUpdateANewPrize = useMemo(() => {
    if (!indexPrizeToUpdate) {
      return false;
    }

    return challenge.configuration.prizes[indexPrizeToUpdate] === undefined;
  }, [indexPrizeToUpdate]);

  async function updatePublishedChallenge() {
    setIsUpdatingChallenge(true);

    try {
      await clientCustomFetch(API_ROUTES.CHALLENGES.BY_ID(challenge.id), {
        method: 'PUT',
        body: {
          challenge: form.getValues(),
        },
      });

      setTimeout(() => {
        notifications.show({
          title: 'Challenge edited successfully',
          message: 'The changes have been saved and are now visible to everyone',
          withBorder: true,
          withCloseButton: true,
          autoClose: 10_000,
          color: 'teal',
          icon: <IconCheck />,
        });

        mutate(API_ROUTES.CHALLENGES.BY_ID(challenge.id));
        setIsUpdatingChallenge(false);
        goBackToPublishedChallenge();
      }, 1000);
    } catch (error) {
      console.error(error);

      setIsUpdatingChallenge(false);
    }
  }

  function onNewPrize(newPrize: ChallengePrizePrimitive) {
    const newPrizes = [...form.getValues().configuration.prizes, newPrize];
    form.setFieldValue('configuration.prizes', sortPrizes(newPrizes));
  }

  function onPrizeUpdated(updatedPrize: ChallengePrizePrimitive) {
    const newPrizes = [
      ...form.getValues().configuration.prizes.filter((_, i) => i !== indexPrizeToUpdate),
      updatedPrize,
    ];

    form.setFieldValue('configuration.prizes', sortPrizes(newPrizes));
    setIndexPrizeToUpdate(null);
    closeEditPrizeModal();
  }

  function onRemovePrize(indexPrizeToRemove: number) {
    const newPrizes = form
      .getValues()
      .configuration.prizes.filter((_, i) => i !== indexPrizeToRemove);
    form.setFieldValue('configuration.prizes', sortPrizes(newPrizes));
  }

  function onEditPrize(indexPrizeToUpdate: number) {
    setIndexPrizeToUpdate(indexPrizeToUpdate);
    openEditPrizeModal();
  }

  function goBackToPublishedChallenge() {
    router.push(`/challenges/${challenge.id}`);
  }

  return (
    <>
      <section style={{ height: 'auto' }}>
        <Center>
          <Text
            style={{
              textAlign: 'center',
              fontSize: isMobile ? '1.4rem' : '2rem',
              fontWeight: 'bold',
              marginRight: '1rem',
            }}
          >
            Edit published challenge
          </Text>
        </Center>

        <Box style={{ padding: '1rem 2rem' }}>
          <form>
            <Grid h={'100%'} gutter={'2rem'}>
              <Grid.Col span={{ base: 12 }}>
                <TextInput
                  label="Title"
                  description="Descriptive title of the challenge"
                  value={challenge.title}
                  disabled
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <DatePickerInput
                  label="Deadline"
                  description="The challenge will be automatically closed on this date"
                  clearable={true}
                  key={form.key('configuration.deadline')}
                  value={
                    form.getValues().configuration.deadline
                      ? new Date(form.getValues().configuration.deadline as number)
                      : null
                  }
                  onChange={value =>
                    form.setFieldValue('configuration.deadline', value ? value.getTime() : null)
                  }
                  minDate={
                    challenge.configuration.deadline
                      ? new Date(challenge.configuration.deadline)
                      : undefined
                  }
                  disabled={!challenge.configuration.deadline}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <NumberInput
                  label="Limit of participations"
                  description="Will take into account both approved and pending of approval"
                  key={form.key('configuration.limitOfParticipations')}
                  {...form.getInputProps('configuration.limitOfParticipations')}
                  min={challenge.configuration.limitOfParticipations ?? 0}
                  disabled={!challenge.configuration.limitOfParticipations}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }} style={{ alignSelf: 'center' }}>
                <Checkbox
                  label="Allow multiple participations per user"
                  description="If allowed, you may want to limit the number of participations to avoid facing an unmanageable amount of them"
                  checked={form.getValues().configuration.allowMultipleParticipationsPerUser}
                  onChange={event =>
                    form.setFieldValue(
                      'configuration.allowMultipleParticipationsPerUser',
                      event.target.checked
                    )
                  }
                  disabled={challenge.configuration.allowMultipleParticipationsPerUser}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12 }} mt="1rem">
                <Card withBorder shadow="md">
                  <Center>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Prizes
                    </Text>
                  </Center>

                  <Space h={'1rem'} />

                  <Center>
                    <Button
                      leftSection={<IconPlus size={18} />}
                      variant="light"
                      onClick={openAddPrizeModal}
                    >
                      Add prize
                    </Button>

                    <AddChallengePrizeModal
                      currentPrizes={prizes}
                      isOpened={isModalToAddPrizeOpen}
                      onClose={closeAddPrizeModal}
                      onNewPrize={onNewPrize}
                    />
                  </Center>

                  <Space h={'1rem'} />

                  <Center>
                    <Table.ScrollContainer minWidth={400}>
                      <Table verticalSpacing="md" highlightOnHover>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th ta={'center'}>Position</Table.Th>
                            <Table.Th ta={'center'}>Amount</Table.Th>
                            <Table.Th ta={'center'}>Benefits</Table.Th>
                          </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody ta={'center'}>
                          {prizes.map((prize, index) => (
                            <Table.Tr key={index}>
                              <PrizeRow
                                prize={prize}
                                onRemovePrize={() => onRemovePrize(index)}
                                onEditPrize={() => onEditPrize(index)}
                                isLastRow={index + 1 === prizes.length}
                                isNewPrize={challenge.configuration.prizes[index] === undefined}
                              />
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>
                  </Center>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12 }}>
                <Fieldset legend="Challenge description">
                  <Grid h={'100%'} gutter={'2rem'}>
                    <Grid.Col span={{ base: 12 }}>
                      <Textarea
                        label="Introduction / brief summary"
                        description="Explain to the potential participants what this challenge is about"
                        autosize
                        minRows={4}
                        value={challenge.summary ?? ''}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Textarea
                        label="Main objetive"
                        description="One-liner. What's the really important thing to do in this challenge?"
                        autosize
                        minRows={1}
                        value={challenge.mainObjetive ?? ''}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Textarea
                        label="Other objetives"
                        description="Nice-to-have, or things to consider, but not the essence of the challenge"
                        autosize
                        minRows={1}
                        value={challenge.otherObjetives ?? ''}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Textarea
                        label="Requirements"
                        description="What the participants need to do in order to have their solution considered as a potential winner"
                        autosize
                        minRows={4}
                        value={challenge.requirements ?? ''}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Textarea
                        label="Evaluation criteria"
                        description="What will be taken into account to decide if a solution is approved and which prize does it deserve"
                        autosize
                        minRows={4}
                        value={challenge.evaluationCriteria ?? ''}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Textarea
                        label="Contact information"
                        description={
                          'Communication channels for participants to contact you in case of doubts, questions, feedback...'
                        }
                        autosize
                        minRows={2}
                        value={challenge.contactInformation ?? ''}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Textarea
                        label="Additional comments"
                        description="Anything you want to add in order to clarify any aspect of the challenge"
                        autosize
                        minRows={2}
                        value={challenge.additionalComments ?? ''}
                        disabled
                      />
                    </Grid.Col>
                  </Grid>
                </Fieldset>
              </Grid.Col>
            </Grid>

            <Space h={'2rem'} />
          </form>
        </Box>

        <Space h={'1rem'} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
          <Button onClick={goBackToPublishedChallenge} variant="subtle" size="md">
            Go back
          </Button>

          <Button
            onClick={updatePublishedChallenge}
            variant="gradient"
            size="md"
            disabled={isUpdatingChallenge}
            loading={isUpdatingChallenge}
          >
            Save changes
          </Button>
        </div>
      </section>

      {prizeToUpdate && (
        <EditChallengePrizeModal
          prize={prizeToUpdate}
          canPrizeBeDowngraded={isPrizeToUpdateANewPrize}
          otherPrizes={otherPrizes}
          isOpened={isModalToEditPrizeOpen}
          onClose={closeEditPrizeModal}
          onPrizeUpdated={onPrizeUpdated}
        />
      )}
    </>
  );
};

const PrizeRow: FC<{
  prize: ChallengePrizePrimitive;
  onRemovePrize: () => void;
  onEditPrize: () => void;
  isLastRow: boolean;
  isNewPrize: boolean;
}> = ({ prize, onRemovePrize, onEditPrize, isLastRow, isNewPrize }) => {
  const isSpecificPositionPrize = isPrimitiveSpecificPositionPrize(prize);
  const isThresholdPrize = isPrimitiveThresholdPrize(prize);
  const isThresholdWithoutLimitPrize = isPrimitiveThresholdWithoutLimitPrize(prize);

  return (
    <>
      <Table.Td>
        {isSpecificPositionPrize && `${getChallengePrizeMinPosition(prize)}`}
        {isThresholdPrize &&
          `From ${getChallengePrizeMinPosition(prize)} to ${getChallengePrizeMaxPosition(prize)}`}
        {isThresholdWithoutLimitPrize && `From ${getChallengePrizeMinPosition(prize)} onwards`}
      </Table.Td>

      <Table.Td>{prize.amount ? formatPrice(prize.amount) : <IconLineDashed />}</Table.Td>

      <Table.Td>
        <Flex gap={'xs'} display={'inline-flex'} mx={'1rem'}>
          {prize.benefits.length > 0 ? (
            prize.benefits.map(benefit => (
              <Badge key={benefit} variant="outline" color="gray" size="sm">
                {benefit}
              </Badge>
            ))
          ) : (
            <IconLineDashed />
          )}
        </Flex>
      </Table.Td>

      <Table.Td>
        <Flex gap={'0.6rem'}>
          <Tooltip label="Edit prize">
            <ActionIcon variant="light" aria-label="Edit prize" color="blue" onClick={onEditPrize}>
              <IconEdit size={18} />
            </ActionIcon>
          </Tooltip>

          {isLastRow && isNewPrize && (
            <Tooltip label="Remove prize">
              <ActionIcon
                variant="light"
                aria-label="Remove prize"
                color="red"
                onClick={onRemovePrize}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Tooltip>
          )}
        </Flex>
      </Table.Td>
    </>
  );
};

import { Center, Card, Title, Space, Modal, Flex, Button, Text } from '@mantine/core';
import { useHover, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconX, IconTrophy, IconFile, IconRecycle } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { API_ROUTES } from '../../../../../constants';
import { useTriggerCallbackOnQueryParamFirstMatch } from '../../../../../hooks/useTriggerCallbackOnQueryParamFirstMatch';
import { UserAuthDTO } from '../../../../_core/_dtos/UserAuthDTO';
import {
  ChallengePrimitive,
  CreateChallengeDTO,
} from '../../../../_core/_primitives/ChallengePrimitive';
import { clientCustomFetch } from '../../../../_utils/clientCustomFetch';
import { redirectAfterLogin } from '../../../../_utils/redirectAfterLogin';
import { useRouter } from 'next/navigation';

export const NewChallengeSection: FC<{
  challenge: ChallengePrimitive;
  userAuth: UserAuthDTO | null;
}> = ({ challenge, userAuth }) => {
  const router = useRouter();
  const { hovered, ref } = useHover();
  const [
    isModalForNewChallenge,
    { open: openModalForNewChallenge, close: closeModalForNewChallenge },
  ] = useDisclosure(false);
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);

  useTriggerCallbackOnQueryParamFirstMatch({
    queryParamKey: 'create-challenge',
    callback: openModalForNewChallenge,
  });

  function handleClickCreateChallenge() {
    if (userAuth) {
      openModalForNewChallenge();

      return;
    }

    redirectAfterLogin.prepareNextRedirection(`/challenges/${challenge.id}?create-challenge=true`);
    router.push('?login=true');
  }

  function createNewEmtpyChallenge() {
    createNewChallenge();
  }

  function createNewChallengeUsingCurrentAsTemplate() {
    createNewChallenge({
      title: `Copy of: ${challenge.title}`,
      summary: challenge.summary,
      mainObjetive: challenge.mainObjetive,
      otherObjetives: challenge.otherObjetives,
      requirements: challenge.requirements,
      evaluationCriteria: challenge.evaluationCriteria,
      contactInformation: challenge.contactInformation,
      additionalComments: challenge.additionalComments,
      configuration: challenge.configuration,
    });
  }

  async function createNewChallenge(params?: CreateChallengeDTO) {
    try {
      setIsCreatingChallenge(true);

      const body = params
        ? {
            challenge: params,
          }
        : undefined;

      const response = await clientCustomFetch(API_ROUTES.CHALLENGES.CREATE(), {
        method: 'POST',
        body,
      });

      const newChallenge = (await response.json()) as ChallengePrimitive;

      router.push(`/challenges/${newChallenge.id}`);
    } catch (error) {
      console.log({ error });
      notifications.show({
        title: 'Error while trying to create the challenge',
        message: '',
        withBorder: true,
        withCloseButton: true,
        autoClose: 10_000,
        color: 'red',
        icon: <IconX />,
      });
      setIsCreatingChallenge(false);
    }
  }

  return (
    <>
      <Center>
        <Card
          ref={ref}
          withBorder
          shadow="md"
          radius="md"
          p={'3rem 2rem'}
          style={{
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            transform: hovered ? 'scale(1.01)' : undefined,
            boxShadow: hovered ? '0 4px 30px rgba(16, 152, 173, 0.5)' : undefined,
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/images/newChallenge.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={handleClickCreateChallenge}
        >
          <Title order={2} size="h2" style={{ fontSize: '2.6rem', fontWeight: 900 }}>
            Create a new challenge
          </Title>

          <Space h={'1rem'} />
          <Text size="lg" fw={500}>
            You can start from scratch, or use this challenge as a template
          </Text>
        </Card>
      </Center>

      <Modal
        centered={true}
        opened={isModalForNewChallenge}
        onClose={closeModalForNewChallenge}
        title={
          <div
            style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}
          >
            <IconTrophy size={16} color="teal" />
            <span>Create a new challenge</span>
          </div>
        }
        closeOnEscape={true}
        closeOnClickOutside={false}
        withCloseButton={true}
        size={'lg'}
      >
        <Flex justify="space-between" mt="md" gap={'2rem'}>
          <Button
            leftSection={<IconFile size={18} />}
            color="cyan"
            variant="filled"
            size="md"
            loading={isCreatingChallenge}
            disabled={isCreatingChallenge}
            onClick={createNewEmtpyChallenge}
          >
            From scratch
          </Button>

          <Button
            leftSection={<IconRecycle size={18} />}
            variant="gradient"
            size="md"
            loading={isCreatingChallenge}
            disabled={isCreatingChallenge}
            onClick={createNewChallengeUsingCurrentAsTemplate}
          >
            Using this challenge as a template
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

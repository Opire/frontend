'use client';

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconKey, IconArrowRight } from '@tabler/icons-react';
import { FC } from 'react';
import { LoginModal } from './LoginModal';
import { useTriggerCallbackOnQueryParamFirstMatch } from '../../../hooks/useTriggerCallbackOnQueryParamFirstMatch';

export const LoginButton: FC = () => {
  const [isModalOpen, { close: closeModal, open: openModal }] = useDisclosure();
  useTriggerCallbackOnQueryParamFirstMatch({ queryParamKey: 'login', callback: openModal });

  return (
    <>
      <Button
        onClick={openModal}
        size="md"
        leftSection={<IconKey size={14} />}
        rightSection={<IconArrowRight size={14} />}
        variant="gradient"
      >
        Log in
      </Button>

      <LoginModal isOpened={isModalOpen} onClose={closeModal} />
    </>
  );
};

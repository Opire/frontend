'use client'

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconKey, IconArrowRight } from "@tabler/icons";
import { FC } from "react";
import { LoginModal } from "./LoginModal";

export const LoginButton: FC<{}> = ({
}) => {
    const [isModalOpen, { close: closeModal, open: openModal }] = useDisclosure();

    return (
        <>
            <Button
                onClick={openModal}
                size='md'
                leftSection={<IconKey size={14} />}
                rightSection={<IconArrowRight size={14} />}
                variant='gradient'
            // m={'0 auto'}
            >
                Log in
            </Button>

            <LoginModal isOpened={isModalOpen} onClose={closeModal} />
        </>
    )
}
import { Center, Modal, Space, Title, Text, Flex } from "@mantine/core";
import { FC } from "react";
import { GitHubLoginButton } from "./GitHubLoginButton";
// import { GitLabLoginButton } from "./GitLabLoginButton";
// import { BitBucketLoginButton } from "./BitBucketLoginButton";

interface LoginModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({
    isOpened,
    onClose
}) => {
    return (
        <Modal
            centered={true}
            opened={isOpened}
            onClose={onClose}
            size={'sm'}
            closeOnEscape={true}
            closeOnClickOutside={true}
            withCloseButton={false}
        >
            <Center>
                <Flex
                    direction='column'
                    justify='center'
                    align='center'
                >
                    <Title order={3}>Log in</Title>
                    <Text c='dimmed'>Choose your preferred service</Text>
                </Flex>
            </Center>

            <Space h='2rem' />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <GitHubLoginButton />

                {/* <Space h="lg" /> */}

                {/* <GitLabLoginButton /> */}

                {/* <Space h="lg" /> */}

                {/* <BitBucketLoginButton /> */}
            </div>

        </Modal>
    )
}
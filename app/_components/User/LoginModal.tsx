import { Modal, Space } from "@mantine/core";
import { FC } from "react";
import { BitBucketLoginButton } from "./BitBucketLoginButton";
import { GitHubLoginButton } from "./GitHubLoginButton";
import { GitLabLoginButton } from "./GitLabLoginButton";

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
            title="Authentication"
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <GitHubLoginButton />

                <Space h="xl" />

                <GitLabLoginButton />

                <Space h="xl" />

                <BitBucketLoginButton />
            </div>

        </Modal>
    )
}
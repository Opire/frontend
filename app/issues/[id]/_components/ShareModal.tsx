import { IssuePrimitive } from "../../../_core/_primitives/IssuePrimitive";
import React, { FC } from "react";
import { Modal, Button, Title, SimpleGrid, Divider, Space, TextInput, CopyButton, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandLinkedin, IconBrandTelegram, IconBrandThreads, IconBrandTwitter, IconBrandWhatsapp, IconCheck, IconMail, IconShare } from "@tabler/icons-react";
import { formatPrice } from "../../../_utils/formatPrice";
import { PricePrimitive } from "../../../_core/_primitives/PricePrimitive";

interface ShareModalProps {
    issue: IssuePrimitive;
}

export const ShareModal: FC<ShareModalProps> = ({ issue }) => {
    const [opened, { open, close }] = useDisclosure(false);

    const rewardedIssueURL = `${process.env.NEXT_PUBLIC_URL}/issues/${issue.id}`;

    const totalPrice: PricePrimitive = issue.rewards.reduce((acc, el) => {
        acc.value += el.price.value;

        return acc;
    }, { unit: "USD_CENT", value: 0 });

    const shareInSocialMediaText = `Look at this rewarded issue in Opire! You can earn up to ${formatPrice(totalPrice)} by collaborating with an open-source project\n`;

    function shareToTwitter () {
        window.open(`https://twitter.com/intent/post?text=${encodeURIComponent(shareInSocialMediaText)}&url=${rewardedIssueURL}&via=${encodeURIComponent("opire_dev")}&hashtags=${encodeURIComponent("opensource,opire,bounty,reward")}`);
    }

    function shareToLinkedin () {
        window.open(`https://linkedin.com/sharing/share-offsite?url=${rewardedIssueURL}`);
    }

    function shareToWhatsapp () {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareInSocialMediaText}\n${rewardedIssueURL}`)}`);
    }

    function shareToTelegram () {
        window.open(`https://telegram.me/share/url?text=${encodeURIComponent(shareInSocialMediaText)}&url=${rewardedIssueURL}`);
    }

    function shareToThreads () {
        window.open(`https://threads.net/intent/post?text=${encodeURIComponent(`${shareInSocialMediaText}\n${rewardedIssueURL}\n\n#opensource\n\nvia @opiredev`)}`);
    }

    function shareToEmail () {
        window.open(`mailto:?body=${encodeURIComponent(`${shareInSocialMediaText}\n${rewardedIssueURL}`)}`);
    }

    return (
        <>
            <Modal opened={opened} onClose={close} centered title="Share rewarded issue">
                <Title size={18} fw={700}>Copy link</Title>
                <Space h='xs' />

                <Flex wrap={"nowrap"} justify={"center"} align={"end"}>
                    <TextInput
                        aria-label="Reward url"
                        readOnly
                        value={rewardedIssueURL}
                        radius={"xs"}
                        style={{ flex: 1 }}
                    />
                    <CopyButton value={rewardedIssueURL}>
                        {({ copied, copy }) => (
                            <Button
                                color={copied ? "teal" : "blue"}
                                variant='light'
                                onClick={copy}
                                style={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,

                                }}
                                leftSection={copied ? <IconCheck size={16} /> : undefined}
                            >
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        )}
                    </CopyButton>
                </Flex>

                <Space h='xl' />
                <Divider />
                <Space h='xl' />

                <Title size={18} fw={700}>In social media</Title>
                <Space h='xs' />
                <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="md">
                    <Button color='#1DA1F2' leftSection={<IconBrandTwitter />} onClick={shareToTwitter}>Twitter</Button>
                    <Button color='#0e76a8' leftSection={<IconBrandLinkedin />} onClick={shareToLinkedin}>LinkedIn</Button>
                    <Button color='#25D366' leftSection={<IconBrandWhatsapp />} onClick={shareToWhatsapp}>WhatsApp</Button>
                    <Button color="#24A1DE" leftSection={<IconBrandTelegram />} onClick={shareToTelegram}>Telegram</Button>
                    <Button color="#000000" leftSection={<IconBrandThreads />} onClick={shareToThreads}>Threads</Button>
                    <Button color="teal" leftSection={<IconMail />} onClick={shareToEmail}>Email</Button>
                </SimpleGrid>

            </Modal>

            <Button onClick={open} leftSection={<IconShare size={18} />} variant="light">Share</Button>
        </>
    );
};

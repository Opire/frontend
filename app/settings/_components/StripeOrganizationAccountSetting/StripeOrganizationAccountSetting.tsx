'use client'

import { Text, SimpleGrid, Card, Center, Button, Group, Avatar, Space } from "@mantine/core";
import { FC, useState } from "react";
import Link from "next/link";
import { API_ROUTES } from "../../../../constants";
import { clientCustomFetch } from "../../../_utils/clientCustomFetch";
import { UserSettingsDTO } from "../../../_core/_dtos/UserSettingsDTO";
import { CustomImage } from "../../../_components/CustomImage";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

interface StripeOrganizationAccountSettingProps {
    organizations: UserSettingsDTO['payments']['organizations'];
}

export const StripeOrganizationAccountSetting: FC<StripeOrganizationAccountSettingProps> = ({
    organizations,
}) => {

    return (
        <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} w='100%' spacing='xl' verticalSpacing='xl' >
            {organizations.map(organization => (<StripeOrganizationAccountSettingCard key={organization.id} organization={organization} />))}
        </SimpleGrid>
    );
}

interface StripeOrganizationAccountSettingCardProps {
    organization: StripeOrganizationAccountSettingProps['organizations'][number];
}

export const StripeOrganizationAccountSettingCard: FC<StripeOrganizationAccountSettingCardProps> = ({
    organization,
}) => {
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    async function sendStripeLinkByOrganizationEmail() {
        setIsSendingEmail(true);

        await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_LINK_SEND_TO_ORGANIZATION_EMAIL(organization.id), { method: 'POST' });

        notifications.show({
            title: `Link sent to ${organization.name}'s email address ✉️`,
            message: "If you don't receive it in some minutes, try checking the spam folder 📬",
            withBorder: true,
            withCloseButton: true,
            autoClose: 10_000,
            icon: <IconCheck />,
        })

        setIsSendingEmail(false);
    }

    return (
        <Card shadow="xl" padding="xl">
            <Card.Section p='md'>
                <Group wrap="nowrap" justify="space-between">
                    <Avatar
                        src={organization.logoURL}
                        alt={organization.name}
                        style={{
                            width: "44px",
                            height: "44px",
                        }}
                        radius="xl"
                    />

                    <CustomImage
                        src={`/icons/${organization.platform.toLowerCase()}.png`}
                        fallbackSrc="/icons/fallback.png"
                        alt={organization.platform}
                        height={44}
                        width={44}
                    />
                </Group>

                <Space h='1.5rem' />

                <Center>
                    <Link
                        href={organization.url}
                        target="_blank"
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <Text style={{ fontSize: '2rem' }} lineClamp={2}>
                            {organization.name}
                        </Text>
                    </Link>
                </Center>
            </Card.Section>

            <Card.Section p='md'>
                <Center>
                    <Button
                        size="lg"
                        variant="gradient"
                        disabled={!organization.hasEmail}
                        onClick={sendStripeLinkByOrganizationEmail}
                        loading={isSendingEmail}
                        w='80%'
                    >
                        <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                            Send link
                        </Text>
                    </Button>
                </Center>
            </Card.Section>
        </Card >
    );
}
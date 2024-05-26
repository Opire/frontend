'use client'

import { Text, SimpleGrid, Card, Center, Button, Group, Avatar, Space, Badge, Tooltip } from "@mantine/core";
import { FC, useState } from "react";
import Link from "next/link";
import { API_ROUTES } from "../../../../constants";
import { clientCustomFetch } from "../../../_utils/clientCustomFetch";
import { UserSettingsDTO } from "../../../_core/_dtos/UserSettingsDTO";
import { CustomImage } from "../../../_components/CustomImage";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons-react";

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
        try {
            setIsSendingEmail(true);

            await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_LINK_SEND_TO_ORGANIZATION_EMAIL(organization.id), { method: 'POST' });

            notifications.show({
                title: `Link sent to ${organization.name}'s email address ✉️`,
                message: "If you don't receive it in some minutes, try checking the spam folder 📬",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'teal',
                icon: <IconCheck />,
            })
        } catch (error) {
            notifications.show({
                title: `Error while trying to send link to ${organization.name}'s email address 🥲`,
                message: "Please, try again later",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'red',
                icon: <IconX />,
            })
        } finally {
            setIsSendingEmail(false);
        }
    }


    const hasCompletedTheOrganizationOnboarding = organization.payments.canReceivePayments;

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
                <Center>

                    {
                        hasCompletedTheOrganizationOnboarding &&
                        <Badge color="teal">
                            Setup completed
                        </Badge>
                    }

                    {
                        !hasCompletedTheOrganizationOnboarding &&
                        <Badge color="yellow">
                            Needs onboarding
                        </Badge>
                    }
                </Center>

                {
                    hasCompletedTheOrganizationOnboarding &&
                    <>
                        <Space h='0.4rem' />
                        {organization.payments.email && <Text ta='center' c='dimmed'>Connected with {organization.payments.email}</Text>}
                    </>
                }
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
                            Send instructions
                        </Text>
                    </Button>

                    {!organization.hasEmail &&
                        <Tooltip
                            multiline
                            w='16rem'
                            events={{ hover: true, focus: true, touch: true }}
                            label={`We couldn't detect the public email of the organization. To allow us to send the onboarding link, please add the public email in ${organization.platform} and suspend & unsuspend the installation of Opire's bot, so we can detect the change in the organization email`}
                        >
                            <IconAlertCircle color="yellow" />
                        </Tooltip>
                    }
                </Center>

            </Card.Section>
        </Card >
    );
}

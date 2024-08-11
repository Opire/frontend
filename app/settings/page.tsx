import { Badge, Divider, Group, SimpleGrid, Space, Stack, Text } from "@mantine/core";
import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../_utils/redirectToHomeIfNotLogged";
import { getUserSettings } from "../_utils/getUserSettings";
import { GitHubInstallApp } from "./_components/GitHubInstallApp/GitHubInstallApp";
import { StripePersonalAccountSetting } from "./_components/StripePersonalAccountSetting/StripePersonalAccountSetting";
import { IndividualTiersSettings } from "./_components/IndividualTiers/IndividualTiersSettings";
import { INDIVIDUAL_TIER_NAMES } from "../_core/_types/TierNames";
import { TierLabelMapper } from "../_core/_types/TierLabelMapper";
import { OrganizationsSettings } from "./_components/OrganizationsSettings/OrganizationsSettings";

export const metadata: Metadata = {
    title: 'Opire - Settings',
}

export default async function Page() {
    redirectToHomeIfNotLogged();
    const userSettings = await getUserSettings();
    const belongsToSomeOrganization = userSettings.payments.organizations.length > 0;

    return (
        <Stack gap="xl">
            <section>
                <Text
                    style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                >
                    Install app
                </Text>

                <Space h={'1rem'}/>

                <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} w='100%' spacing='xl' verticalSpacing='xl' >
                    <GitHubInstallApp />
                </SimpleGrid>
            </section>

            <Divider mt={'1rem'} />

            <section>
                <Text
                    style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                >
                    Payments
                </Text>

                <Space h={'1rem'}/>

                <Group>
                    <StripePersonalAccountSetting
                        hasStripeConfigured={userSettings.payments.canReceivePayments}
                        paymentsEmail={userSettings.payments.email}
                        userId={userSettings.id}
                    />
                </Group>
            </section>

            <Divider mt={'1rem'} />

            <section>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center'}}>
                    <Text
                        style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                    >
                        Tier   
                    </Text>
                   
                    {
                        userSettings.tierName !== INDIVIDUAL_TIER_NAMES.INDIVIDUAL_BASIC && 
                        <Badge color="indigo" variant="outline">
                            {TierLabelMapper[userSettings.tierName]}
                        </Badge>
                    }
                </div>
                     

                <Space h={'0.2rem'}/>

                <IndividualTiersSettings
                    userId={userSettings.id}
                    paymentsEmail={userSettings.payments.email}
                    currentTier={userSettings.tierName}
                />
            </section>
            
            {
                belongsToSomeOrganization &&
                <>
                    <Divider mt={'1rem'} />

                    <Text
                        style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                    >
                        Your organizations
                    </Text>

                    <Group>
                        <OrganizationsSettings
                            organizations={userSettings.payments.organizations}
                        />
                    </Group>
                </>
            }

            <Space h='2rem' />
        </Stack>
    );
}

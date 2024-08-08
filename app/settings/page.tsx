import { Divider, Group, SimpleGrid, Space, Stack, Text } from "@mantine/core";
import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../_utils/redirectToHomeIfNotLogged";
import { getUserSettings } from "../_utils/getUserSettings";
import { GitHubInstallApp } from "./_components/GitHubInstallApp/GitHubInstallApp";
import { StripePersonalAccountSetting } from "./_components/StripePersonalAccountSetting/StripePersonalAccountSetting";
import { IndividualTiersSettings } from "./_components/IndividualTiers/IndividualTiersSettings";
import { INDIVIDUAL_TIER_NAMES } from "../_core/_types/TierNames";
import { TierLabelMapper } from "../_core/_types/TierLabelMapper";

export const metadata: Metadata = {
    title: 'Opire - Settings',
}

export default async function Page() {
    redirectToHomeIfNotLogged();
    const userSettings = await getUserSettings();

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
                        email={userSettings.payments.email}
                        userId={userSettings.id}
                        />
                </Group>
            </section>

            <Divider mt={'1rem'} />

            <section>
                <Text
                    style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                >
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center'}}>
                        <span>
                            Tier   
                        </span>

                        {userSettings.tierName !== INDIVIDUAL_TIER_NAMES.INDIVIDUAL_BASIC && 
                            <span 
                                style={{
                                    padding: '4px 8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '15px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    borderColor: '#41C9DB',
                                    color: '#41C9DB',
                                    fontFamily: 'Roboto-Bold',
                                }}
                            >
                                {TierLabelMapper[userSettings.tierName]}
                            </span>
                        }
                    </div>
                     
                </Text>

                <Space h={'0.2rem'}/>

                <IndividualTiersSettings
                    userId={userSettings.id}
                    currentTier={userSettings.tierName}
                />
            </section>

            <Space h='2rem' />
        </Stack>
    );
}

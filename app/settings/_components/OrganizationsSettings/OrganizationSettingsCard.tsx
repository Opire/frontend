import { FC } from "react";
import { UserSettingsDTO } from "../../../_core/_dtos/UserSettingsDTO";
import { Text, Card, Center, Button, Group, Avatar, Space, Badge, Tooltip, Modal } from "@mantine/core";
import { CustomImage } from "../../../_components/CustomImage";
import Link from "next/link";
import { ORGANIZATION_TIER_NAMES } from "../../../_core/_types/TierNames";
import { TierLabelMapper } from "../../../_core/_types/TierLabelMapper";
import { OrganizationTiersStripeCurrentTier } from "./OrganizationTiers/OrganizationTiersStripeCurrentTier";
import { useDisclosure } from "@mantine/hooks";
import { IconGift } from "@tabler/icons-react";
import { OrganizationTiersStripePricingPage } from "./OrganizationTiers/OrganizationTiersStripePricingTable";

interface OrganizationSettingsCardProps {
    organization: UserSettingsDTO['payments']['organizations'][number];
}

export const OrganizationSettingsCard: FC<OrganizationSettingsCardProps> = ({
    organization,
}) => {
    const currentTier = organization.tierName;
    const isPayingSomeSubscription = currentTier !== ORGANIZATION_TIER_NAMES.ORGANIZATION_BASIC

    const [isModalOpen, { close: closeModal, open: openModal }] = useDisclosure();

    const showPricingTable = () => {
        openModal()
    }

    return (
        <>
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
                            isPayingSomeSubscription &&
                            <Badge color="indigo" variant="outline">
                                Tier: {TierLabelMapper[currentTier]}
                            </Badge>
                        }

                        {
                            !isPayingSomeSubscription &&
                            <Badge color="orange" variant="outline">
                                No active subscription
                            </Badge>
                        }
                    </Center>
                </Card.Section>

                <Card.Section p='md'>
                    <Center>
                        {
                            !isPayingSomeSubscription &&
                            <Button
                                size="lg"
                                variant="gradient"
                                disabled={!organization.hasEmail}
                                onClick={showPricingTable}
                                w='80%'
                            >
                                <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                                    See pricing options
                                </Text>
                            </Button>
                        }

                        {isPayingSomeSubscription && <OrganizationTiersStripeCurrentTier currentTier={currentTier} />}
                    </Center>

                </Card.Section>
            </Card >

            <Modal
                centered={true}
                opened={isModalOpen}
                onClose={closeModal}
                size={'xl'}
                title={<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'ce' }}><IconGift size={16} color="teal" />Subscribe and get features for all members of <span style={{ fontWeight: 'bold', color: '#91a7ff' }}>{organization.name}</span> </div>}
                closeOnEscape={false}
                closeOnClickOutside={false}
                withCloseButton={true}
            >
                <OrganizationTiersStripePricingPage organizationId={organization.id} />
            </Modal>
        </>
    );
}
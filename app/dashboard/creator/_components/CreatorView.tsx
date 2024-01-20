'use client'

import { Container, Divider, Space, Tabs } from "@mantine/core"
import { IconCoin, IconMoneybag } from "@tabler/icons-react"
import { useRouter } from "next/navigation";
import { CreatorRewardsPanel } from "./CreatorRewardsPanel/CreatorRewardsPanel";
import { CreatorTipsPanel } from "./CreatorTipsPanel/CreatorTipsPanel";

export function CreatorView({
    view,
}: {
    view: 'rewards' | 'tips'
}) {
    const router = useRouter();

    return (
        <>
            <Space h={'7px'} />

            <Tabs
                value={view}
                onChange={(value) => router.push(`/dashboard/creator/${value}`)}
                color="violet"
                variant="pills"
                defaultValue="rewards"
            >
                <Tabs.List justify="center">
                    <Tabs.Tab value="rewards" leftSection={<IconMoneybag size={18} />}>
                        Rewards
                    </Tabs.Tab>

                    <Tabs.Tab value="tips" leftSection={<IconCoin size={18} />}>
                        Tips
                    </Tabs.Tab>
                </Tabs.List>

                <Divider mb='lg' />

                <Tabs.Panel value="rewards">
                    <Container size='lg'>
                        <CreatorRewardsPanel />
                    </Container>
                </Tabs.Panel>

                <Tabs.Panel value="tips">
                    <Container size='lg'>
                        <CreatorTipsPanel />
                    </Container>
                </Tabs.Panel>

            </Tabs>
        </>
    )
}

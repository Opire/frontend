"use client";

import { Container, Divider, Space, Tabs } from "@mantine/core";
import { IconCoin, IconMoneybag } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ProgrammerRewardsPanel } from "./ProgrammerRewardsPanel/ProgrammerRewardsPanel";
import { ProgrammerTipsPanel } from "./ProgrammerTipsPanel/ProgrammerTipsPanel";

export function ProgrammerView ({
    view,
}: {
    view: "rewards" | "tips";
}) {
    const router = useRouter();

    return (
        <>
            <Space h={"7px"} />

            <Tabs
                value={view}
                onChange={(value) => router.push(`/dashboard/programmer/${value}`)}
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
                        <ProgrammerRewardsPanel />
                    </Container>
                </Tabs.Panel>

                <Tabs.Panel value="tips">
                    <Container size='lg'>
                        <ProgrammerTipsPanel />
                    </Container>
                </Tabs.Panel>

            </Tabs>
        </>
    );
}

'use client'

import { Button, Card, Divider, SimpleGrid, Space } from "@mantine/core";
import Link from "next/link";

export function DashboardView() {

    return (
        <>
            <SimpleGrid cols={2} spacing={"xl"} px='10%'>
                <Button
                    component={Link}
                    href={'/dashboard/creator'}
                    variant="gradient"
                    size="lg"
                >
                    Created
                </Button>


                <Button
                    component={Link}
                    href={'/dashboard/programmer'}
                    variant="gradient"
                    gradient={{
                        to: 'teal.6',
                        from: 'cyan.7'
                    }}
                    size="lg"
                >
                    Received
                </Button>

            </SimpleGrid>

            <Divider my='lg' />

            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Button
                    component={Link}
                    href={'/dashboard/metrics'} // TODO: Define
                    variant="light"
                    size="md"
                    style={{ margin: '0 auto' }}
                >
                    See more
                </Button>

                <Space h='16px' />

                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <section>Insights</section>
                </Card>

            </Card>
        </>
    );
}

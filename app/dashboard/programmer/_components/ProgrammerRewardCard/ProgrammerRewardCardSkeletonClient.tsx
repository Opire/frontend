"use client";

import { Card, CardSection, Group, SimpleGrid, Skeleton } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { getRandomNumber } from "../../../../_utils/getRandomNumber";
import crypto from "crypto";

export const ProgrammerRewardCardSkeletonClient: FC = () => {
    // use render state to not render on server (only on the client side)
    const [render, setRender] = useState(false);

    useEffect(() => {
        setRender(true);
    }, []);

    if (!render) {
        return null;
    }

    // If used in the server, it can be missmatch between the number generated in frontend and server
    const numberOfEmptyIcons = getRandomNumber(3, 6);

    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
        >
            <CardSection withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Skeleton height={15} mt={6} width={`${getRandomNumber(50, 95)}%`} radius="xl" />
                </Group>
            </CardSection>

            <CardSection withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <div
                        style={{
                            width: "30px",
                            height: "30px",
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Skeleton height={"30px"} circle key={`${crypto.randomUUID()}-skeleton-dot`} />
                    </div>
                    <div style={{ width: "100px" }}>
                        <Skeleton height={8} radius="xl" />
                    </div>
                    <div style={{ width: "100px" }}>
                        <Skeleton height={8} radius="xl" />
                    </div>
                </Group>
            </CardSection>

            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={15} radius="xl" />
            <Skeleton height={8} mt={15} width={`${getRandomNumber(10, 90)}%`} radius="xl" />

            <CardSection withBorder inheritPadding p="md">
                <SimpleGrid cols={numberOfEmptyIcons}>
                    {new Array(numberOfEmptyIcons).fill(0).map(() => (
                        <div
                            key={`${crypto.randomUUID()}-skeleton-dot`}
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <Skeleton height={"30px"} circle mb="sm" />
                        </div>
                    ))}
                </SimpleGrid>
            </CardSection>
        </Card>
    );
};

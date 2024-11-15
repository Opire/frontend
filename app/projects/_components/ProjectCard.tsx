import {
    Badge,
    Card,
    CardSection,
    Group,
    Text,
} from "@mantine/core";
import Link from "next/link";
import { FC, Ref, useEffect } from "react";
import { CustomImage } from "../../_components/CustomImage";
import { ProjectListDTO } from "../../_core/_dtos/ProjectListDTO";

interface ProjectCardProps {
    data: ProjectListDTO;
    inputRef?: Ref<HTMLDivElement>;
}

export const ProjectCard: FC<ProjectCardProps> = ({ data, inputRef }) => {
    useEffect(() => { }, []);

    return (
        <Card ref={inputRef} withBorder shadow="md" radius="md" style={{ display: "flex" }}>
            <Group wrap="nowrap" h={"50px"}>
                <CustomImage
                    src={`${data.organization.logoUrl}`}
                    fallbackSrc="/icons/fallback.png"
                    alt={data.platform}
                    style={{ borderRadius: "50%" }}
                    height={44}
                    width={44}
                />

                <Link
                    href={data.organization.url}
                    target="_blank"
                    style={{ color: "inherit", textDecoration: "none" }}
                >
                    <Text lineClamp={2}>{data.organization.name}</Text>
                </Link>
            </Group>

            <CardSection withBorder p="sm" mt='xs' style={{ borderBottom: "none" }}>
                <Group justify="space-between">
                    <Link
                        href={data.url}
                        target="_blank"
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <Text lineClamp={2} fz='1.5rem' fw={600}>{data.name}</Text>
                    </Link>

                    {data.description && <Text size="sm" lineClamp={2} w='100%'>{data.description}</Text>}
                </Group>

            </CardSection>

            <CardSection style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", flexDirection: "row-reverse", margin: "1rem" }}>
                    {
                        !data.isPublic &&
                        <Badge variant="outline" color="orange">Private</Badge>
                    }
                </div>
            </CardSection>

        </Card>
    );
};

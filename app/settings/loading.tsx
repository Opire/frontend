import { Group, Loader, Stack } from "@mantine/core";

export default function Loading () {
    return (
        <>
            <Stack gap="xl">
                <Group justify="center">
                    <Loader display='block' size='xl' m='30px auto' />
                </Group>
            </Stack>
        </>
    );
}

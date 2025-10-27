import { Center, Space, Title } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';

export function NothingFound() {
  return (
    <div>
      <Space h="4vh" />
      <Center>
        <IconCurrencyDollar size={'100px'} opacity={0.6} strokeWidth={1} />
      </Center>
      <Space h="20px" />
      <Center>
        <Title order={1} opacity={0.6} style={{ textAlign: 'center' }}>
          Nothing found...
        </Title>
      </Center>
    </div>
  );
}

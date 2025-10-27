import { Space, Text } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Text style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 'bold' }}>
        Programmer dashboard
      </Text>
      <Space h="1rem" />
      {children}
    </>
  );
}

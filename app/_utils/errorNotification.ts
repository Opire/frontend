import { notifications } from '@mantine/notifications';

export async function errorNotification({
  title,
  message = '',
}: {
  title: string;
  message?: string;
}): Promise<void> {
  notifications.show({
    loading: false,
    title,
    message,
    autoClose: 5000,
    withCloseButton: true,
    color: 'red',
  });
}

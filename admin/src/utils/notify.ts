import { notifications } from '@mantine/notifications';

export function notifySaved(message = 'Kept in this browser only. Refreshing the page restores the original preview data.') {
  notifications.show({
    title: 'Saved in this preview',
    message,
    color: 'vinayaka',
  });
}

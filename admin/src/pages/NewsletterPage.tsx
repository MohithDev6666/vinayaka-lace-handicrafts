import { Alert, Button, Paper, Stack, Table, Text } from '@mantine/core';
import { PageHeading } from '../components/PageHeading.tsx';
import { useStore } from '../context/store.tsx';
import { notifySaved } from '../utils/notify.ts';

export function NewsletterPage() {
  const { subscribers, removeSubscriber } = useStore();

  return (
    <Stack gap="lg">
      <PageHeading
        title="Newsletter"
        description="Placeholder addresses for the homepage signup. The storefront form only checks the email in the browser and does not add anyone to this list."
      />
      <Alert color="vinayaka" variant="light" title="Not a mailing list">
        These example.com addresses were typed for the layout. Removing one does not unsubscribe a real person.
      </Alert>
      <Paper withBorder p="md" radius="md" bg="white">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Email</Table.Th>
              <Table.Th>Added</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {subscribers.map((subscriber) => (
              <Table.Tr key={subscriber.id}>
                <Table.Td>{subscriber.email}</Table.Td>
                <Table.Td>{subscriber.joined}</Table.Td>
                <Table.Td>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="red"
                    onClick={() => {
                      removeSubscriber(subscriber.id);
                      notifySaved('Removed from this preview list.');
                    }}
                  >
                    Remove
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        {subscribers.length === 0 ? (
          <Text c="dimmed" size="sm" mt="md">
            The preview list is empty.
          </Text>
        ) : null}
      </Paper>
    </Stack>
  );
}

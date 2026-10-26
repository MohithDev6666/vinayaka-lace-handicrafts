import { Group, Paper, Select, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { useStore } from '../context/store.tsx';
import type { PaymentStatus } from '../types/admin.ts';
import { formatInr } from '../utils/formatInr.ts';
import { notifySaved } from '../utils/notify.ts';

const statuses: PaymentStatus[] = ['Paid', 'Pending', 'Refunded'];

export function PaymentsPage() {
  const { payments, savePayment } = useStore();
  const total = (status: PaymentStatus) => payments.filter((row) => row.status === status).reduce((sum, row) => sum + row.amount, 0);
  const cards = [
    { label: 'Paid', value: total('Paid') },
    { label: 'Pending', value: total('Pending') },
    { label: 'Refunded', value: total('Refunded') },
  ];

  return (
    <Stack gap="lg">
      <PageHeading title="Payments" description="Sample amounts for the preview orders. Changing a status does not move money." />
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {cards.map((card) => (
          <Paper key={card.label} withBorder p="md" radius="md" bg="white">
            <Text size="sm" c="dimmed">
              {card.label}
            </Text>
            <Title order={3} c="#173F3D" mt={4}>
              {formatInr(card.value)}
            </Title>
          </Paper>
        ))}
      </SimpleGrid>
      <Paper withBorder p="md" radius="md" bg="white">
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Payment</Table.Th>
              <Table.Th>Order</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Method</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {payments.map((payment) => (
              <Table.Tr key={payment.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {payment.id}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {payment.date}
                  </Text>
                </Table.Td>
                <Table.Td>{payment.orderId}</Table.Td>
                <Table.Td>{payment.customerName}</Table.Td>
                <Table.Td>{payment.method}</Table.Td>
                <Table.Td>{formatInr(payment.amount)}</Table.Td>
                <Table.Td>
                  <Group gap="xs" wrap="nowrap">
                    <StatusBadge value={payment.status} />
                    <Select
                      aria-label={`Status for ${payment.id}`}
                      data={statuses}
                      value={payment.status}
                      allowDeselect={false}
                      w={130}
                      onChange={(value) => {
                        if (!value) return;
                        savePayment({ ...payment, status: value as PaymentStatus });
                        notifySaved('Payment status updated in this preview only.');
                      }}
                    />
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}

import { Button, Group, Paper, Select, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { useStore } from '../context/store.tsx';
import type { OrderStatus } from '../types/admin.ts';
import { formatInr } from '../utils/formatInr.ts';
import { notifySaved } from '../utils/notify.ts';

const statuses: OrderStatus[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

export function OrderDetailsPage() {
  const { orderId } = useParams();
  const { orders, saveOrder } = useStore();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <Stack>
        <Title order={2}>Order not found</Title>
        <Button component={Link} to="/orders" variant="light">
          Back to orders
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={2} c="#173F3D">
            Order {order.id}
          </Title>
          <Text c="dimmed" size="sm">
            Placed {order.date}. Addresses and phones below are placeholders.
          </Text>
        </div>
        <Button component={Link} to="/orders" variant="default">
          All orders
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Paper withBorder p="md" radius="md" bg="white">
          <Text fw={600} mb="xs">
            Customer
          </Text>
          <Text>{order.customerName}</Text>
          <Text size="sm" c="dimmed">
            {order.email}
          </Text>
          <Text size="sm" c="dimmed">
            {order.phone}
          </Text>
          <Text size="sm" mt="sm">
            {order.address}
          </Text>
        </Paper>
        <Paper withBorder p="md" radius="md" bg="white">
          <Text fw={600} mb="sm">
            Status
          </Text>
          <Group mb="sm">
            <StatusBadge value={order.status} />
            <StatusBadge value={order.payment} />
          </Group>
          <Select
            label="Update order status"
            data={statuses}
            value={order.status}
            allowDeselect={false}
            onChange={(value) => {
              if (!value) return;
              saveOrder({ ...order, status: value as OrderStatus });
              notifySaved('Status updated in this preview only.');
            }}
          />
          <Text size="sm" c="dimmed" mt="sm">
            Payment method: {order.method}. No charge or refund is processed.
          </Text>
        </Paper>
      </SimpleGrid>
      <Paper withBorder p="md" radius="md" bg="white">
        <Text fw={600} mb="sm">
          Items
        </Text>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Piece</Table.Th>
              <Table.Th>Qty</Table.Th>
              <Table.Th>Price</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {order.items.map((item) => (
              <Table.Tr key={item.name}>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.qty}</Table.Td>
                <Table.Td>{formatInr(item.price)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Text fw={600} mt="md">
          Total {formatInr(order.amount)}
        </Text>
      </Paper>
    </Stack>
  );
}

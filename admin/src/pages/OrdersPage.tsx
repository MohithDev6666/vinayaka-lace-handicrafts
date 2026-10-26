import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Group, Paper, SegmentedControl, Stack, Table, Text } from '@mantine/core';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { useStore } from '../context/store.tsx';
import { formatInr } from '../utils/formatInr.ts';

const filters = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

export function OrdersPage() {
  const { orders } = useStore();
  const [filter, setFilter] = useState('All');
  const visible = orders.filter((order) => filter === 'All' || order.status === filter);

  return (
    <Stack gap="lg">
      <PageHeading title="Orders" description="Sample customer orders. Updating a status here does not notify anyone or create a shipment." />
      <SegmentedControl value={filter} onChange={setFilter} data={filters} />
      <Paper withBorder p="md" radius="md" bg="white">
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Order</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Payment</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {visible.map((order) => (
              <Table.Tr key={order.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {order.id}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {order.date}
                  </Text>
                </Table.Td>
                <Table.Td>{order.customerName}</Table.Td>
                <Table.Td>
                  <StatusBadge value={order.payment} />
                </Table.Td>
                <Table.Td>
                  <StatusBadge value={order.status} />
                </Table.Td>
                <Table.Td>{formatInr(order.amount)}</Table.Td>
                <Table.Td>
                  <Button component={Link} to={`/orders/${order.id}`} size="xs" variant="light">
                    View
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        {visible.length === 0 ? (
          <Text c="dimmed" size="sm" mt="md">
            No sample orders in this status.
          </Text>
        ) : null}
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {visible.length} of {orders.length} orders
          </Text>
        </Group>
      </Paper>
    </Stack>
  );
}

import { BarChart } from '@mantine/charts';
import { Paper, Stack, Table, Text, Title } from '@mantine/core';
import { PageHeading } from '../components/PageHeading.tsx';
import { useStore } from '../context/store.tsx';
import { monthlySeries } from '../data/demo.ts';
import { formatAxisRupee, formatInr } from '../utils/formatInr.ts';

export function ReportsPage() {
  const { products, categories, orders } = useStore();
  const byCategory = categories
    .map((category) => ({
      category: category.name,
      pieces: products.filter((product) => product.categoryId === category.id).reduce((sum, product) => sum + product.sold, 0),
    }))
    .filter((row) => row.pieces > 0)
    .sort((a, b) => b.pieces - a.pieces);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Reports"
        description="Sample charts for the studio overview. The May total matches the reference layout and is not a live sales figure."
      />
      <Paper withBorder p="lg" radius="md" bg="white">
        <Text fw={600}>Sample monthly revenue</Text>
        <Text size="xs" c="dimmed" mb="sm">
          Each bar is one month. The amount above the bar is rounded; hover for the exact figure.
        </Text>
        <BarChart
          h={360}
          data={monthlySeries}
          dataKey="month"
          series={[{ name: 'revenue', color: 'vinayaka.5', label: 'Revenue' }]}
          tickLine="y"
          gridAxis="y"
          textColor="dark.6"
          gridColor="gray.3"
          maxBarWidth={64}
          withBarValueLabel
          valueLabelProps={{ formatter: (value: unknown) => formatAxisRupee(Number(value)), position: 'top', fill: '#1D302F' }}
          valueFormatter={(value) => formatInr(value)}
          yAxisProps={{ width: 56, tickFormatter: (value) => formatAxisRupee(Number(value)) }}
          xAxisProps={{ interval: 0 }}
          barChartProps={{ margin: { top: 28, right: 16, left: 0, bottom: 8 } }}
        />
      </Paper>
      <Paper withBorder p="lg" radius="md" bg="white">
        <Text fw={600}>Sample pieces by category</Text>
        <Text size="xs" c="dimmed" mb="sm">
          Hand-counted preview sales, longest bar first.
        </Text>
        <BarChart
          h={420}
          data={byCategory}
          dataKey="category"
          orientation="vertical"
          series={[{ name: 'pieces', color: 'vinayaka.4', label: 'Pieces' }]}
          tickLine="x"
          gridAxis="x"
          textColor="dark.6"
          gridColor="gray.3"
          maxBarWidth={22}
          withBarValueLabel
          valueFormatter={(value) => String(value)}
          valueLabelProps={{ position: 'right', fill: '#1D302F' }}
          yAxisProps={{ width: 168 }}
          xAxisProps={{ allowDecimals: false }}
          barChartProps={{ margin: { top: 8, right: 36, left: 8, bottom: 8 } }}
        />
      </Paper>
      <Paper withBorder p="md" radius="md" bg="white">
        <Title order={4} mb="sm">
          Orders in this preview
        </Title>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Order</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Amount</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders.map((order) => (
              <Table.Tr key={order.id}>
                <Table.Td>{order.id}</Table.Td>
                <Table.Td>{order.customerName}</Table.Td>
                <Table.Td>{order.status}</Table.Td>
                <Table.Td>{formatInr(order.amount)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}

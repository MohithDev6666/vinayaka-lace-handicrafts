import { AreaChart } from '@mantine/charts';
import { Group, Paper, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
import { PageHeading } from '../components/PageHeading.tsx';
import { Thumb } from '../components/Thumb.tsx';
import { useStore } from '../context/store.tsx';
import { salesSeries } from '../data/demo.ts';
import { formatAxisRupee, formatInr } from '../utils/formatInr.ts';

export function DashboardPage() {
  const { products, orders, customers, categories } = useStore();
  const revenue = orders.filter((order) => order.payment === 'Paid').reduce((sum, order) => sum + order.amount, 0);
  const pending = orders.filter((order) => order.status === 'Pending').length;
  const top = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
  const stats = [
    { label: 'Paid revenue', value: formatInr(revenue), note: 'From the sample orders' },
    { label: 'Total orders', value: String(orders.length), note: 'Preview orders only' },
    { label: 'Pending orders', value: String(pending), note: 'Waiting in this list' },
    { label: 'Customers', value: String(customers.length), note: 'Sample profiles' },
  ];

  return (
    <Stack gap="lg">
      <PageHeading
        title="Dashboard"
        description="A quick view of the sample studio. Totals come from the preview orders on this dashboard, not from live sales."
      />
      <SimpleGrid cols={{ base: 1, sm: 2, xl: 4 }}>
        {stats.map((stat) => (
          <Paper key={stat.label} withBorder p="md" radius="md" bg="white">
            <Text size="sm" c="dimmed">
              {stat.label}
            </Text>
            <Title order={3} c="#173F3D" mt={6}>
              {stat.value}
            </Title>
            <Text size="xs" c="dimmed" mt={6}>
              {stat.note}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
      <Paper withBorder p="lg" radius="md" bg="white">
          <Group justify="space-between" mb="xs">
            <div>
              <Text fw={600}>Sales overview</Text>
              <Text size="xs" c="dimmed">
                Sample range · 20 Apr – 8 May 2026. Hover a point for the exact amount.
              </Text>
            </div>
          </Group>
          <AreaChart
            h={340}
            data={salesSeries}
            dataKey="day"
            series={[{ name: 'revenue', color: 'vinayaka.5', label: 'Revenue' }]}
            curveType="monotone"
            withGradient
            withDots
            fillOpacity={0.45}
            strokeWidth={3}
            gridAxis="xy"
            tickLine="xy"
            textColor="dark.6"
            gridColor="gray.3"
            dotProps={{ r: 5, strokeWidth: 2 }}
            activeDotProps={{ r: 7 }}
            valueFormatter={(value) => formatInr(value)}
            yAxisProps={{ width: 56, tickFormatter: (value) => formatAxisRupee(Number(value)) }}
            xAxisProps={{ interval: 0 }}
            areaChartProps={{ margin: { top: 12, right: 24, left: 0, bottom: 8 } }}
            withLegend
          />
        </Paper>
        <Paper withBorder p="md" radius="md" bg="white">
          <Text fw={600} mb="sm">
            Top selling products
          </Text>
          <Table verticalSpacing="sm">
            <Table.Tbody>
              {top.map((product) => (
                <Table.Tr key={product.id}>
                  <Table.Td>
                    <Thumb src={product.image} alt="" />
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>
                      {product.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {categories.find((item) => item.id === product.categoryId)?.name} · {product.sold} sample sales
                    </Text>
                  </Table.Td>
                  <Table.Td ta="right">{formatInr(product.price)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Paper mt="md" p="sm" radius="md" bg="#F7F0E8">
            <Text size="sm" c="#173F3D" ff="'Cormorant Garamond', Georgia, serif" fz={20}>
              Handmade with love
            </Text>
            <Text size="xs" c="dimmed">
              Every stitch tells a story. Preview copy only.
            </Text>
          </Paper>
        </Paper>
    </Stack>
  );
}

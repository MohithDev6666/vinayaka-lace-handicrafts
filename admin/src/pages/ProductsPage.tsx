import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Group, Modal, Paper, Select, Stack, Table, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { Thumb } from '../components/Thumb.tsx';
import { useStore } from '../context/store.tsx';
import { formatInr } from '../utils/formatInr.ts';
import { notifySaved } from '../utils/notify.ts';

export function ProductsPage() {
  const { products, categories, removeProduct } = useStore();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string | null>('All');
  const [page, setPage] = useState(1);
  const [filterKey, setFilterKey] = useState('');
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const key = `${query}|${status}`;
  if (key !== filterKey) {
    setFilterKey(key);
    setPage(1);
  }

  const filtered = products.filter((product) => {
    const category = categories.find((item) => item.id === product.categoryId)?.name ?? '';
    const matchesQuery = `${product.name} ${product.sku} ${category}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesStatus = !status || status === 'All' || product.status === status;
    return matchesQuery && matchesStatus;
  });
  const pageSize = 8;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const pending = products.find((product) => product.id === pendingId);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Products"
        description="Add, edit or retire sample catalog pieces. Prices and stock here are preview values."
        action={
          <Button component={Link} to="/products/new">
            Add product
          </Button>
        }
      />
      <Paper withBorder p="md" radius="md" bg="white">
        <Group mb="md" align="flex-end">
          <TextInput label="Search" placeholder="Name or SKU" value={query} onChange={(event) => setQuery(event.currentTarget.value)} w={260} />
          <Select label="Status" data={['All', 'Published', 'Draft']} value={status} onChange={setStatus} w={160} allowDeselect={false} />
        </Group>
        <Table.ScrollContainer minWidth={760}>
          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Stock</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {visible.map((product) => (
                <Table.Tr key={product.id}>
                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <Thumb src={product.image} alt="" />
                      <div>
                        <Text size="sm" fw={600}>
                          {product.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {product.sku}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>{categories.find((item) => item.id === product.categoryId)?.name ?? 'Unassigned'}</Table.Td>
                  <Table.Td>{formatInr(product.price)}</Table.Td>
                  <Table.Td>{product.stock}</Table.Td>
                  <Table.Td>
                    <StatusBadge value={product.status} />
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Button component={Link} to={`/products/${product.id}`} size="xs" variant="light">
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        variant="subtle"
                        color="red"
                        onClick={() => {
                          setPendingId(product.id);
                          open();
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            Showing {visible.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{(safePage - 1) * pageSize + visible.length} of {filtered.length}
          </Text>
          <Group gap="xs">
            <Button size="xs" variant="default" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>
              Previous
            </Button>
            <Button size="xs" variant="default" disabled={safePage >= pages} onClick={() => setPage(safePage + 1)}>
              Next
            </Button>
          </Group>
        </Group>
      </Paper>
      <Modal opened={opened} onClose={close} title="Remove product" centered>
        <Text size="sm">Remove {pending?.name ?? 'this product'} from the preview catalog? This does not delete a live listing.</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              if (pendingId) removeProduct(pendingId);
              notifySaved('The product was removed from this preview list.');
              close();
            }}
          >
            Remove
          </Button>
        </Group>
      </Modal>
    </Stack>
  );
}

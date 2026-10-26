import { useState } from 'react';
import { Button, Group, Modal, NumberInput, Paper, Select, Stack, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { useStore } from '../context/store.tsx';
import type { InventoryRow } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

export function InventoryPage() {
  const { inventory, products, saveInventory, saveProduct } = useStore();
  const [editing, setEditing] = useState<InventoryRow | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Inventory"
        description="Sample stock by variant. Low stock means five or fewer pieces are free to sell. Nothing is synced to a warehouse."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              open();
            }}
          >
            Add stock
          </Button>
        }
      />
      <Paper withBorder p="md" radius="md" bg="white">
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>Variant</Table.Th>
              <Table.Th>On hand</Table.Th>
              <Table.Th>Reserved</Table.Th>
              <Table.Th>Available</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {inventory.map((row) => {
              const available = Math.max(0, row.onHand - row.reserved);
              const product = products.find((item) => item.id === row.productId);
              return (
                <Table.Tr key={row.id}>
                  <Table.Td>{product?.name ?? 'Removed product'}</Table.Td>
                  <Table.Td>{row.variant}</Table.Td>
                  <Table.Td>{row.onHand}</Table.Td>
                  <Table.Td>{row.reserved}</Table.Td>
                  <Table.Td>{available}</Table.Td>
                  <Table.Td>
                    <StatusBadge value={available <= 5 ? 'Low stock' : 'OK'} />
                  </Table.Td>
                  <Table.Td>
                    <Button
                      size="xs"
                      variant="light"
                      onClick={() => {
                        setEditing(row);
                        open();
                      }}
                    >
                      Adjust
                    </Button>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Paper>
      <Modal opened={opened} onClose={close} title={editing ? 'Adjust stock' : 'Add stock'} centered>
        {opened ? (
          <StockForm
            key={editing?.id ?? 'new'}
            initial={editing}
            products={products.map((product) => ({ value: product.id, label: product.name }))}
            onSave={(row) => {
              saveInventory(row);
              const product = products.find((item) => item.id === row.productId);
              if (product) {
                const siblings = inventory.filter((item) => item.productId === row.productId && item.id !== row.id);
                const available = [...siblings, row].reduce((sum, item) => sum + Math.max(0, item.onHand - item.reserved), 0);
                saveProduct({ ...product, stock: available });
              }
              notifySaved();
              close();
            }}
          />
        ) : null}
      </Modal>
    </Stack>
  );
}

function StockForm({
  initial,
  products,
  onSave,
}: {
  initial: InventoryRow | null;
  products: { value: string; label: string }[];
  onSave: (row: InventoryRow) => void;
}) {
  const form = useForm({
    initialValues: {
      productId: initial?.productId ?? products[0]?.value ?? '',
      variant: initial?.variant ?? '',
      onHand: initial?.onHand ?? 0,
      reserved: initial?.reserved ?? 0,
    },
    validate: {
      productId: (value) => (value ? null : 'Choose a product'),
      variant: (value) => (value.trim() ? null : 'Enter a variant'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSave({
          id: initial?.id ?? nextId('inv'),
          productId: values.productId,
          variant: values.variant.trim(),
          onHand: values.onHand,
          reserved: values.reserved,
        }),
      )}
    >
      <Stack>
        <Select label="Product" data={products} allowDeselect={false} {...form.getInputProps('productId')} />
        <TextInput label="Variant" placeholder="4 ft" {...form.getInputProps('variant')} />
        <Group grow>
          <NumberInput label="On hand" min={0} {...form.getInputProps('onHand')} />
          <NumberInput label="Reserved" min={0} {...form.getInputProps('reserved')} />
        </Group>
        <Group justify="flex-end">
          <Button type="submit">Save stock</Button>
        </Group>
      </Stack>
    </form>
  );
}

import { useState } from 'react';
import { Button, Group, Modal, Paper, Select, Stack, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { useStore } from '../context/store.tsx';
import type { Customer, CustomerStatus } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

export function CustomersPage() {
  const { customers, orders, saveCustomer, removeCustomer } = useStore();
  const [editing, setEditing] = useState<Customer | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Customers"
        description="Sample profiles for the studio desk. Email addresses use example.com and are not real inboxes."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              open();
            }}
          >
            Add customer
          </Button>
        }
      />
      <Paper withBorder p="md" radius="md" bg="white">
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Orders</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {customers.map((customer) => (
              <Table.Tr key={customer.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {customer.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {customer.city}
                  </Text>
                </Table.Td>
                <Table.Td>{customer.email}</Table.Td>
                <Table.Td>{customer.phone}</Table.Td>
                <Table.Td>{orders.filter((order) => order.customerId === customer.id).length}</Table.Td>
                <Table.Td>
                  <StatusBadge value={customer.status} />
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button
                      size="xs"
                      variant="light"
                      onClick={() => {
                        setEditing(customer);
                        open();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      variant="subtle"
                      color="red"
                      onClick={() => {
                        removeCustomer(customer.id);
                        notifySaved('The sample profile was removed.');
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
      </Paper>
      <Modal opened={opened} onClose={close} title={editing ? 'Edit customer' : 'Add customer'} centered>
        {opened ? (
          <CustomerForm
            key={editing?.id ?? 'new'}
            initial={editing}
            onSave={(customer) => {
              saveCustomer(customer);
              notifySaved();
              close();
            }}
          />
        ) : null}
      </Modal>
    </Stack>
  );
}

function CustomerForm({ initial, onSave }: { initial: Customer | null; onSave: (customer: Customer) => void }) {
  const form = useForm({
    initialValues: {
      name: initial?.name ?? '',
      email: initial?.email ?? '',
      phone: initial?.phone ?? '',
      city: initial?.city ?? '',
      status: (initial?.status ?? 'Active') as CustomerStatus,
    },
    validate: {
      name: (value) => (value.trim() ? null : 'Enter a name'),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Enter an email'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSave({
          id: initial?.id ?? nextId('c'),
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || '+91 90000 00000',
          city: values.city.trim() || 'Sample city',
          status: values.status,
        }),
      )}
    >
      <Stack>
        <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
        <TextInput label="Email" withAsterisk {...form.getInputProps('email')} />
        <TextInput label="Phone" {...form.getInputProps('phone')} />
        <TextInput label="City" {...form.getInputProps('city')} />
        <Select label="Status" data={['Active', 'Inactive']} allowDeselect={false} {...form.getInputProps('status')} />
        <Group justify="flex-end">
          <Button type="submit">Save customer</Button>
        </Group>
      </Stack>
    </form>
  );
}

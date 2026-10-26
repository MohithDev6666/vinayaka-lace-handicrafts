import { useState } from 'react';
import { Button, Group, Modal, Paper, Select, Stack, Table, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { Thumb } from '../components/Thumb.tsx';
import { useStore } from '../context/store.tsx';
import { photoChoices } from '../data/demo.ts';
import type { Category, PublishStatus } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function CategoriesPage() {
  const { categories, products, saveCategory, removeCategory } = useStore();
  const [editing, setEditing] = useState<Category | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Categories"
        description="These nine groups match the storefront category row. Counts update from the sample products."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              open();
            }}
          >
            Add category
          </Button>
        }
      />
      <Paper withBorder p="md" radius="md" bg="white">
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Category</Table.Th>
              <Table.Th>Slug</Table.Th>
              <Table.Th>Products</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {categories.map((category) => (
              <Table.Tr key={category.id}>
                <Table.Td>
                  <Group gap="sm" wrap="nowrap">
                    <Thumb src={category.image} alt="" />
                    <Text size="sm" fw={600}>
                      {category.name}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>{category.slug}</Table.Td>
                <Table.Td>{products.filter((product) => product.categoryId === category.id).length}</Table.Td>
                <Table.Td>
                  <StatusBadge value={category.status} />
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button
                      size="xs"
                      variant="light"
                      onClick={() => {
                        setEditing(category);
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
                        removeCategory(category.id);
                        notifySaved('The category was removed from this preview. Products were left in place.');
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
      <Modal opened={opened} onClose={close} title={editing ? 'Edit category' : 'Add category'} centered>
        {opened ? (
          <CategoryForm
            key={editing?.id ?? 'new'}
            initial={editing}
            onSave={(category) => {
              saveCategory(category);
              notifySaved();
              close();
            }}
          />
        ) : null}
      </Modal>
    </Stack>
  );
}

function CategoryForm({ initial, onSave }: { initial: Category | null; onSave: (category: Category) => void }) {
  const form = useForm({
    initialValues: {
      name: initial?.name ?? '',
      slug: initial?.slug ?? '',
      description: initial?.description ?? '',
      image: initial?.image ?? photoChoices[0].value,
      status: (initial?.status ?? 'Published') as PublishStatus,
    },
    validate: {
      name: (value) => (value.trim() ? null : 'Enter a name'),
      slug: (value) => (value.trim() ? null : 'Enter a slug'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSave({
          id: initial?.id ?? nextId('cat'),
          name: values.name.trim(),
          slug: slugify(values.slug || values.name),
          description: values.description.trim(),
          image: values.image,
          status: values.status,
        }),
      )}
    >
      <Stack>
        <TextInput
          label="Name"
          withAsterisk
          {...form.getInputProps('name')}
          onChange={(event) => {
            const name = event.currentTarget.value;
            form.setFieldValue('name', name);
            if (!initial) form.setFieldValue('slug', slugify(name));
          }}
        />
        <TextInput label="Slug" withAsterisk {...form.getInputProps('slug')} />
        <Textarea label="Description" {...form.getInputProps('description')} />
        <Select label="Image" data={photoChoices} allowDeselect={false} {...form.getInputProps('image')} />
        <Select label="Status" data={['Published', 'Draft']} allowDeselect={false} {...form.getInputProps('status')} />
        <Group justify="flex-end">
          <Button type="submit">Save category</Button>
        </Group>
      </Stack>
    </form>
  );
}

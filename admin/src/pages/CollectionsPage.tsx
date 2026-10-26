import { useState } from 'react';
import { Button, Group, Modal, Paper, Select, SimpleGrid, Stack, Switch, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { useStore } from '../context/store.tsx';
import { photoChoices } from '../data/demo.ts';
import type { Collection } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

export function CollectionsPage() {
  const { collections, saveCollection, removeCollection } = useStore();
  const [editing, setEditing] = useState<Collection | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Collections"
        description="The six photographic cards from the storefront. The kids card stays unpublished until a crochet dress photograph is added."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              open();
            }}
          >
            Add collection
          </Button>
        }
      />
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {collections.map((collection) => (
          <Paper key={collection.id} withBorder radius="md" style={{ overflow: 'hidden', minHeight: 240, position: 'relative', color: '#fff' }}>
            <img src={collection.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(23,63,61,0.78), rgba(23,63,61,0.05))' }} />
            <Stack justify="flex-end" gap={6} p="md" style={{ position: 'relative', minHeight: 240 }}>
              <StatusBadge value={collection.active ? 'Published' : 'Draft'} />
              <Text fw={600} fz={26} ff="'Cormorant Garamond', Georgia, serif">
                {collection.title}
              </Text>
              <Text size="sm">{collection.description}</Text>
              <Group>
                <Button
                  size="xs"
                  variant="white"
                  color="vinayaka"
                  onClick={() => {
                    setEditing(collection);
                    open();
                  }}
                >
                  Edit
                </Button>
                <Button size="xs" variant="subtle" c="white" onClick={() => removeCollection(collection.id)}>
                  Delete
                </Button>
              </Group>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
      <Modal opened={opened} onClose={close} title={editing ? 'Edit collection' : 'Add collection'} centered>
        {opened ? (
          <CollectionForm
            key={editing?.id ?? 'new'}
            initial={editing}
            onSave={(collection) => {
              saveCollection(collection);
              notifySaved();
              close();
            }}
          />
        ) : null}
      </Modal>
    </Stack>
  );
}

function CollectionForm({ initial, onSave }: { initial: Collection | null; onSave: (collection: Collection) => void }) {
  const form = useForm({
    initialValues: {
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      image: initial?.image ?? photoChoices[0].value,
      active: initial?.active ?? true,
    },
    validate: { title: (value: string) => (value.trim() ? null : 'Enter a title') },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSave({
          id: initial?.id ?? nextId('col'),
          title: values.title.trim(),
          description: values.description.trim(),
          image: values.image,
          active: values.active,
        }),
      )}
    >
      <Stack>
        <TextInput label="Title" withAsterisk {...form.getInputProps('title')} />
        <TextInput label="Short line" {...form.getInputProps('description')} />
        <Select label="Photograph" data={photoChoices} allowDeselect={false} {...form.getInputProps('image')} />
        <Switch label="Show on the homepage" {...form.getInputProps('active', { type: 'checkbox' })} />
        <Group justify="flex-end">
          <Button type="submit">Save collection</Button>
        </Group>
      </Stack>
    </form>
  );
}

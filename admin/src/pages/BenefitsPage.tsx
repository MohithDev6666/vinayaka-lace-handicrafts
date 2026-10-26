import { useState } from 'react';
import { Button, Group, Modal, Paper, SimpleGrid, Stack, Switch, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { useStore } from '../context/store.tsx';
import type { Benefit } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

export function BenefitsPage() {
  const { benefits, saveBenefit } = useStore();
  const [editing, setEditing] = useState<Benefit | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Trust benefits"
        description="The four promises under the homepage. Shipping and support lines are illustrative until the studio confirms them."
      />
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {benefits.map((benefit) => (
          <Paper key={benefit.id} withBorder p="md" radius="md" bg="white">
            <Text fw={600}>{benefit.title}</Text>
            <Text size="sm" c="dimmed" mt={6} mb="sm">
              {benefit.description}
            </Text>
            <Switch
              label={benefit.active ? 'Shown' : 'Hidden'}
              checked={benefit.active}
              onChange={(event) => saveBenefit({ ...benefit, active: event.currentTarget.checked })}
            />
            <Button
              size="xs"
              variant="light"
              mt="sm"
              onClick={() => {
                setEditing(benefit);
                open();
              }}
            >
              Edit copy
            </Button>
          </Paper>
        ))}
      </SimpleGrid>
      <Modal opened={opened} onClose={close} title="Edit benefit" centered>
        {opened && editing ? (
          <BenefitForm
            key={editing.id}
            initial={editing}
            onSave={(benefit) => {
              saveBenefit(benefit);
              notifySaved();
              close();
            }}
          />
        ) : null}
      </Modal>
    </Stack>
  );
}

function BenefitForm({ initial, onSave }: { initial: Benefit; onSave: (benefit: Benefit) => void }) {
  const form = useForm({
    initialValues: { title: initial.title, description: initial.description },
    validate: { title: (value: string) => (value.trim() ? null : 'Enter a title') },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSave({ ...initial, title: values.title.trim(), description: values.description.trim(), id: initial.id || nextId('bn') }),
      )}
    >
      <Stack>
        <TextInput label="Title" {...form.getInputProps('title')} />
        <TextInput label="Description" {...form.getInputProps('description')} />
        <Group justify="flex-end">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  );
}

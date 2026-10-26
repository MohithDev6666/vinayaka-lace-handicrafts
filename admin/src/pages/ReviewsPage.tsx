import { useState } from 'react';
import { Alert, Button, Group, Modal, NumberInput, Paper, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { useStore } from '../context/store.tsx';
import type { SampleReview } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

export function ReviewsPage() {
  const { reviews, saveReview, removeReview } = useStore();
  const [editing, setEditing] = useState<SampleReview | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Reviews"
        description="Placeholder stories for the homepage testimonial row. They are not verified purchases and must be replaced before launch."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              open();
            }}
          >
            Add sample review
          </Button>
        }
      />
      <Alert color="yellow" variant="light" title="Sample content">
        Do not publish these as real customer reviews. The storefront already labels them as samples.
      </Alert>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {reviews.map((review) => (
          <Paper key={review.id} withBorder p="md" radius="md" bg="#F7F0E8">
            <Text fw={600}>{review.name}</Text>
            <Text size="xs" c="dimmed">
              Sample review · {review.rating} / 5
            </Text>
            <Text size="sm" mt="sm">
              {review.text}
            </Text>
            <Text size="sm" mt="sm" c="#173F3D">
              {review.productName}
            </Text>
            <Group mt="sm">
              <Button
                size="xs"
                variant="white"
                onClick={() => {
                  setEditing(review);
                  open();
                }}
              >
                Edit
              </Button>
              <Button size="xs" variant="subtle" color="red" onClick={() => removeReview(review.id)}>
                Delete
              </Button>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
      <Modal opened={opened} onClose={close} title={editing ? 'Edit sample review' : 'Add sample review'} centered>
        {opened ? (
          <ReviewForm
            key={editing?.id ?? 'new'}
            initial={editing}
            onSave={(review) => {
              saveReview(review);
              notifySaved('Saved as a sample review, not a verified purchase.');
              close();
            }}
          />
        ) : null}
      </Modal>
    </Stack>
  );
}

function ReviewForm({ initial, onSave }: { initial: SampleReview | null; onSave: (review: SampleReview) => void }) {
  const form = useForm({
    initialValues: {
      name: initial?.name ?? 'Sample Customer',
      productName: initial?.productName ?? '',
      rating: initial?.rating ?? 5,
      text: initial?.text ?? '',
    },
    validate: {
      name: (value: string) => (value.trim() ? null : 'Enter a display name'),
      text: (value: string) => (value.trim() ? null : 'Enter the sample text'),
    },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSave({
          id: initial?.id ?? nextId('r'),
          name: values.name.trim(),
          productName: values.productName.trim(),
          rating: values.rating,
          text: values.text.trim(),
          sample: true,
        }),
      )}
    >
      <Stack>
        <TextInput label="Display name" {...form.getInputProps('name')} />
        <TextInput label="Product" {...form.getInputProps('productName')} />
        <NumberInput label="Stars" min={1} max={5} {...form.getInputProps('rating')} />
        <Textarea label="Sample text" minRows={3} {...form.getInputProps('text')} />
        <Group justify="flex-end">
          <Button type="submit">Save sample</Button>
        </Group>
      </Stack>
    </form>
  );
}

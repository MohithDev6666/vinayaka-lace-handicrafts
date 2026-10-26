import { useState } from 'react';
import { Button, Group, Modal, Paper, Select, SimpleGrid, Stack, Switch, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { useStore } from '../context/store.tsx';
import { photoChoices } from '../data/demo.ts';
import type { HeroSlide } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

export function CarouselPage() {
  const { slides, saveSlide, removeSlide } = useStore();
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Hero carousel"
        description="Slides for the storefront hero. Active slides are the ones intended for the homepage. The public site still uses its own static file until an API is connected."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              open();
            }}
          >
            Add slide
          </Button>
        }
      />
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {slides.map((slide) => (
          <Paper key={slide.id} withBorder radius="md" bg="white" style={{ overflow: 'hidden' }}>
            <img src={slide.image} alt="" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            <Stack p="md" gap={6}>
              <Group justify="space-between">
                <Text size="xs" tt="uppercase" c="dimmed" style={{ letterSpacing: '0.12em' }}>
                  {slide.eyebrow}
                </Text>
                <StatusBadge value={slide.active ? 'Published' : 'Draft'} />
              </Group>
              <Text fw={600} fz={20} ff="'Cormorant Garamond', Georgia, serif" c="#173F3D">
                {slide.title}
              </Text>
              <Text size="sm" c="dimmed">
                {slide.description}
              </Text>
              <Group>
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => {
                    setEditing(slide);
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
                    removeSlide(slide.id);
                    notifySaved();
                  }}
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
      <Modal opened={opened} onClose={close} title={editing ? 'Edit slide' : 'Add slide'} centered size="lg">
        {opened ? (
          <SlideForm
            key={editing?.id ?? 'new'}
            initial={editing}
            onSave={(slide) => {
              saveSlide(slide);
              notifySaved();
              close();
            }}
          />
        ) : null}
      </Modal>
    </Stack>
  );
}

function SlideForm({ initial, onSave }: { initial: HeroSlide | null; onSave: (slide: HeroSlide) => void }) {
  const form = useForm({
    initialValues: {
      eyebrow: initial?.eyebrow ?? 'Handmade crochet lace',
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
          id: initial?.id ?? nextId('s'),
          eyebrow: values.eyebrow.trim(),
          title: values.title.trim(),
          description: values.description.trim(),
          image: values.image,
          active: values.active,
        }),
      )}
    >
      <Stack>
        <TextInput label="Eyebrow" {...form.getInputProps('eyebrow')} />
        <TextInput label="Heading" withAsterisk {...form.getInputProps('title')} />
        <Textarea label="Description" {...form.getInputProps('description')} />
        <Select label="Photograph" data={photoChoices} allowDeselect={false} {...form.getInputProps('image')} />
        <Switch label="Active on the homepage" {...form.getInputProps('active', { type: 'checkbox' })} />
        <Group justify="flex-end">
          <Button type="submit">Save slide</Button>
        </Group>
      </Stack>
    </form>
  );
}

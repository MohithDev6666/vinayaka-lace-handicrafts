import { useState } from 'react';
import { Button, Group, Modal, Paper, Select, SimpleGrid, Stack, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PageHeading } from '../components/PageHeading.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { useStore } from '../context/store.tsx';
import { photoChoices } from '../data/demo.ts';
import type { Banner, Coupon, PublishStatus } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

export function BannersPage() {
  const { banners, coupons, saveBanner, removeBanner, saveCoupon, removeCoupon } = useStore();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [bannerOpen, bannerModal] = useDisclosure(false);
  const [couponOpen, couponModal] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Banners & offers"
        description="Homepage and newsletter banners, plus sample coupon codes. Codes are not applied at checkout."
        action={
          <Button
            onClick={() => {
              setBanner(null);
              bannerModal.open();
            }}
          >
            Add banner
          </Button>
        }
      />
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {banners.map((item) => (
          <Paper key={item.id} withBorder radius="md" bg="white" style={{ overflow: 'hidden' }}>
            <img src={item.image} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
            <Stack gap={6} p="md">
              <Group justify="space-between">
                <Text fw={600}>{item.title}</Text>
                <StatusBadge value={item.status} />
              </Group>
              <Text size="sm" c="dimmed">
                {item.placement}
              </Text>
              <Text size="xs" c="dimmed">
                {item.start} – {item.end}
              </Text>
              <Group gap="xs">
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => {
                    setBanner(item);
                    bannerModal.open();
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  color="red"
                  onClick={() => {
                    removeBanner(item.id);
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
      <Group justify="space-between">
        <Text fw={600}>Sample coupons</Text>
        <Button
          variant="light"
          onClick={() => {
            setCoupon(null);
            couponModal.open();
          }}
        >
          Add coupon
        </Button>
      </Group>
      <Paper withBorder p="md" radius="md" bg="white">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Code</Table.Th>
              <Table.Th>Detail</Table.Th>
              <Table.Th>Expires</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {coupons.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>{item.code}</Table.Td>
                <Table.Td>{item.detail}</Table.Td>
                <Table.Td>{item.expires}</Table.Td>
                <Table.Td>
                  <StatusBadge value={item.status} />
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button
                      size="xs"
                      variant="light"
                      onClick={() => {
                        setCoupon(item);
                        couponModal.open();
                      }}
                    >
                      Edit
                    </Button>
                    <Button size="xs" variant="subtle" color="red" onClick={() => removeCoupon(item.id)}>
                      Delete
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
      <Modal opened={bannerOpen} onClose={bannerModal.close} title={banner ? 'Edit banner' : 'Add banner'} centered>
        {bannerOpen ? (
          <BannerForm
            key={banner?.id ?? 'new'}
            initial={banner}
            onSave={(item) => {
              saveBanner(item);
              notifySaved();
              bannerModal.close();
            }}
          />
        ) : null}
      </Modal>
      <Modal opened={couponOpen} onClose={couponModal.close} title={coupon ? 'Edit coupon' : 'Add coupon'} centered>
        {couponOpen ? (
          <CouponForm
            key={coupon?.id ?? 'new'}
            initial={coupon}
            onSave={(item) => {
              saveCoupon(item);
              notifySaved('Coupon saved in this preview. It is not applied at checkout.');
              couponModal.close();
            }}
          />
        ) : null}
      </Modal>
    </Stack>
  );
}

function BannerForm({ initial, onSave }: { initial: Banner | null; onSave: (banner: Banner) => void }) {
  const form = useForm({
    initialValues: {
      title: initial?.title ?? '',
      placement: initial?.placement ?? 'Homepage hero',
      start: initial?.start ?? '',
      end: initial?.end ?? '',
      status: (initial?.status ?? 'Draft') as PublishStatus,
      image: initial?.image ?? photoChoices[0].value,
    },
    validate: { title: (value: string) => (value.trim() ? null : 'Enter a title') },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSave({
          id: initial?.id ?? nextId('b'),
          title: values.title.trim(),
          placement: values.placement,
          start: values.start || 'Today',
          end: values.end || 'Open',
          status: values.status,
          image: values.image,
        }),
      )}
    >
      <Stack>
        <TextInput label="Title" withAsterisk {...form.getInputProps('title')} />
        <Select label="Placement" data={['Homepage hero', 'Collection strip', 'Newsletter']} {...form.getInputProps('placement')} />
        <Group grow>
          <TextInput label="Starts" {...form.getInputProps('start')} />
          <TextInput label="Ends" {...form.getInputProps('end')} />
        </Group>
        <Select label="Image" data={photoChoices} allowDeselect={false} {...form.getInputProps('image')} />
        <Select label="Status" data={['Published', 'Draft']} allowDeselect={false} {...form.getInputProps('status')} />
        <Group justify="flex-end">
          <Button type="submit">Save banner</Button>
        </Group>
      </Stack>
    </form>
  );
}

function CouponForm({ initial, onSave }: { initial: Coupon | null; onSave: (coupon: Coupon) => void }) {
  const form = useForm({
    initialValues: {
      code: initial?.code ?? '',
      detail: initial?.detail ?? '',
      expires: initial?.expires ?? '',
      status: (initial?.status ?? 'Draft') as PublishStatus,
    },
    validate: { code: (value: string) => (value.trim() ? null : 'Enter a code') },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSave({
          id: initial?.id ?? nextId('cp'),
          code: values.code.trim().toUpperCase(),
          detail: values.detail.trim(),
          expires: values.expires || 'Open',
          status: values.status,
        }),
      )}
    >
      <Stack>
        <TextInput label="Code" withAsterisk {...form.getInputProps('code')} />
        <TextInput label="Detail" {...form.getInputProps('detail')} />
        <TextInput label="Expires" {...form.getInputProps('expires')} />
        <Select label="Status" data={['Published', 'Draft']} allowDeselect={false} {...form.getInputProps('status')} />
        <Group justify="flex-end">
          <Button type="submit">Save coupon</Button>
        </Group>
      </Stack>
    </form>
  );
}

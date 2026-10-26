import { Button, Group, NumberInput, Paper, Select, Stack, Switch, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { photoChoices } from '../data/demo.ts';
import { useStore } from '../context/store.tsx';
import type { Product, PublishStatus } from '../types/admin.ts';
import { nextId } from '../utils/id.ts';
import { notifySaved } from '../utils/notify.ts';

interface Draft {
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  stock: number;
  sold: number;
  status: PublishStatus;
  image: string;
  description: string;
  featured: boolean;
  trending: boolean;
}

function toDraft(product: Product | undefined): Draft {
  return {
    name: product?.name ?? '',
    sku: product?.sku ?? '',
    categoryId: product?.categoryId ?? '',
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    sold: product?.sold ?? 0,
    status: product?.status ?? 'Draft',
    image: product?.image ?? photoChoices[0].value,
    description: product?.description ?? '',
    featured: product?.featured ?? false,
    trending: product?.trending ?? false,
  };
}

export function ProductFormPage() {
  const { productId } = useParams();
  return <ProductEditor key={productId ?? 'new'} productId={productId} />;
}

function ProductEditor({ productId }: { productId: string | undefined }) {
  const { products, categories, saveProduct } = useStore();
  const navigate = useNavigate();
  const existing = products.find((item) => item.id === productId);
  const creating = !productId;
  const form = useForm<Draft>({
    initialValues: toDraft(existing),
    validate: {
      name: (value) => (value.trim().length > 1 ? null : 'Enter a product name'),
      categoryId: (value) => (value ? null : 'Choose a category'),
      price: (value) => (value > 0 ? null : 'Enter a price'),
      stock: (value) => (value >= 0 ? null : 'Stock cannot be negative'),
    },
  });

  if (productId && !existing) {
    return (
      <Stack>
        <Title order={2}>Product not found</Title>
        <Button component={Link} to="/products" variant="light">
          Back to products
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="lg" maw={860}>
      <div>
        <Title order={2} c="#173F3D">
          {creating ? 'Add product' : 'Edit product'}
        </Title>
        <Text c="dimmed" size="sm" mt={4}>
          Variants, SEO and a real image upload are not connected. Choose a studio photo already in this preview.
        </Text>
      </div>
      <Paper withBorder p="lg" radius="md" bg="white">
        <form
          onSubmit={form.onSubmit((values) => {
            saveProduct({
              id: existing?.id ?? nextId('p'),
              name: values.name.trim(),
              sku: values.sku.trim() || `VL-${nextId('SKU')}`,
              categoryId: values.categoryId,
              price: values.price,
              stock: values.stock,
              sold: values.sold,
              status: values.status,
              image: values.image,
              description: values.description.trim(),
              featured: values.featured,
              trending: values.trending,
            });
            notifySaved();
            navigate('/products');
          })}
        >
          <Stack>
            <TextInput label="Product name" withAsterisk {...form.getInputProps('name')} />
            <Group grow align="flex-start">
              <TextInput label="SKU" placeholder="VL-NEW-01" {...form.getInputProps('sku')} />
              <Select
                label="Category"
                withAsterisk
                data={categories.map((item) => ({ value: item.id, label: item.name }))}
                {...form.getInputProps('categoryId')}
              />
            </Group>
            <Group grow align="flex-start">
              <NumberInput label="Price (INR)" min={0} withAsterisk {...form.getInputProps('price')} />
              <NumberInput label="Stock" min={0} {...form.getInputProps('stock')} />
              <Select label="Status" data={['Published', 'Draft']} allowDeselect={false} {...form.getInputProps('status')} />
            </Group>
            <Select label="Photograph" data={photoChoices} allowDeselect={false} {...form.getInputProps('image')} />
            <img src={form.values.image} alt="" width={280} height={180} style={{ width: 280, height: 180, objectFit: 'cover', borderRadius: 10, background: '#F7F0E8' }} />
            <Textarea label="Description" minRows={3} {...form.getInputProps('description')} />
            <Group>
              <Switch label="Featured on the homepage" {...form.getInputProps('featured', { type: 'checkbox' })} />
              <Switch label="Trending pick" {...form.getInputProps('trending', { type: 'checkbox' })} />
            </Group>
            <Group justify="flex-end">
              <Button component={Link} to="/products" variant="default">
                Cancel
              </Button>
              <Button type="submit">{creating ? 'Save product' : 'Update product'}</Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}

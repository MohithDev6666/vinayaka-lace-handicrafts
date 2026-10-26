import { Group, Paper, SimpleGrid, Stack, Switch, Text } from '@mantine/core';
import { PageHeading } from '../components/PageHeading.tsx';
import { Thumb } from '../components/Thumb.tsx';
import { useStore } from '../context/store.tsx';
import { notifySaved } from '../utils/notify.ts';

export function PicksPage() {
  const { products, saveProduct } = useStore();
  const featured = products.filter((product) => product.featured);
  const trending = products.filter((product) => product.trending);

  return (
    <Stack gap="lg">
      <PageHeading
        title="Featured & trending"
        description="Curate the two product rows on the homepage. Trending here is a hand-picked list, not a ranking from real sales."
      />
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Paper withBorder p="md" radius="md" bg="white">
          <Text fw={600} mb="sm">
            Featured ({featured.length})
          </Text>
          <Stack gap="sm">
            {products.map((product) => (
              <Group key={product.id} justify="space-between" wrap="nowrap">
                <Group gap="sm" wrap="nowrap">
                  <Thumb src={product.image} alt="" />
                  <Text size="sm">{product.name}</Text>
                </Group>
                <Switch
                  aria-label={`Feature ${product.name}`}
                  checked={product.featured}
                  onChange={(event) => {
                    saveProduct({ ...product, featured: event.currentTarget.checked });
                    notifySaved();
                  }}
                />
              </Group>
            ))}
          </Stack>
        </Paper>
        <Paper withBorder p="md" radius="md" bg="white">
          <Text fw={600} mb="sm">
            Trending picks ({trending.length})
          </Text>
          <Stack gap="sm">
            {products.map((product) => (
              <Group key={product.id} justify="space-between" wrap="nowrap">
                <Group gap="sm" wrap="nowrap">
                  <Thumb src={product.image} alt="" />
                  <Text size="sm">{product.name}</Text>
                </Group>
                <Switch
                  aria-label={`Trend ${product.name}`}
                  checked={product.trending}
                  onChange={(event) => {
                    saveProduct({ ...product, trending: event.currentTarget.checked });
                    notifySaved();
                  }}
                />
              </Group>
            ))}
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}

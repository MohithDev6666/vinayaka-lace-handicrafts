import { Group, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Group justify="space-between" align="flex-end" wrap="wrap" gap="sm">
      <div>
        <Title order={2} c="#173F3D">
          {title}
        </Title>
        <Text c="dimmed" size="sm" maw={640} mt={4}>
          {description}
        </Text>
      </div>
      {action}
    </Group>
  );
}

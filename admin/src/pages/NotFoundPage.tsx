import { Button, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Stack>
      <Title order={2} c="#173F3D">
        That screen is not in the dashboard
      </Title>
      <Text c="dimmed">Use the sidebar to open a module.</Text>
      <Button component={Link} to="/" w="fit-content">
        Back to dashboard
      </Button>
    </Stack>
  );
}

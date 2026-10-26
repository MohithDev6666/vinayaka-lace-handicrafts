import { Badge } from '@mantine/core';

const colors: Record<string, string> = {
  Published: 'teal',
  Active: 'teal',
  Paid: 'teal',
  Delivered: 'teal',
  OK: 'teal',
  Draft: 'gray',
  Hidden: 'gray',
  Inactive: 'gray',
  Pending: 'yellow',
  Shipped: 'blue',
  Refunded: 'red',
  Cancelled: 'red',
  'Low stock': 'orange',
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <Badge variant="light" color={colors[value] ?? 'gray'} radius="sm">
      {value}
    </Badge>
  );
}

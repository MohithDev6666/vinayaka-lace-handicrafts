import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  AppShell,
  Autocomplete,
  Avatar,
  Breadcrumbs,
  Burger,
  Group,
  Menu,
  Popover,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrandMark } from '../components/BrandMark.tsx';
import { ModuleIcon } from '../components/ModuleIcon.tsx';
import { useAuth } from '../context/auth.tsx';
import { crumbsFor, moduleGroups, modules } from '../routes/modules.ts';
import styles from './AdminLayout.module.css';

const notices = [
  '2 sample orders are still pending.',
  'Kids dress and fridge cover photographs are not in the library yet.',
  'Newsletter addresses on the storefront are not saved to this list.',
];

function isCurrent(pathname: string, to: string, end?: boolean) {
  if (end || to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AdminLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const [noticeOpened, setNoticeOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const crumbs = crumbsFor(location.pathname);
  const current = crumbs[crumbs.length - 1]?.label ?? 'Admin';
  useEffect(() => {
    document.title = `${current} | Vinayaka Admin`;
  }, [current]);

  return (
    <AppShell
      layout="alt"
      header={{ height: 68 }}
      navbar={{ width: 276, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="lg"
      styles={{
        main: { background: '#F6F1EA', minHeight: '100vh' },
        header: { background: '#fff', borderBottom: '1px solid #E6E4E0' },
        navbar: { background: '#fff', borderRight: '1px solid #E6E4E0' },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="#173F3D" aria-label="Open menu" />
            <Breadcrumbs separator="/" style={{ flexWrap: 'nowrap' }}>
              {crumbs.map((crumb, index) =>
                crumb.to && index < crumbs.length - 1 ? (
                  <Anchor key={`${crumb.label}-${index}`} component={Link} to={crumb.to} size="sm" c="dimmed">
                    {crumb.label}
                  </Anchor>
                ) : (
                  <Text key={`${crumb.label}-${index}`} size="sm" c="#173F3D" fw={600}>
                    {crumb.label}
                  </Text>
                ),
              )}
            </Breadcrumbs>
          </Group>
          <Group gap="sm" wrap="nowrap">
            <Autocomplete
              visibleFrom="sm"
              w={230}
              placeholder="Search modules"
              data={modules.map((item) => item.label)}
              onOptionSubmit={(label) => {
                const match = modules.find((item) => item.label === label);
                if (match) navigate(match.to);
              }}
              aria-label="Search modules"
            />
            <Popover opened={noticeOpened} onChange={setNoticeOpened} position="bottom-end" width={280} shadow="md">
              <Popover.Target>
                <ActionIcon variant="subtle" color="vinayaka" size="lg" aria-label="Preview notices" onClick={() => setNoticeOpened((open) => !open)}>
                  <ModuleIcon name="mail" />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Text fw={600} size="sm" mb={8}>
                  Preview notices
                </Text>
                <Stack gap={8}>
                  {notices.map((notice) => (
                    <Text key={notice} size="sm" c="dimmed">
                      {notice}
                    </Text>
                  ))}
                </Stack>
              </Popover.Dropdown>
            </Popover>
            <Menu position="bottom-end" width={230} shadow="md">
              <Menu.Target>
                <ActionIcon variant="subtle" color="vinayaka" size="lg" aria-label="Account menu" w="auto" px={4}>
                  <Group gap={8} wrap="nowrap">
                    <Avatar color="vinayaka" radius="xl" size={32}>
                      VA
                    </Avatar>
                    <Text visibleFrom="md" size="sm" c="#173F3D">
                      {session?.name ?? 'Admin'}
                    </Text>
                  </Group>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{session?.role ?? 'Studio admin'}</Menu.Label>
                <Menu.Item disabled>{session?.email}</Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  onClick={() => {
                    signOut();
                    navigate('/login');
                  }}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Link to="/" className={styles.brand} onClick={close}>
            <BrandMark size={40} />
            <span>
              <span className={styles.name}>Vinayaka</span>
              <span className={styles.sub}>New Lace Handicrafts</span>
            </span>
          </Link>
        </AppShell.Section>
        <AppShell.Section grow style={{ overflowY: 'auto', minHeight: 0 }} component="nav" aria-label="Admin modules">
          {moduleGroups.map((group) => (
            <div key={group}>
              <div className={styles.group}>{group}</div>
              {modules
                .filter((item) => item.group === group)
                .map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={close}
                    style={{ textDecoration: 'none' }}
                  >
                    {({ isActive }) => (
                      <Group
                        gap={10}
                        px={10}
                        py={8}
                        mb={2}
                        wrap="nowrap"
                        style={{
                          borderRadius: 8,
                          color: isActive || isCurrent(location.pathname, item.to, item.end) ? '#173F3D' : '#3E514E',
                          background: isActive || isCurrent(location.pathname, item.to, item.end) ? '#F4F8F7' : 'transparent',
                          fontWeight: isActive || isCurrent(location.pathname, item.to, item.end) ? 600 : 500,
                          fontSize: 14,
                        }}
                      >
                        <ModuleIcon name={item.icon} />
                        <span>{item.label}</span>
                      </Group>
                    )}
                  </NavLink>
                ))}
            </div>
          ))}
        </AppShell.Section>
        <AppShell.Section>
          <p className={styles.note}>30 years of handmade craft. This dashboard uses preview data only.</p>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

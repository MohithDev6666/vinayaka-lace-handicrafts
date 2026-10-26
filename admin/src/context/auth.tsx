import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AdminSession } from '../types/admin.ts';

const STORAGE_KEY = 'vinayaka-admin-preview';

interface AuthValue {
  session: AdminSession | null;
  signIn: (session: AdminSession, remember: boolean) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

function isSession(value: unknown): value is AdminSession {
  if (!value || typeof value !== 'object') return false;
  const row = value as Record<string, unknown>;
  return typeof row.name === 'string' && typeof row.email === 'string' && typeof row.role === 'string';
}

function readSession(): AdminSession | null {
  const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(readSession);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      signIn: (next, remember) => {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
        const store = remember ? localStorage : sessionStorage;
        store.setItem(STORAGE_KEY, JSON.stringify(next));
        setSession(next);
      },
      signOut: () => {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
        setSession(null);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}

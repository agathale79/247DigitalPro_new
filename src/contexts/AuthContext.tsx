"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { fetchProfile, type AuditProfile } from "@/lib/api/audit";
import { getFirebaseAuth, getFirebaseInitError } from "@/lib/firebase";

type AuthContextValue = {
  user: User | null;
  idToken: string | null;
  loading: boolean;
  firebaseError: string | null;
  profile: AuditProfile | null;
  refreshProfile: () => Promise<AuditProfile | null>;
};

const AuthCtx = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [profile, setProfile] = useState<AuditProfile | null>(null);

  const refreshProfile = useCallback(async () => {
    const auth = getFirebaseAuth();
    const u = auth?.currentUser;
    if (!u) {
      setProfile(null);
      return null;
    }
    const token = await u.getIdToken();
    try {
      const j = await fetchProfile(token);
      setProfile(j);
      return j;
    } catch {
      setProfile({
        uid: u.uid,
        displayName: u.displayName ?? null,
        phone: u.phoneNumber ?? null,
        company: null,
        email: u.email ?? null,
      });
      return null;
    }
  }, []);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const initErr = getFirebaseInitError();
    if (!auth) {
      setFirebaseError(initErr ?? "Firebase Auth not initialized");
      setUser(null);
      setIdToken(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const t = await u.getIdToken();
        setIdToken(t);
        await refreshProfile();
      } else {
        setIdToken(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [refreshProfile]);

  const value = useMemo(
    () => ({
      user,
      idToken,
      loading,
      firebaseError,
      profile,
      refreshProfile,
    }),
    [user, idToken, loading, firebaseError, profile, refreshProfile]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(): AuthContextValue {
  const v = useContext(AuthCtx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}

"use client";

import { useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Admin auth hook:
 * - Observes Firebase auth state.
 * - Only allows users with custom claim `admin: true`.
 * - Signs out non-admin authenticated users to protect admin pages.
 * - Strictly avoids calling signOut/onAuthStateChanged with null auth.
 */
export function useAdminAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    // If your firebase module exports `auth` as Auth | null,
    // guard it before using it.
    if (!auth) {
      if (alive) {
        setUser(null);
        setLoading(false);
      }
      return () => {
        alive = false;
      };
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (!alive) return;

        if (currentUser) {
          const tokenResult = await currentUser.getIdTokenResult();
          const isAdmin = Boolean((tokenResult.claims as any)?.admin);

          if (isAdmin) {
            setUser(currentUser);
          } else {
            // auth is guaranteed non-null here due to guard above
            await signOut(auth);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch {
        // If anything goes wrong, fail closed
        if (!alive) return;
        try {
          await signOut(auth);
        } catch {
          // ignore secondary failures
        }
        setUser(null);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    });

    return () => {
      alive = false;
      unsubscribe();
    };
  }, []);

  return { user, loading };
}

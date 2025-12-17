"use client";

import { useEffect, useMemo, useState } from "react";
import { database } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import type { ChatSession } from "@/lib/admin/types";

export function useChatSessions(user: any) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    if (!user || !database) return;

    const sessionsRef = ref(database, "chats");
    const unsubscribe = onValue(sessionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sessionList: ChatSession[] = Object.entries(data).map(
          ([id, session]: [string, any]) => ({
            id,
            customerName: session.customerName || "Anonymous",
            customerEmail: session.customerEmail || "",
            customerPhone: session.customerPhone || "",
            lastMessage: session.lastMessage || "",
            lastMessageTime: session.lastMessageTime || 0,
            unreadCount: session.unreadCount || 0,
            status: session.status || "active",
          })
        );

        sessionList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
        setSessions(sessionList);
      } else {
        setSessions([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const unreadSessionsCount = useMemo(
    () => sessions.filter((s) => s.unreadCount > 0).length,
    [sessions]
  );

  return { sessions, unreadSessionsCount };
}

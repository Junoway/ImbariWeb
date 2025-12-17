"use client";

import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { onValue, query, ref, orderByChild, update } from "firebase/database";
import type { Message, ChatSession } from "@/lib/admin/types";

export function useChatMessages(
  user: any,
  selectedSession: string | null,
  sessions: ChatSession[]
) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!selectedSession || !user || !database) return;

    const messagesRef = ref(database, `chats/${selectedSession}/messages`);
    const messagesQuery = query(messagesRef, orderByChild("timestamp"));

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList: Message[] = Object.entries(data).map(
          ([id, msg]: [string, any]) => ({
            id,
            text: msg.text,
            from: msg.from,
            timestamp: msg.timestamp,
            customerName: msg.customerName,
            customerEmail: msg.customerEmail,
            customerPhone: msg.customerPhone,
            read: msg.read,
          })
        );

        messageList.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messageList);

        // Mark messages as read
        messageList.forEach((msg) => {
          if (msg.from === "customer" && !msg.read) {
            const msgRef = ref(
              database,
              `chats/${selectedSession}/messages/${msg.id}`
            );
            update(msgRef, { read: true });
          }
        });

        // Reset session unreadCount (same logic you had, but reliable)
        const session = sessions.find((s) => s.id === selectedSession);
        if (session) {
          const sessionRef = ref(database, `chats/${selectedSession}`);
          update(sessionRef, { unreadCount: 0 });
        }
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [selectedSession, user, sessions]);

  return { messages };
}

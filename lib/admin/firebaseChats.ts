import { database } from "@/lib/firebase";
import { push, ref, set, update } from "firebase/database";

export async function sendChatReply(sessionId: string, chatReply: string) {
  if (!chatReply.trim() || !database) return;

  const messagesRef = ref(database, `chats/${sessionId}/messages`);
  const newMessageRef = push(messagesRef);

  const now = Date.now();

  await set(newMessageRef, {
    text: chatReply.trim(),
    from: "admin",
    timestamp: now,
    read: false,
  });

  const sessionRef = ref(database, `chats/${sessionId}`);
  await update(sessionRef, {
    lastMessage: chatReply.trim(),
    lastMessageTime: now,
  });
}

export async function markChatAsResolved(sessionId: string) {
  if (!database) return;
  const sessionRef = ref(database, `chats/${sessionId}`);
  await update(sessionRef, { status: "resolved" });
}

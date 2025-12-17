export type Message = {
  id: string;
  text: string;
  from: "customer" | "admin";
  timestamp: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  read?: boolean;
};

export type ChatSession = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  status: "active" | "resolved";
};

export type Review = {
  id: string;
  productId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  timestamp: number;
  response?: string;
  responseTimestamp?: number;
  status?: "pending" | "responded";
};

export type SaleOrder = {
  sessionId?: string;
  timestamp?: number;
  status?: "success" | "failed" | "pending" | string;
  total?: number;
  items?: { name: string; quantity: number }[];
  error?: string;
  [key: string]: any;
};

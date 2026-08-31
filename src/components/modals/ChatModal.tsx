"use client";

import { useState, useRef, useEffect } from "react";
import UserAvatar from "../common/UserAvatar";

interface Message {
  id: number;
  sender: "user" | "seller";
  text: string;
  time: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName?: string;
  sellerAvatar?: string;
  gigTitle?: string;
}

const ChatModal = ({ isOpen, onClose, sellerName = "Seller", sellerAvatar, gigTitle }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "seller",
      text: `Hi there! Thanks for your interest in "${gigTitle || "my service"}". How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTimeout(() => {
      const sellerReply: Message = {
        id: (Date.now() + 1),
        sender: "seller",
        text: "Got your message! I will check the details and get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, sellerReply]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="flex h-135 w-full max-w-lg flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/40">
          <div className="flex items-center gap-3">
            <UserAvatar src={sellerAvatar} name={sellerName} size={40} />
            <div>
              <h3 className="font-bold text-foreground">{sellerName}</h3>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" /> Offline
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-accent text-accent-foreground rounded-br-xs"
                    : "bg-muted text-foreground rounded-bl-xs"
                }`}
              >
                {msg.text}
              </div>
              <span className="mt-1 text-[10px] text-muted-foreground px-1">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="border-t border-border p-4 bg-muted/20 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
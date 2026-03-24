"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import type { Message, Contact } from "@/types";
import { Icon } from "./Icon";
import { Avatar } from "./ui";

const CONTACTS: Contact[] = [
  { id: 0, name: "John Smith",  preview: "I am a final-year medical..." },
  { id: 1, name: "Admin",       preview: "I am a final-year medical..." },
  { id: 2, name: "John Smith",  preview: "I am a final-year medical..." },
  { id: 3, name: "John Smith",  preview: "I am a final-year medical..." },
  { id: 4, name: "John Smith",  preview: "I am a final-year medical..." },
  { id: 5, name: "John Smith",  preview: "I am a final-year medical..." },
  { id: 6, name: "John Smith",  preview: "I am a final-year medical..." },
];

const SAMPLE_TEXT =
  "I am a final-year medical student who is very interested in cardiology. I have completed my internal";

const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: "me",   text: SAMPLE_TEXT, time: "10:32 AM" },
  { id: 2, from: "them", text: SAMPLE_TEXT, time: "10:32 AM" },
  { id: 3, from: "me",   text: SAMPLE_TEXT, time: "10:32 AM" },
];

export function Messages() {
  const [activeContact, setActiveContact] = useState(1);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text, time },
    ]);
    setInput("");

    // Simulate a reply after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "them",
          text: "Thank you for your message. We will review your application shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const activeContactData = CONTACTS.find((c) => c.id === activeContact);

  return (
    <div
      className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
      style={{ height: "calc(100vh - 130px)" }}
    >
      {/* Contact sidebar */}
      <aside className="w-full md:w-64 border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-gray-50">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
            <Icon
              path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              className="w-4 h-4 text-gray-400 flex-shrink-0"
            />
            <input
              type="search"
              placeholder="Search Name..."
              className="bg-transparent text-sm outline-none w-full placeholder-gray-400 text-gray-700"
              value={contactSearch}
              onChange={(e) => setContactSearch(e.target.value)}
              aria-label="Search contacts"
            />
          </div>
        </div>

        <ul className="flex-1 overflow-auto" role="listbox" aria-label="Contacts">
          {filteredContacts.map((contact) => {
            const isActive = activeContact === contact.id;
            return (
              <li key={contact.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => setActiveContact(contact.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors ${
                    isActive ? "bg-teal-50 border-r-2 border-teal-500" : ""
                  }`}
                >
                  <Avatar size="w-9 h-9" />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold leading-tight ${isActive ? "text-teal-700" : "text-gray-800"}`}>
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{contact.preview}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3 bg-white">
          <Avatar size="w-9 h-9" />
          <div>
            <p className="font-semibold text-gray-800 text-sm leading-tight">
              {activeContactData?.name ?? "Unknown"}
            </p>
            <p className="text-xs text-teal-500">Online</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600"
              aria-label="Call"
            >
              <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </button>
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600"
              aria-label="More options"
            >
              <Icon path="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-auto p-4 space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.from === "them" && <Avatar size="w-7 h-7" />}

              <div
                className={`max-w-xs lg:max-w-sm rounded-2xl px-4 py-2.5 ${
                  msg.from === "me"
                    ? "bg-teal-500 text-white rounded-br-sm"
                    : "bg-gray-800 text-white rounded-bl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p
                  className={`text-xs mt-1 text-right ${
                    msg.from === "me" ? "text-teal-100" : "text-gray-400"
                  }`}
                >
                  {msg.time}
                </p>
              </div>

              {msg.from === "me" && <Avatar size="w-7 h-7" src="https://i.pravatar.cc/28?img=50" />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              aria-label="Type a message"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-2.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              aria-label="Send message"
            >
              <Icon path="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile contact list overlay */}
      {activeContact === null && (
        <div className="md:hidden flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-50">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
              <Icon
                path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                className="w-4 h-4 text-gray-400 flex-shrink-0"
              />
              <input
                type="search"
                placeholder="Search Name..."
                className="bg-transparent text-sm outline-none w-full placeholder-gray-400 text-gray-700"
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                aria-label="Search contacts"
              />
            </div>
          </div>

          <ul className="flex-1 overflow-auto" role="listbox" aria-label="Contacts">
            {filteredContacts.map((contact) => (
              <li key={contact.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => setActiveContact(contact.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                >
                  <Avatar size="w-9 h-9" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{contact.name}</p>
                    <p className="text-sm text-gray-400 truncate">{contact.preview}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

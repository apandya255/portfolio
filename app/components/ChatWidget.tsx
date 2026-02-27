'use client';

import { FormEvent, useRef, useState } from 'react';

type Role = 'user' | 'assistant';

type ChatMessage = {
  role: Role;
  content: string;
};

const toPlainText = (text: string) => text.replaceAll('**', '');

const starterPrompts = [
  'What fintech experience does Akash have?',
  "Summarize Akash's strongest projects.",
  'What technologies does Akash use most?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi, I'm Akash's AI assistant. Ask me about his experience, projects, or technical skills.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const askQuestion = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: question.trim() }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch chat response');
      }

      const reply = toPlainText(data.reply?.trim() || 'I could not generate a response. Please try again.');
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'I ran into an issue connecting to the AI service. Please verify the chat API setup and try again.';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await askQuestion(input);
  };

  const openWidget = () => {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 60);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      {isOpen ? (
        <div className="w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl shadow-slate-400/30">
          <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Ask About Akash</p>
              <p className="text-[11px] text-slate-200">AI Portfolio Assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-1 text-sm text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[52vh] space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((message, idx) => (
              <div
                key={`${message.role}-${idx}`}
                className={`max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'assistant'
                    ? 'bg-white text-slate-700 border border-slate-200'
                    : 'ml-auto bg-slate-900 text-white'
                }`}
              >
                {message.content}
              </div>
            ))}

            {isLoading ? (
              <div className="max-w-[92%] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
                Thinking...
              </div>
            ) : null}
          </div>

          {messages.length < 3 ? (
            <div className="flex flex-wrap gap-2 border-t border-slate-200 bg-white px-4 py-3">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => askQuestion(prompt)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-slate-200 bg-white p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none ring-slate-400 placeholder:text-slate-400 focus:ring-2"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={openWidget}
          className="rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-500/40 transition hover:-translate-y-0.5 hover:shadow-2xl"
        >
          Chat with AI
        </button>
      )}
    </div>
  );
}

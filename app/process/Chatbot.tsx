"use client";

import React, { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import CryptoJS from "crypto-js";

interface ChatbotProps {
  videoUrl: string;
  isChatbotExpanded: boolean;
  setIsChatbotExpanded: (expanded: boolean) => void;
}

interface Message {
  role: "user" | "model";
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ videoUrl, isChatbotExpanded, setIsChatbotExpanded }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [chat, setChat] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const text = await handleEncrypt();
        if (text) {
          await initializeChat(text);
        } else {
          throw new Error("Failed to encrypt transcript");
        }
      } catch (error) {
        console.error("Error fetching transcript:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTranscript();
  }, [videoUrl]);

   const handleEncrypt = async () => {
    try {
        const response = await fetch('https://youtube-timestamp-generator-production.up.railway.app/text',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({videoUrl}),
              }
         );

        if (!response.ok) {
            throw new Error('Failed to encrypt text');
        }

        const data: { encryptedText: string } = await response.json();
        return handleDecrypt(data.encryptedText);
    } catch (error) {
        console.error('Encryption failed:', error);
    }
};

const handleDecrypt = (encryptedText : string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, process.env.NEXT_PUBLIC_SECRET_KEY!);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;

    } catch (error) {
        console.error('Decryption failed:', error);
    }
};

  

  const initializeChat = async (text:string) => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_URL!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const newChat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: text,
              },
            ],
          },
        ],
      });

      setChat(newChat);
      setMessages([
        {
          role: "model",
          text: "Hello! I'm Tube Help, how can I help you today?",
        }
      ])
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !chat) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setLoading(true);
      const result = await chat.sendMessage(input);
      const modelMessage: Message = { role: "model", text: result.response.text() };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-[100vh] bg-white flex-col md:relative text-sm fixed top-0 left-0 items-center justify-center  md:w-auto w-screen md:h-[400px]">
      <div className="h-[90vh] flex justify-between flex-col md:w-[300px] w-screen md:h-[400px] bg-white shadow-md rounded-md p-4">
        <div className="w-full flex justify-between gap-4">
          <div className="bg-black text-white p-2 w-full rounded-md">Tube Help Bot!</div>
          {isChatbotExpanded && (
            <button
              onClick={() => setIsChatbotExpanded(!isChatbotExpanded)}
              className="bg-black text-white p-2 px-3 rounded-sm"
            >
              x
            </button>
          )}
        </div>

        <div>
          {/* Chat Section */}
          <div
            ref={chatContainerRef}
            className="flex flex-col space-y-2 md:h-[250px] overflow-y-auto no-scrollbar pb-2 mb-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.role === "user" ? "text-right text-gray-800" : "text-left text-gray-800"
                }`}
              >
                <p className="px-4 py-2 inline-block rounded-lg bg-gray-100">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </p>
              </div>
            ))}
            {loading && <Loader2 className="h-4 w-4 text-black animate-spin" />}
          </div>

          {/* Message Input Section */}
          <div className="flex border-t justify-between border-gray-200 pt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="px-4 py-2 border w-full rounded-l-md focus:outline-none"
              placeholder="Ask a question..."
              disabled={!chat}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-700"
              disabled={!chat}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

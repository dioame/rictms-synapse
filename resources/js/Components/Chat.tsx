import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ sender: string; text: string; typing?: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [model, setModel] = useState("gemini"); // Default model
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: "You", text: message };
    setChat((prevChat) => [...prevChat, userMessage]);

    setIsTyping(true);
    setChat((prevChat) => [...prevChat, { sender: "Marwen AI", text: "Typing...", typing: true }]);

    try {
      const formData = new FormData();
      formData.append("text", message);
      formData.append("model", model);

      const response = await axios.post(route("openai.generate-text"), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setChat((prevChat) => [
        ...prevChat.filter((msg) => !msg.typing),
        { sender: "Marwen AI", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChat((prevChat) => [
        ...prevChat.filter((msg) => !msg.typing),
        { sender: "Marwen AI", text: "Error processing your request." },
      ]);
    }

    setIsTyping(false);
    setMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col w-full h-[400px] max-w-md mx-auto bg-white rounded-lg p-4">
      {/* Model Selection */}
      <div className="mb-2">
        <label className="block text-gray-700 font-medium text-sm">Choose AI Model:</label>
        <select
          className="p-2 border rounded-lg w-full text-sm"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gemini">Gemini (Google)</option>
          <option value="gpt">GPT (OpenAI)</option>
        </select>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 border rounded bg-gray-100">
        {chat.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-lg max-w-[75%] ${
              msg.sender === "You" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-gray-900"
            }`}
          >
            <strong>{msg.sender}:</strong>
            <div className="whitespace-pre-wrap mt-1 text-sm leading-relaxed">{msg.text}</div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input & Send Button */}
      <form onSubmit={sendMessage} className="flex mt-2">
        <textarea
        
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-l-lg text-sm"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

import { useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Chat = ({ auth }: any) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ sender: string; text: string; typing?: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [model, setModel] = useState("gemini"); // Default model

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
      formData.append("model", model); // Pass selected model (GPT or Gemini)

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

  return (
    <AuthenticatedLayout auth_user={auth.user}>

            {/* Model Selection */}
    <div className="mb-2 w-[200px]">
          <label className="block text-gray-700 font-medium">Choose AI Model:</label>
          <select
            className="p-2 border rounded-lg w-full"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
             <option value="gemini">Gemini (Google)</option>
            <option value="gpt">GPT (OpenAI)</option>
           
          </select>
        </div>

      <div className="flex flex-col w-full h-full max-w-full mx-auto bg-white shadow-lg rounded-lg p-4">
        <div className="flex-1 overflow-y-auto border-b p-2 space-y-2">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-900 self-start"
              }`}
            >
              <strong>{msg.sender}:</strong>
              <div className="whitespace-pre-wrap mt-1 text-sm leading-relaxed">{msg.text}</div>
            </div>
          ))}
        </div>

    

        {/* Input and Send Button */}
        <form onSubmit={sendMessage} className="flex mt-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-lg"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-lg">
            Send
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Chat;

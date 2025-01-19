"use client";
import { useState } from "react";

export default function Rag_comp() {
  const [textInp, setTextInp] = useState("");
  const [responseText, setResponseText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textInp.trim()) return;

    try {
      const res = await fetch(
        "https://tan4585-langflow-social-media.hf.space/api/v1/run/455cc53c-7e5e-421d-884d-0efcd6afb410?stream=false",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer <TOKEN>",
            "Content-Type": "application/json",
            "x-api-key": "sk-I7jRcbJ_rXWCJYEpzq6iBf9pwmhKZOXWhgpHxxQgvdo",
          },
          body: JSON.stringify({
            input_value: textInp,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "ChatInput-YOpvV": {},
              "AstraDB-DSSGm": {},
              "TextOutput-PJYkJ": {},
              "ParseData-k12Cc": {},
              "GroqModel-U6NDA": {},
              "CombineText-Bqy5O": {},
              "ChatOutput-lcd2w": {},
              "PerplexityModel-kgHCl": {},
            },
          }),
        }
      );

      const data = await res.json();
      const extractedText =
      data.outputs[0].outputs[0].artifacts.message ||
        "No response text available.";
      setResponseText(extractedText);
    } catch (error) {
      console.error("Error:", error);
      setResponseText("Error fetching response. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Chat display area */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-4 min-h-[60vh] text-white">
            <h2 className="text-center font-semibold- text-2xl">ATR Finder</h2>
            {responseText && (
              <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                {responseText}
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <form className="flex gap-4">
              <input
                type="text"
                value={textInp}
                onChange={(e) => setTextInp(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit" onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useContext } from 'react';
import { GoogleGenAI } from '@google/genai';
import DarkVeil from '../../../DarkVeil/DarkVeil';
import { MemoryContext } from '../../../Context/maincontext.jsx';

const Chat = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [useMemory, setUseMemory] = useState(false);
  const { memoryData } = useContext(MemoryContext);

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    let finalPrompt = input;
    if (useMemory) {
      const { wyd, know, trait, structuredData } = memoryData;
      const documentContext = structuredData
        ? `\n---\nADDITIONAL CONTEXT FROM UPLOADED DOCUMENT:\nThis document contains detailed information about me (e.g., my resume). Use this information to provide highly personalized and accurate answers.\n${JSON.stringify(structuredData, null, 2)}`
        : '';

      const memoryPrompt = `Based on the following information about me, please answer my question.
      
---
USER PROFILE:
- What I do: ${wyd || "Not specified."}
- Important things for you to know: ${know || "Not specified."}  
- The traits you should adopt: ${trait || "Act as a helpful assistant."}
${documentContext}
---

My question is: ${input}`;

      finalPrompt = memoryPrompt.trim();
    }

    setMessages(prevMessages => [...prevMessages, { role: "bot", content: "" }]);

    try {
      const ai = new GoogleGenAI({ apiKey: "AIzaSyD6fH3N-FbMj3DpqLuv4YUlek8w-ZAUQuM" });
      const config = { thinkingConfig: { thinkingBudget: 0 } };
      const model = "gemini-2.5-flash-lite";
      const contents = [{ role: "user", parts: [{ text: finalPrompt }] }];
      
      const responseStream = await ai.models.generateContentStream(model, config, contents);
      
      for await (const chunk of responseStream) {
        const chunkText = chunk.text();
        if (chunkText) {
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            const lastMessageIndex = updatedMessages.length - 1;
            updatedMessages[lastMessageIndex] = {
              ...updatedMessages[lastMessageIndex],
              content: updatedMessages[lastMessageIndex].content + chunkText
            };
            return updatedMessages;
          });
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = { role: "bot", content: `Error: ${errorMessage}` };
        return updatedMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden font-sans">
      {/* Enhanced Background with Neural Network Pattern */}
      <DarkVeil className="absolute inset-0 w-full h-full z-0" />
      
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-indigo-600/20 z-[1]" />
      
      {/* Floating Particles */}
      

      {/* Main Chat Container */}
      <div className="absolute inset-0 flex justify-center items-center z-10 p-3 sm:p-6">
        <div className="flex flex-col h-[95vh] w-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl bg-white/5 border border-white/10">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-white/10 via-white/5 to-transparent border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <h1 className="text-xl font-bold text-white/90 tracking-wide bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Neural Chat
            </h1>
            <div className="w-6 h-6" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`group relative max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-3xl shadow-xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-violet-600/80 via-purple-600/60 to-violet-600/40 border-violet-500/30 text-white ml-4'
                      : 'bg-gradient-to-br from-white/15 via-white/10 to-white/5 border-white/20 text-white/95 mr-4'
                  }`}
                >
                  {/* Message Avatar */}
                  <div
                    className={`absolute -top-2 ${
                      msg.role === 'user' ? '-right-2' : '-left-2'
                    } w-9 h-9 rounded-full ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    } flex items-center justify-center text-xs font-bold text-white shadow-lg`}
                  >
                    {msg.role === 'user' ? 'U' : 'AI'}
                  </div>

                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      msg.role === 'user'
                        ? 'shadow-[0_0_30px_rgba(139,69,198,0.3)]'
                        : 'shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                    }`}
                  />

                  <div className="relative z-10 whitespace-pre-wrap break-words font-medium leading-relaxed text-sm sm:text-base">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Typing Indicator */}
            {loading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 border-white/20 border backdrop-blur-xl px-6 py-4 rounded-3xl mr-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-white/70 text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Memory Toggle */}
          <div className="flex items-center justify-center py-4 bg-gradient-to-r from-white/5 to-transparent border-t border-white/10">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  id="useMemory"
                  checked={useMemory}
                  onChange={(e) => setUseMemory(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-14 h-7 rounded-full transition-all duration-300 ${
                    useMemory
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 shadow-[0_0_20px_rgba(139,69,198,0.5)]'
                      : 'bg-white/20 border border-white/30'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 transform ${
                      useMemory ? 'translate-x-7' : 'translate-x-1'
                    } mt-1`}
                  />
                </div>
              </div>
              <span
                className={`text-base font-medium group-hover:text-white transition-colors ${
                  useMemory ? 'text-white' : 'text-white/80'
                }`}
              >
                Memory Enhancement
              </span>
            </label>
          </div>

          {/* Enhanced Input Area */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 bg-gradient-to-r from-white/10 to-white/5 border-t border-white/10">
            <div className="relative flex items-end space-x-4 p-3 rounded-2xl backdrop-blur-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 shadow-xl">
              
              {/* Input Field */}
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={handleChange}
                  placeholder="Share your thoughts..."
                  className="w-full bg-transparent text-white placeholder-white/50 resize-none outline-none py-3 px-4 rounded-xl font-medium leading-relaxed min-h-[44px] max-h-32 focus:ring-2 focus:ring-violet-500/50"
                  rows={1}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`relative overflow-hidden w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform ${
                  loading || !input.trim()
                    ? 'bg-white/10 cursor-not-allowed'
                    : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-purple-500 hover:to-violet-500 hover:scale-110 hover:shadow-[0_0_25px_rgba(139,69,198,0.6)] active:scale-95'
                }`}
                aria-label="Send message"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-xl" />
                
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className={`w-6 h-6 text-white relative z-10 transition-transform ${
                    loading ? 'animate-spin' : 'group-hover:translate-x-0.5'
                  }`}
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Chat;

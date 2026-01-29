import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, User, Flame, RefreshCw, Copy, ThumbsUp, ThumbsDown, StopCircle, ArrowUp, ArrowRight } from 'lucide-react';
import { askGemini } from '../services/gemini';
import { Logo } from './Logo';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

interface AiChatViewProps {
  initialQuery?: string;
  currentUser?: { displayName: string; avatar: string };
}

export const AiChatView: React.FC<AiChatViewProps> = ({ initialQuery, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial query from Navbar
  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (queryOverride?: string) => {
    const textToSend = queryOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate chat context by appending simple history (optional improvement)
      // For now, we use the simple askGemini which is single-turn, 
      // but UI looks like multi-turn.
      const response = await askGemini(textToSend);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "抱歉，我遇到了一些连接问题，请稍后再试。",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "如何设计一个可持续的分布式能源系统？",
    "帮我总结一下不锈钢芯板的技术优势",
    "写一段 Python 代码来分析空气质量数据",
    "为论坛的新手用户写一份欢迎指南"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-3xl mx-auto px-4 py-8">
          
          {/* Welcome Screen (Empty State) */}
          {messages.length === 0 && (
            <div className="mt-12 sm:mt-24 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-6 inline-block p-3 rounded-2xl bg-gradient-to-br from-orange-100 to-red-50 text-orange-600 shadow-sm">
                  <Flame size={32} />
               </div>
               <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-purple-600 mb-4 tracking-tight">
                 你好，{currentUser?.displayName || '探索者'}
               </h1>
               <h2 className="text-2xl sm:text-3xl text-gray-300 font-medium mb-12">
                 今天想探索什么新知识？
               </h2>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestions.map((suggestion, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all text-sm text-gray-700 font-medium group"
                    >
                       {suggestion}
                       <span className="block mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-broad-600">
                         <ArrowRight size={16} />
                       </span>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {/* Message List */}
          <div className="space-y-8">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 sm:gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar (Left) */}
                {msg.role === 'model' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shrink-0 shadow-md mt-1">
                    <Sparkles size={18} fill="currentColor" />
                  </div>
                )}

                {/* Content Bubble */}
                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${msg.role === 'user' ? 'order-first' : ''}`}>
                    {/* User Name / AI Name */}
                    <div className={`text-xs font-bold text-gray-400 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                       {msg.role === 'user' ? (currentUser?.displayName || 'You') : '火妙AI'}
                    </div>

                    <div 
                      className={`px-5 py-3.5 rounded-2xl text-[15px] leading-7 shadow-sm whitespace-pre-wrap
                        ${msg.role === 'user' 
                          ? 'bg-gray-100 text-gray-800 rounded-tr-sm' 
                          : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
                        }`}
                    >
                       {msg.content}
                    </div>

                    {/* AI Actions */}
                    {msg.role === 'model' && (
                      <div className="flex items-center gap-2 pt-1">
                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="复制">
                            <Copy size={14} />
                         </button>
                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="有帮助">
                            <ThumbsUp size={14} />
                         </button>
                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="无帮助">
                            <ThumbsDown size={14} />
                         </button>
                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors ml-auto flex items-center gap-1" onClick={() => handleSend(messages[messages.indexOf(msg)-1].content)}>
                            <RefreshCw size={14} /> <span className="text-xs">重新生成</span>
                         </button>
                      </div>
                    )}
                </div>

                {/* User Avatar (Right) */}
                {msg.role === 'user' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-200 mt-1">
                     {currentUser?.avatar ? (
                        <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500"><User size={20} /></div>
                     )}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
               <div className="flex gap-4 sm:gap-6 justify-start">
                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shrink-0 shadow-md mt-1 animate-pulse">
                    <Sparkles size={18} fill="currentColor" />
                  </div>
                  <div className="px-5 py-4 bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                     <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                     <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                     <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-white p-4 pb-6">
        <div className="max-w-3xl mx-auto relative">
           <div className="relative flex items-end gap-2 bg-gray-100 rounded-3xl p-2 pl-5 ring-1 ring-transparent focus-within:ring-orange-200 focus-within:bg-white transition-all shadow-sm">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="问点什么... (Enter 发送)"
                className="w-full max-h-[150px] min-h-[44px] py-2.5 bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-gray-900 placeholder-gray-500 custom-scrollbar"
                rows={1}
                style={{ height: 'auto', overflow: 'hidden' }}
                onInput={(e) => {
                   const target = e.target as HTMLTextAreaElement;
                   target.style.height = 'auto';
                   target.style.height = target.scrollHeight + 'px';
                }}
              />
              <div className="pb-1 pr-1">
                 <button 
                   onClick={() => handleSend()}
                   disabled={!input.trim() || isLoading}
                   className={`p-2.5 rounded-full transition-all duration-200 flex items-center justify-center ${input.trim() && !isLoading ? 'bg-black text-white hover:bg-gray-800 shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                 >
                   {isLoading ? <StopCircle size={20} className="animate-pulse" /> : <ArrowUp size={20} strokeWidth={3} />}
                 </button>
              </div>
           </div>
           <p className="text-center text-[10px] text-gray-400 mt-3">
              火妙AI 可能会产生不准确的信息，请核实重要内容。
           </p>
        </div>
      </div>
    </div>
  );
};
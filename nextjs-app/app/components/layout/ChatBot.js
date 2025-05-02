// app/components/layout/ChatBot.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, X, Sparkles, MessageCircle, PenTool, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { processUserMessage, detectLanguage } from '@/utils/chatBotUtils';
import { chatbotData } from '@/data/index';  // Updated import path
import ReactMarkdown from 'react-markdown';

export default function ChatBot() {
  const { language } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const chatScrollRef = useRef(null);

  // Initialize chat messages when component mounts or language changes
  useEffect(() => {
    setChatMessages([
      { 
        role: 'bot', 
        content: chatbotData.welcome[language] || chatbotData.welcome['en'],
        timestamp: new Date().toISOString()
      }
    ]);
    setSuggestions(chatbotData.prompts[language] || chatbotData.prompts['en']);
  }, [language]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current && chatScrollRef.current) {
      // Use a small timeout to ensure the DOM has updated
      setTimeout(() => {
        chatEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        });
      }, 100);
    }
  }, [chatMessages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isChatOpen]);

  // Manage outside clicks to close chat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target) && isChatOpen) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  const handleMessageSend = () => {
    if (!message.trim()) return;
    
    const userMessage = message.trim();
   
    // Detect language from user message
    const detectedLang = detectLanguage(userMessage, null, language);
    
    // Add user message
    setChatMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date().toISOString()
    }]);
    setMessage('');
    setIsTyping(true);
    
    // Scroll to bottom immediately after sending message
    setTimeout(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
    
    // Process message and generate response
    setTimeout(() => {
      const responseData = processUserMessage(userMessage, chatbotData, detectedLang);
      
      // Add bot response
      setChatMessages(prev => [...prev, { 
        role: 'bot', 
        content: responseData.text,
        timestamp: new Date().toISOString()
      }]);
      
      // Update suggestions and active service
      if (responseData.suggestions) {
        setSuggestions(responseData.suggestions);
      }
      
      // Try to identify service from response
      if (responseData.service) {
        setActiveService(responseData.service);
      } else if (responseData.text.startsWith('**')) {
        const serviceTitle = responseData.text.split('\n')[0].replace(/\*\*/g, '');
        const services = Object.keys(chatbotData.serviceDescriptions[detectedLang] || chatbotData.serviceDescriptions['en']);
        if (services.includes(serviceTitle)) {
          setActiveService(serviceTitle);
        }
      } else {
        setActiveService(null);
      }
      
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt) => {
    setMessage(prompt);
    // Auto-submit the prompt after a brief delay
    setTimeout(() => handleMessageSend(), 300);
  };

  // Format message content with markdown support
  const formatMessageContent = (content) => {
    return (
      <ReactMarkdown
        components={{
          strong: ({ node, ...props }) => (
            <span className="font-semibold text-blue-300" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-xl font-bold mb-2 text-white" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-lg font-bold mb-2 text-white" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-md font-bold mb-1 text-white" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-2 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-4 mb-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-1" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  // Animation variants
  const chatBubbleVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        damping: 15, 
        stiffness: 300 
      } 
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const typingIndicatorVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5
      } 
    }
  };

  const chatContainerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 350,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  const floatingButtonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const quickPromptVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (custom) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.05,
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }),
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(59, 130, 246, 0.3)",
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  // Get appropriate UI text based on language
  const getUiText = (key) => {
    return chatbotData.ui[key]?.[language] || chatbotData.ui[key]?.['en'] || key;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40" ref={containerRef}>
      {!isChatOpen && (
        <motion.button
          onClick={() => setIsChatOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg text-white overflow-hidden"
          variants={floatingButtonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          aria-label="Open chat assistant"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles 
              size={24} 
              className="absolute opacity-70 animate-pulse" 
              style={{ animationDuration: '3s' }}
            />
            <MessageCircle 
              size={26} 
              className="relative z-10" 
              strokeWidth={2.5}
            />
          </div>
          
          {/* Pulse animation */}
          <span className="absolute w-full h-full rounded-full animate-ping bg-blue-400 opacity-20"></span>
          
          {/* Decorative wave effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-1 bg-white opacity-10 animate-wave"></div>
          </div>
        </motion.button>
      )}
      
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-80 md:w-96 h-[32rem] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-700 max-h-[85vh] backdrop-blur-lg"
            style={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Chat header */}
            <div 
              className="px-4 py-3 flex justify-between items-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(79, 70, 229, 0.95) 50%, rgba(147, 51, 234, 0.95) 100%)',
                borderBottom: '1px solid rgba(79, 70, 229, 0.4)'
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full flex items-center justify-center shadow-inner">
                  <PenTool size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg">
                    {getUiText('title')}
                  </h3>
                  <div className="flex items-center text-xs text-blue-100 opacity-90">
                    <Clock size={12} className="mr-1" /> 
                    <span>{getUiText('status') || 'Online Now'}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40"
                aria-label="Close chat"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
              
              {/* Decorative header pattern */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div 
                  className="w-full h-full" 
                  style={{ 
                    backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.3) 0%, transparent 30%)',
                    backgroundSize: '150% 150%'
                  }}
                ></div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div 
              className="flex-1 overflow-hidden flex flex-col relative"
              style={{
                background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(17, 24, 39, 0.95) 100%)'
              }}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div 
                  className="absolute top-0 left-0 w-full h-full" 
                  style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`,
                    backgroundSize: '50px 50px'
                  }}
                ></div>
              </div>
            
              {/* Actual scrollable messages container */}
              <div 
                ref={chatScrollRef}
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent p-4 z-10" 
                style={{ 
                  overscrollBehavior: 'contain',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(75, 85, 99, 0.5) transparent'
                }}
              >
                {chatMessages.map((msg, index) => (
                  <motion.div 
                    key={index}
                    variants={chatBubbleVariants}
                    initial="initial"
                    animate="animate"
                    className={`mb-4 ${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                  >
                    <div 
                      className={`px-4 py-3 rounded-2xl max-w-[85%] shadow-md ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none border border-blue-500' 
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 rounded-bl-none border border-gray-600'
                      }`}
                      style={
                        msg.role === 'user'
                          ? { boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }
                          : { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }
                      }
                    >
                      {formatMessageContent(msg.content)}
                      
                      {msg.timestamp && (
                        <div className="flex items-center text-xs opacity-60 mt-1">
                          <Clock size={10} className="mr-1" />
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div 
                      variants={typingIndicatorVariants}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                      className="flex items-center mb-4"
                    >
                      <div className="px-4 py-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl rounded-bl-none inline-flex items-center border border-gray-600 shadow-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" 
                               style={{ animationDelay: '0ms', animationDuration: '1.2s' }} />
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" 
                               style={{ animationDelay: '150ms', animationDuration: '1.2s' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" 
                               style={{ animationDelay: '300ms', animationDuration: '1.2s' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={chatEndRef} />
              </div>
            </div>
            
            {/* Quick prompts and input area */}
            <div 
              className="border-t border-gray-700 p-4 space-y-3"
              style={{
                background: 'linear-gradient(0deg, rgba(31, 41, 55, 0.98) 0%, rgba(17, 24, 39, 0.95) 100%)',
                borderTop: '1px solid rgba(55, 65, 81, 0.6)'
              }}
            >
              {/* Quick prompts/suggestions */}
              {suggestions && suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 max-h-24 overflow-y-auto custom-scrollbar pb-1">
                  {suggestions.map((prompt, index) => (
                    <motion.button
                      key={index}
                      custom={index}
                      variants={quickPromptVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="px-3 py-1.5 text-xs bg-gray-700 text-blue-100 rounded-full transition-all border border-gray-600 flex items-center gap-1 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        background: 'rgba(55, 65, 81, 0.8)',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <ChevronRight size={12} className="text-blue-400" />
                      <span className="truncate max-w-[180px]">{prompt}</span>
                    </motion.button>
                  ))}
                </div>
              )}
              
              {/* Message input */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleMessageSend();
                }}
                className="flex gap-2 relative"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 pr-12 shadow-inner"
                  style={{
                    background: 'rgba(55, 65, 81, 0.7)',
                    backdropFilter: 'blur(5px)',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                  placeholder={getUiText('inputPlaceholder')}
                />
                <motion.button
                  type="submit"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white transition-all ${
                    message.trim() 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md' 
                      : 'bg-gray-600 cursor-not-allowed opacity-50'
                  }`}
                  disabled={!message.trim()}
                  whileHover={message.trim() ? { scale: 1.1 } : {}}
                  whileTap={message.trim() ? { scale: 0.9 } : {}}
                  style={message.trim() ? { boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)' } : {}}
                >
                  <Send size={16} className="transform rotate-0" strokeWidth={2.5} />
                </motion.button>
              </form>
              
              {/* Contact info button */}
              <div className="flex justify-center pt-1">
                <motion.button
                  onClick={() => handleQuickPrompt(getUiText('contactUs'))}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.3)' }}
                >
                  {getUiText('contactUs')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom styles for animations and scrollbars */}
      <style jsx global>{`
        @keyframes wave {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        .animate-wave {
          animation: wave 3s linear infinite;
        }
        
        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
          border-radius: 20px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(75, 85, 99, 0.7);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.5);
          border-radius: 20px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(75, 85, 99, 0.7);
        }
      `}</style>
    </div>
  );
}
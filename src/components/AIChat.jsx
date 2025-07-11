import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle,BotMessageSquare, X, User, Bot, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Configuration
const API_BASE_URL = 'http://localhost:8000/api';
const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_DELAY = 1000; // 1 second between messages

const AIChat = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([createInitialMessage()]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isCollectingDetails, setIsCollectingDetails] = useState(false);
  const [collectedDetails, setCollectedDetails] = useState({});
  const [currentStep, setCurrentStep] = useState('');
  const [error, setError] = useState(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Helper functions
  function createInitialMessage() {
    return {
      id: uuidv4(),
      text: "Hello! I'm your AI assistant for Ticketer Transportations. I can help you with information about our sustainable transportation solutions, green energy research, smart mobility, and software development services. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    };
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createMessage = (text, isBot, isError = false) => ({
    id: uuidv4(),
    text,
    isBot,
    isError,
    timestamp: new Date()
  });

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const clearError = () => {
    setError(null);
  };

  // Rate limiting
  const checkRateLimit = () => {
    const now = Date.now();
    if (now - lastMessageTime < RATE_LIMIT_DELAY) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), RATE_LIMIT_DELAY);
      return false;
    }
    setLastMessageTime(now);
    return true;
  };

  // Input validation
  const validateInput = (input) => {
    if (!input.trim()) {
      setError('Please enter a message');
      return false;
    }
    if (input.length > MAX_MESSAGE_LENGTH) {
      setError(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`);
      return false;
    }
    return true;
  };

  // Contact form handlers
  const checkForContactRequest = (message) => {
    const keywords = ['contact', 'message', 'email', 'send', 'speak', 'talk', 'quote'];
    return keywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const resetDetailCollection = () => {
    setIsCollectingDetails(false);
    setCurrentStep('');
    setCollectedDetails({});
  };

  const startDetailCollection = () => {
    setIsCollectingDetails(true);
    setCurrentStep('name');
    return "I'd be happy to help you connect with our team! Let me collect some details. What's your name?";
  };

  // Detail collection with improved validation
  const handleDetailCollection = async (userMessage) => {
    const trimmedMessage = userMessage.trim();
    
    switch (currentStep) {
      case 'name':
        return handleNameStep(trimmedMessage);
      case 'email':
        return handleEmailStep(trimmedMessage);
      case 'message':
        return handleMessageStep(trimmedMessage);
      case 'confirm':
        return await handleConfirmStep(trimmedMessage.toLowerCase());
      default:
        resetDetailCollection();
        return "I'm here to help! What would you like to know about Ticketer Transportations?";
    }
  };

  const handleNameStep = (name) => {
    if (name.length < 2) {
      return "Please provide a valid name (at least 2 characters).";
    }
    setCollectedDetails(prev => ({ ...prev, name }));
    setCurrentStep('email');
    return "Thank you! What's your email address?";
  };

  const handleEmailStep = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please provide a valid email address.";
    }
    setCollectedDetails(prev => ({ ...prev, email }));
    setCurrentStep('message');
    return "Perfect! What message would you like to send to our team?";
  };

  const handleMessageStep = (message) => {
    if (message.length < 10) {
      return "Please provide a more detailed message (at least 10 characters).";
    }
    setCollectedDetails(prev => ({ ...prev, message }));
    setCurrentStep('confirm');
    return `Great! Here's your message summary:

📝 **Name:** ${collectedDetails.name}
📧 **Email:** ${collectedDetails.email}
💬 **Message:** ${message}

Would you like me to send this message to our team? Type 'yes' to confirm or 'no' to cancel.`;
  };

  const handleConfirmStep = async (confirmation) => {
    if (confirmation.includes('yes') || confirmation.includes('y')) {
      try {
        const result = await sendMessageToBackend(collectedDetails);
        resetDetailCollection();
        
        if (result.success) {
          return "✅ Your message has been sent successfully! Our team will get back to you within 24 hours. Is there anything else I can help you with?";
        }
        return "❌ There was an issue sending your message. Please try again or contact us directly at info@ticketertransports.com";
      } catch (error) {
        resetDetailCollection();
        return "❌ Failed to send message. Please try again later or contact us directly.";
      }
    }
    
    resetDetailCollection();
    return "No problem! Your message was not sent. Is there anything else I can help you with regarding our services?";
  };

  // API calls with improved error handling
  const sendMessageToBackend = async (details) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, {
        name: details.name,
        email: details.email,
        message: details.message
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Error sending message:', error);
      
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait before sending another message.');
      }
      
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to send message'
      };
    }
  };

  const callAIAPI = async (userMessage) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage,
        conversation_id: conversationId
      }, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.data.conversation_id && !conversationId) {
        setConversationId(response.data.conversation_id);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error calling AI API:', error);
      throw error;
    }
  };

  const handleApiError = (error) => {
    if (error.response?.status === 429) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 5000);
      return "I'm receiving too many requests right now. Please wait a moment before sending another message.";
    }
    
    if (error.response?.status === 500) {
      return "I'm experiencing some technical difficulties. Please try again later or contact us directly at info@ticketertransports.com";
    }
    
    return "I'm having trouble processing your request right now. Please try again or contact our support team.";
  };

  // Main response generation
  const generateBotResponse = async (userMessage) => {
    setIsTyping(true);
    setError(null);
    
    try {
      // Check for contact request
      if (!isCollectingDetails && checkForContactRequest(userMessage)) {
        return startDetailCollection();
      }
      
      // Handle detail collection
      if (isCollectingDetails) {
        return await handleDetailCollection(userMessage);
      }
      
      // Call AI API
      const response = await callAIAPI(userMessage);
      return response.message || "I'm here to help! Could you please rephrase your question?";
      
    } catch (error) {
      return handleApiError(error);
    } finally {
      setIsTyping(false);
    }
  };

  // Event handlers
  const handleSendMessage = async () => {
    if (!validateInput(inputMessage) || !checkRateLimit()) return;
    
    clearError();
    const userMessage = createMessage(inputMessage, false);
    addMessage(userMessage);
    
    const currentInput = inputMessage;
    setInputMessage('');

    try {
      const botResponse = await generateBotResponse(currentInput);
      const botMessage = createMessage(botResponse, true);
      addMessage(botMessage);
    } catch (error) {
      const errorMessage = createMessage(
        "I'm sorry, I encountered an error. Please try again.",
        true,
        true
      );
      addMessage(errorMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    clearError();
  };

  // Render components
  const renderMessage = (message) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-xs px-3 py-2 rounded-lg ${
          message.isError
            ? 'bg-red-100 text-red-800 border border-red-300'
            : message.isBot
            ? 'bg-gray-100 text-gray-800'
            : 'bg-green-600 text-white'
        }`}
      >
        <div className="flex items-start space-x-2">
          {message.isBot && <Bot size={16} className="mt-1 flex-shrink-0" />}
          {!message.isBot && <User size={16} className="mt-1 flex-shrink-0" />}
          {message.isError && <AlertCircle size={16} className="mt-1 flex-shrink-0" />}
          <div className="text-sm whitespace-pre-line">{message.text}</div>
        </div>
      </div>
    </motion.div>
  );

  const renderTypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <Bot size={16} />
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderError = () => (
    error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg"
      >
        {error}
      </motion.div>
    )
  );

  const renderChatToggle = () => (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-colors"
          title="Chat with our AI assistant"
        >
          <BotMessageSquare size={34} />
        </motion.button>
      )}
    </AnimatePresence>
  );

  const renderChatWindow = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col mb-4"
        >
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">Ticketer Transportations</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              title="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Error display */}
          {error && (
            <div className="p-2">
              {renderError()}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(renderMessage)}
            {isTyping && renderTypingIndicator()}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={isRateLimited ? "Please wait..." : "Type your message..."}
                disabled={isRateLimited || isTyping}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isRateLimited || isTyping}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 disabled:opacity-50"
                title="Send message"
              >
                <Send size={16} />
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {inputMessage.length}/{MAX_MESSAGE_LENGTH}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {renderChatToggle()}
      {renderChatWindow()}
    </div>
  );
};

export default AIChat;
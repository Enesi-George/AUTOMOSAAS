import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  BotMessageSquare,
  X,
  User,
  Bot,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Configuration
const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_DELAY = 1000;
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_URL;
if (!FORMSPREE_ENDPOINT) {
  console.error("Missing FORMSPREE_ENDPOINT environment variables!");
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([createInitialMessage()]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCollectingDetails, setIsCollectingDetails] = useState(false);
  const [collectedDetails, setCollectedDetails] = useState({});
  const [currentStep, setCurrentStep] = useState("");
  const [error, setError] = useState(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [conversationContext, setConversationContext] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
      id: Date.now(),
      text: "Hello! I'm your AI assistant for Automatons mobility and software services(AUTOSAAS). I can help you with information about our sustainable transportation solutions, green energy research, smart mobility, and software development services. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    };
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createMessage = (text, isBot, isError = false) => ({
    id: Date.now() + Math.random(),
    text,
    isBot,
    isError,
    timestamp: new Date(),
  });

  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);

    // Add to conversation context for better responses
    if (!message.isError) {
      setConversationContext((prev) => [
        ...prev.slice(-8),
        {
          role: message.isBot ? "assistant" : "user",
          content: message.text,
        },
      ]);
    }
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

  const validateInput = (input) => {
    if (!input.trim()) {
      setError("Please enter a message");
      return false;
    }
    if (input.length > MAX_MESSAGE_LENGTH) {
      setError(
        `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`
      );
      return false;
    }
    return true;
  };

  const checkFAQ = (message) => {
    const msg = message.toLowerCase();

    const faqs = [
      // Business Hours
      {
        keywords: [
          "hours",
          "time",
          "open",
          "close",
          "when",
          "operating",
          "business hours",
        ],
        response:
          "Our business hours are Monday to Friday, 8:00 AM to 6:00 PM (EAT). We respond to emails within 24 hours and are always available for urgent inquiries.",
      },

      // Location
      {
        keywords: [
          "location",
          "address",
          "where",
          "office",
          "find",
          "based",
          "nairobi",
        ],
        response:
          "We are located at 1234 Main Street, Nairobi, Kenya. You can visit us during our business hours or contact us online for virtual consultations.",
      },

      // Contact Information
      {
        keywords: [
          "contact",
          "phone",
          "email",
          "call",
          "reach",
          "talk",
          "speak",
        ],
        response:
          "You can contact us at autosaasinfo@gmail.com or call +2348159450874. Would you like me to help you send a message to our team?",
      },

      // Services Overview
      {
        keywords: [
          "services",
          "what do you",
          "offer",
          "provide",
          "help with",
          "solutions",
        ],
        response:
          "We offer comprehensive services including:\n\n• Green Energy Research & Implementation\n• Smart Mobility Solutions\n• Renewable Energy Consulting\n• Software Development Services (SaaS)\n• Sustainable Transportation Solutions\n\nWhich service interests you most?",
      },

      // Pricing
      {
        keywords: [
          "price",
          "cost",
          "pricing",
          "expensive",
          "budget",
          "quote",
          "rates",
        ],
        response:
          "Our pricing varies based on the service and scope of work. We offer competitive rates and flexible packages. Would you like me to connect you with our team for a personalized quote?",
      },

      // About Company
      {
        keywords: [
          "about",
          "company",
          "who are you",
          "automosaas",
          "autosaas",
          "team",
          "history",
        ],
        response:
          "Automatons mobility and software services(AUTOSAAS) is revolutionizing Africa's movement through sustainable mobility solutions, renewable energy innovation, and transformative digital technologies.",
      },
    ];

    for (const faq of faqs) {
      if (faq.keywords.some((keyword) => msg.includes(keyword))) {
        return faq.response;
      }
    }

    return null;
  };

  const generateRuleBasedResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Check FAQ first
    const faqResponse = checkFAQ(message);
    if (faqResponse) return faqResponse;

    // Greeting responses
    if (
      containsKeywords(message, [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "greetings",
      ])
    ) {
      return "Hello! Welcome to Automatons mobility and software services(AUTOSAAS). I'm here to help you learn about our sustainable transportation solutions, green energy research, smart mobility, and software development services. What would you like to know?";
    }

    // Goodbye responses
    if (
      containsKeywords(message, [
        "bye",
        "goodbye",
        "thanks",
        "thank you",
        "see you",
        "farewell",
      ])
    ) {
      return "Thank you for your interest in Automatons mobility and software services(AUTOSAAS)! Feel free to reach out anytime at autosaasinfo@gmail.com.com or call +254 712 345678. Have a great day!";
    }

    // Green Energy & Renewable Energy
    if (
      containsKeywords(message, [
        "green energy",
        "renewable",
        "solar",
        "wind",
        "clean energy",
        "sustainable energy",
        "environment",
      ])
    ) {
      return "Our Green Energy Research division is pioneering innovative solutions to transform transportation in Africa. We focus on:\n\n• Renewable energy integration for transportation\n• Smart energy management systems\n• Sustainable infrastructure design\n• Energy efficiency optimization\n• Solar and wind power solutions\n\nWould you like to know more about our specific green energy implementation services?";
    }

    // Smart Mobility & Transportation
    if (
      containsKeywords(message, [
        "smart mobility",
        "transport",
        "fleet",
        "vehicle",
        "mobility",
        "logistics",
        "traffic",
        "route",
      ])
    ) {
      return "Our Smart Mobility Solutions combine sustainability with innovation to reshape how Africa moves. We offer:\n\n• AI-driven fleet management systems\n• Eco-connected vehicles\n• Mobility-as-a-Service (MaaS) platforms\n• Intelligent route optimization\n• Real-time tracking and monitoring\n• Traffic management solutions\n\nHow can we help optimize your transportation needs?";
    }

    // Software Development & SaaS
    if (
      containsKeywords(message, [
        "software",
        "saas",
        "software as a service",
        "development",
        "platform",
        "system",
        "application",
        "e-commerce",
        "erp",
        "web app",
        "mobile app",
      ])
    ) {
      return "We provide comprehensive Software Development Services with a human-centric approach:\n\n• Custom E-commerce platforms\n• E-learning management systems\n• Enterprise Resource Planning (ERP)\n• Web and mobile applications\n• Cloud-based SaaS solutions\n• API development and integration\n\nWhat type of software solution are you looking for?";
    }

    // Consulting Services
    if (
      containsKeywords(message, [
        "consulting",
        "consultant",
        "advice",
        "audit",
        "assessment",
        "strategy",
        "planning",
      ])
    ) {
      return "Our Renewable Energy Consulting service empowers Africa's transition to green energy. We provide:\n\n• Comprehensive energy audits\n• System design and planning\n• Policy advisory services\n• Capacity building programs\n• Implementation support\n• ROI analysis and projections\n\nWould you like to discuss your specific consulting needs?";
    }

    // Technology & Innovation
    if (
      containsKeywords(message, [
        "technology",
        "innovation",
        "ai",
        "artificial intelligence",
        "digital",
        "automation",
        "iot",
        "data",
      ])
    ) {
      return "Technology and innovation are at the heart of everything we do at Automatons mobility and software services(AUTOSAAS). We leverage cutting-edge technologies including:\n\n• Artificial Intelligence and Machine Learning\n• Internet of Things (IoT) solutions\n• Big Data analytics\n• Blockchain for transparency\n• Cloud computing infrastructure\n\nWhich technology aspect interests you most?";
    }

    // Africa-specific questions
    if (
      containsKeywords(message, [
        "africa",
        "kenya",
        "nairobi",
        "local",
        "regional",
        "african market",
      ])
    ) {
      return "We're proud to be based in Nairobi, Kenya, and focused on solving Africa's unique transportation and energy challenges. Our solutions are specifically designed for:\n\n• African infrastructure conditions\n• Local regulatory compliance\n• Regional market needs\n• Cultural and economic factors\n• Climate considerations\n\nHow can we help with your African operations?";
    }

    // Help or support requests
    if (
      containsKeywords(message, [
        "help",
        "support",
        "assistance",
        "problem",
        "issue",
        "question",
        "information",
      ])
    ) {
      return "I'm here to help! I can provide information about:\n\n• Our services and solutions\n• Pricing and quotes\n• Contact information\n• Business hours and location\n• Technical details about our offerings\n• How to get started with our services\n\nWhat specific information would you like to know?";
    }

    // Partnership and collaboration
    if (
      containsKeywords(message, [
        "partner",
        "partnership",
        "collaborate",
        "work together",
        "joint venture",
        "cooperation",
      ])
    ) {
      return "We're always interested in strategic partnerships and collaborations! We work with:\n\n• Technology companies\n• Government agencies\n• NGOs and development organizations\n• Research institutions\n• Other sustainability-focused businesses\n\nWould you like to discuss potential partnership opportunities?";
    }

    // Investment and funding
    if (
      containsKeywords(message, [
        "investment",
        "funding",
        "investor",
        "capital",
        "finance",
        "money",
      ])
    ) {
      return "We're open to discussing investment opportunities and funding partnerships. Our growth areas include:\n\n• Expansion across Africa\n• Technology development\n• Infrastructure projects\n• Research and development\n\nWould you like to connect with our business development team?";
    }

    // Default response with context awareness
    return getContextualDefaultResponse();
  };

  const containsKeywords = (message, keywords) => {
    return keywords.some((keyword) => message.includes(keyword));
  };

  const getContextualDefaultResponse = () => {
    const responses = [
      "I'd be happy to help you with more information about Automatons mobility and software services(AUTOSAAS). Could you please be more specific about what you'd like to know?",
      "That's an interesting question! Could you tell me more about what specific aspect of our services you're interested in?",
      "I want to make sure I give you the most relevant information. Are you asking about our green energy solutions, smart mobility, software development, or consulting services?",
      "Thanks for your question! I can help you with information about our services, pricing, contact details, or any other questions you might have. What would you like to know?",
      "I'm here to assist you with information about Automatons mobility and software services(AUTOSAAS). Feel free to ask about our sustainable transportation solutions, technology services, or how we can help your business!",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const checkForContactRequest = (message) => {
    const keywords = [
      "contact",
      "message",
      "email",
      "send",
      "speak",
      "talk",
      "quote",
      "connect",
      "reach out",
    ];
    return keywords.some((keyword) => message.toLowerCase().includes(keyword));
  };

  const resetDetailCollection = () => {
    setIsCollectingDetails(false);
    setCurrentStep("");
    setCollectedDetails({});
  };

  const startDetailCollection = () => {
    setIsCollectingDetails(true);
    setCurrentStep("name");
    return "I'd be happy to help you connect with our team! Let me collect some details to send your message.\n\nWhat's your name?";
  };

  // Detail collection handlers
  const handleDetailCollection = async (userMessage) => {
    const trimmedMessage = userMessage.trim();

    switch (currentStep) {
      case "name":
        return handleNameStep(trimmedMessage);
      case "email":
        return handleEmailStep(trimmedMessage);
      case "message":
        return handleMessageStep(trimmedMessage);
      case "confirm":
        return await handleConfirmStep(trimmedMessage.toLowerCase());
      default:
        resetDetailCollection();
        return "I'm here to help! What would you like to know about Automatons mobility and software services(AUTOSAAS)?";
    }
  };

  const handleNameStep = (name) => {
    if (name.length < 2) {
      return "Please provide a valid name (at least 2 characters).";
    }
    setCollectedDetails((prev) => ({ ...prev, name }));
    setCurrentStep("email");
    return "Thank you! What's your email address?";
  };

  const handleEmailStep = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please provide a valid email address.";
    }
    setCollectedDetails((prev) => ({ ...prev, email }));
    setCurrentStep("message");
    return "Perfect! What message would you like to send to our team?";
  };

  const handleMessageStep = (message) => {
    if (message.length < 10) {
      return "Please provide a more detailed message (at least 10 characters).";
    }
    setCollectedDetails((prev) => ({ ...prev, message }));
    setCurrentStep("confirm");
    return `Great! Here's your message summary:

📝 **Name:** ${collectedDetails.name}
📧 **Email:** ${collectedDetails.email}
💬 **Message:** ${message}

Would you like me to send this message to our team? Type 'yes' to confirm or 'no' to cancel.`;
  };

  const handleConfirmStep = async (confirmation) => {
    if (confirmation.includes("yes") || confirmation.includes("y")) {
      try {
        const result = await sendMessageViaFormspree(collectedDetails);
        resetDetailCollection();

        if (result.success) {
          return "Your message has been sent successfully! Our team will get back to you within 24 hours.\n\nIs there anything else I can help you with?";
        }
        return "There was an issue sending your message. Please try again or contact us directly at autosaasinfo@gmail.com";
      } catch (error) {
        resetDetailCollection();
        return "Failed to send message. Please try again later or contact us directly.";
      }
    }

    resetDetailCollection();
    return "No problem! Your message was not sent. Is there anything else I can help you with regarding our services?";
  };

  // Formspree integration
  const sendMessageViaFormspree = async (details) => {
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          message: `${details.message}\n\n--- Sent via AI Chat Assistant ---`,
          _subject: "New Inquiry from AI Chat Assistant",
        }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Formspree error:", error);
      return { success: false, error: error.message };
    }
  };

  // Main response generation
  const generateBotResponse = async (userMessage) => {
    setIsTyping(true);
    setError(null);

    try {
      // Simulate typing delay for better UX
      await new Promise((resolve) =>
        setTimeout(resolve, 500 + Math.random() * 1000)
      );

      // Check for contact request
      if (!isCollectingDetails && checkForContactRequest(userMessage)) {
        return startDetailCollection();
      }

      // Handle detail collection
      if (isCollectingDetails) {
        return await handleDetailCollection(userMessage);
      }

      // Generate rule-based response
      return generateRuleBasedResponse(userMessage);
    } catch (error) {
      console.error("Error generating response:", error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team directly.";
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
    setInputMessage("");

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
    if (e.key === "Enter" && !e.shiftKey) {
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
      transition={{ duration: 0.3 }}
      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-xs px-4 py-3 rounded-lg ${
          message.isError
            ? "bg-red-100 text-red-800 border border-red-300"
            : message.isBot
            ? "bg-gray-100 text-gray-800"
            : "bg-green-600 text-white"
        }`}
      >
        <div className="flex items-start space-x-2">
          {message.isBot && <Bot size={16} className="mt-1 flex-shrink-0" />}
          {!message.isBot && <User size={16} className="mt-1 flex-shrink-0" />}
          {message.isError && (
            <AlertCircle size={16} className="mt-1 flex-shrink-0" />
          )}
          <div className="text-sm whitespace-pre-line leading-relaxed">
            {message.text}
          </div>
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
      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <Bot size={16} />
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderError = () =>
    error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg"
      >
        {error}
      </motion.div>
    );

  const renderChatToggle = () => (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
          title="Chat with our AI assistant"
        >
          <BotMessageSquare size={24} />
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
          className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col mb-4"
        >
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">Automatons mobility and software services(AUTOSAAS)</p>
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
          {error && <div className="p-2">{renderError()}</div>}

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
                placeholder={
                  isRateLimited ? "Please wait..." : "Type your message..."
                }
                disabled={isRateLimited || isTyping}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isRateLimited || isTyping}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <Send size={16} />
              </button>
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

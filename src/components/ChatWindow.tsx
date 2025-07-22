
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, TrendingUp, ShoppingBag, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  insights?: {
    type: 'campaign' | 'trend' | 'product';
    data: any;
  };
}

interface ChatWindowProps {
  incomingMessage?: string;
  onMessageProcessed?: () => void;
}

const ChatWindow = ({ incomingMessage, onMessageProcessed }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your Shopify Analytics AI. I can help you analyze your sales data, identify trending products, and recommend campaign strategies. What would you like to explore today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle incoming messages from ProductInsights
  useEffect(() => {
    if (incomingMessage) {
      handleIncomingMessage(incomingMessage);
      onMessageProcessed?.();
    }
  }, [incomingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleIncomingMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response for incoming message
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('wireless bluetooth earbuds') || lowerInput.includes('earbuds pro')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Great choice! The Wireless Bluetooth Earbuds Pro is performing exceptionally well. Here's my detailed marketing strategy: Focus on social media video ads showcasing the sound quality and convenience. Target tech-savvy consumers aged 18-35, especially those interested in fitness and commuting. Consider influencer partnerships with fitness enthusiasts and tech reviewers. Best performing ad formats: product demonstration videos, customer testimonials, and comparison ads against competitors.",
        timestamp: new Date(),
        insights: {
          type: 'campaign',
          data: {
            recommendedProducts: [
              { name: 'Wireless Earbuds Pro', score: 95, trend: '+34%' },
              { name: 'Complementary Phone Case', score: 78, trend: '+12%' }
            ]
          }
        }
      };
    }

    if (lowerInput.includes('holiday push') || lowerInput.includes('holiday campaign')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Perfect timing for a Holiday Push campaign! Here's your step-by-step strategy: 1) Create gift-focused ad copy emphasizing convenience and quality, 2) Target gift buyers with messaging like 'Perfect gift for tech lovers', 3) Use seasonal creative with holiday themes, 4) Set up retargeting for cart abandoners with urgency messaging, 5) Consider bundle offers with complementary products. Best channels: Facebook/Instagram ads, Google Shopping, and email marketing to existing customers.",
        timestamp: new Date(),
        insights: {
          type: 'campaign',
          data: {
            recommendedProducts: [
              { name: 'Holiday Bundle - Earbuds + Tracker', score: 92, trend: '+45%' },
              { name: 'Gift Card Promotion', score: 87, trend: '+28%' }
            ]
          }
        }
      };
    }
    
    if (lowerInput.includes('campaign') || lowerInput.includes('recommend')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Based on your recent sales data, I recommend focusing on these high-potential products for your next campaign. These items show strong conversion rates and align with current market trends.",
        timestamp: new Date(),
        insights: {
          type: 'campaign',
          data: {
            recommendedProducts: [
              { name: 'Wireless Earbuds Pro', score: 92, trend: '+15%' },
              { name: 'Smart Fitness Tracker', score: 88, trend: '+22%' },
              { name: 'Eco-Friendly Water Bottle', score: 85, trend: '+8%' }
            ]
          }
        }
      };
    }
    
    if (lowerInput.includes('trend') || lowerInput.includes('market')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Here are the current market trends I'm tracking for your product categories. These insights combine your sales data with broader market intelligence.",
        timestamp: new Date(),
        insights: {
          type: 'trend',
          data: {
            trends: [
              { category: 'Electronics', growth: '+18%', confidence: 'High' },
              { category: 'Health & Wellness', growth: '+12%', confidence: 'Medium' },
              { category: 'Sustainable Products', growth: '+25%', confidence: 'High' }
            ]
          }
        }
      };
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: "I can help you with campaign recommendations, trend analysis, product insights, and competitive intelligence. Try asking about specific products, campaign strategies, or market trends for your products!",
      timestamp: new Date(),
    };
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Shopify Analytics AI</h2>
            <p className="text-purple-300 text-sm">Campaign & Insights Assistant</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-purple-500/20">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about campaigns, trends, or product insights..."
            className="bg-white/10 border-purple-500/30 text-white placeholder-purple-300 focus:border-purple-400"
          />
          <Button 
            onClick={handleSend}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`max-w-[80%] ${isBot ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isBot 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          }`}>
            {isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
          </div>
          <div className={`rounded-2xl p-3 ${
            isBot 
              ? 'bg-white/10 backdrop-blur-sm border border-purple-500/20 text-white' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
          }`}>
            <p className="text-sm">{message.content}</p>
            {message.insights && <InsightCard insights={message.insights} />}
          </div>
        </div>
        <p className={`text-xs text-purple-300 mt-1 ${isBot ? 'ml-10' : 'mr-10 text-right'}`}>
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

const InsightCard = ({ insights }: { insights: any }) => {
  if (insights.type === 'campaign') {
    return (
      <Card className="mt-3 bg-black/30 border-purple-500/30">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Campaign Recommendations</span>
          </div>
          <div className="space-y-2">
            {insights.data.recommendedProducts.map((product: any, index: number) => (
              <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white">{product.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                    Score: {product.score}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {product.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (insights.type === 'trend') {
    return (
      <Card className="mt-3 bg-black/30 border-purple-500/30">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-white">Market Trends</span>
          </div>
          <div className="space-y-2">
            {insights.data.trends.map((trend: any, index: number) => (
              <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white">{trend.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                    {trend.growth}
                  </Badge>
                  <Badge variant="secondary" className={`${
                    trend.confidence === 'High' 
                      ? 'bg-green-500/20 text-green-300 border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                  }`}>
                    {trend.confidence}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return null;
};

const TypingIndicator = () => (
  <div className="flex justify-start animate-fade-in">
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

export default ChatWindow;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { 
  HiCode, 
  HiPaperAirplane, 
  HiDocument,
  HiCog,
  HiKey,
  HiSparkles,
  HiEye,
  HiDownload,
  HiTrash
} from 'react-icons/hi';
import ApiKeyModal from '../../components/ApiKeyModal';
import { geminiService, ChatMessage } from '../../services/geminiService';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! Ready to build your website? I can create modern, responsive websites with:\n\n✅ Tech icons (React, Next.js, TypeScript, etc.)\n✅ High-quality coding/UI images from Unsplash\n✅ Perfect contrast & readability\n✅ Professional, symmetrical layouts\n✅ Reliable placeholder images from placehold.co\n\nTell me what you want to build!'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isAiConfigured, setIsAiConfigured] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isCodeGenerating, setIsCodeGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Developer Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #ffffff;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        header {
            background: #ffffff;
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { font-size: 1.5rem; font-weight: bold; color: #3b82f6; }
        nav a {
            margin-left: 2rem;
            text-decoration: none;
            color: #374151;
            font-weight: 500;
        }
        .hero {
            padding: 4rem 0;
            text-align: center;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #1e293b;
        }
        .hero p {
            font-size: 1.2rem;
            color: #64748b;
            margin-bottom: 2rem;
        }
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin: 4rem 0;
        }
        .tech-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            text-align: center;
        }
        .tech-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto 1rem;
        }
        .project-image {
            width: 100%;
            height: 200px;
            border-radius: 8px;
            object-fit: cover;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">DevPortfolio</div>
                <nav>
                    <a href="#about">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </div>
    </header>
    
    <main>
        <section class="hero">
            <div class="container">
                <h1>Full Stack Developer</h1>
                <p>Building modern web applications with cutting-edge technologies</p>
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop" alt="Code editor with colorful syntax highlighting" class="project-image">
            </div>
        </section>
        
        <section class="container">
            <div class="tech-grid">
                <div class="tech-card">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg" alt="React" class="tech-icon">
                    <h3>React</h3>
                    <p>Building interactive user interfaces with React hooks and modern patterns</p>
                </div>
                <div class="tech-card">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg" alt="Next.js" class="tech-icon">
                    <h3>Next.js</h3>
                    <p>Full-stack React framework for production-ready applications</p>
                </div>
                <div class="tech-card">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg" alt="TypeScript" class="tech-icon">
                    <h3>TypeScript</h3>
                    <p>Type-safe JavaScript for scalable and maintainable code</p>
                </div>
            </div>
        </section>
    </main>
    
    <footer style="background: #1f2937; color: #e5e7eb; text-align: center; padding: 2rem 0; margin-top: 4rem;">
        <p>© 2025 Developer Portfolio. All rights reserved.</p>
    </footer>
</body>
</html>`);

  // Check if API key is configured on component mount
  useEffect(() => {
    const checkApiKeyConfiguration = () => {
      // Only check localStorage in the browser
      if (typeof window !== 'undefined' && window.localStorage) {
        const apiKey = localStorage.getItem('gemini_api_key');
        if (apiKey) {
          setIsAiConfigured(true);
          geminiService.setApiKey(apiKey);
        } else {
          setIsApiKeyModalOpen(true);
        }
      } else {
        // In SSR, show modal by default
        setIsApiKeyModalOpen(true);
      }
    };

    checkApiKeyConfiguration();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  const handleApiKeySave = (apiKey: string) => {
    geminiService.setApiKey(apiKey);
    setIsAiConfigured(true);
    setIsApiKeyModalOpen(false);
  };

  const handlePreview = () => {
    // Open the generated code in a new tab for preview
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    
    // Clean up the URL after a short delay
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleDownload = () => {
    // Create and trigger download of the HTML file
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearEditor = () => {
    // Confirm before clearing
    if (window.confirm('Are you sure you want to clear the editor? This cannot be undone.')) {
      setCode('');
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !isAiConfigured || isGenerating) return;
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Reset textarea height
    const textarea = document.querySelector('textarea[placeholder="Describe your website..."]') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = '40px';
    }

    setIsGenerating(true);
    setStreamingMessage('');
    
    try {
      let fullResponse = '';
      let isCodeResponse = false;
      
      // Filter out the initial welcome message from conversation history to prevent duplication
      const conversationHistory = messages.filter(msg => 
        !(msg.role === 'assistant' && msg.content.includes('Ready to build your website'))
      );
      
      // Start streaming response
      for await (const chunk of geminiService.generateStreamingResponse(userMessage, conversationHistory)) {
        fullResponse += chunk;
        
        // Early detection if this response contains code
        if (!isCodeResponse && geminiService.containsCode(fullResponse)) {
          isCodeResponse = true;
          setIsCodeGenerating(true);
          // Clear the editor when starting new code generation
          setCode('');
          // Show a placeholder message in chat when code is being generated
          setStreamingMessage('Creating your website...');
        }
        
        // If it's not a code response, show the streaming message
        if (!isCodeResponse) {
          setStreamingMessage(fullResponse);
        }
        
        // Stream code into editor in real-time
        if (isCodeResponse) {
          const partialCode = geminiService.extractPartialHtmlCode(fullResponse);
          if (partialCode) {
            setCode(partialCode);
          }
        }
      }
      
      // Final code extraction attempt
      if (isCodeResponse && geminiService.containsCode(fullResponse)) {
        const extractedCode = geminiService.extractHtmlCode(fullResponse);
        if (extractedCode) {
          setCode(extractedCode);
        }
      }
      
      // Determine final chat message
      let finalChatMessage;
      if (isCodeResponse) {
        // If code was generated, show clean conversational part or default message
        const cleanResponse = geminiService.removeCodeFromResponse(fullResponse);
        finalChatMessage = cleanResponse || 'I\'ve created your website! Check it out in the editor.';
        setIsCodeGenerating(false);
      } else {
        // If no code, show the full response
        finalChatMessage = fullResponse;
      }
      
      // Add the final AI response to messages
      setMessages(prev => [...prev, { role: 'assistant', content: finalChatMessage }]);
      setStreamingMessage('');
      
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while generating the response.';
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${errorMessage}. Please check your API key and try again.` 
      }]);
      setStreamingMessage('');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <HiCode className="text-white text-lg" />
          </div>
          <span className="text-white font-semibold text-lg">Static Write</span>
          <span className="text-slate-400 text-sm">- AI-Powered Static Site Generator</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* AI Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-700 border border-slate-600">
            <HiSparkles className={`text-sm ${isAiConfigured ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className={`text-xs font-medium ${isAiConfigured ? 'text-emerald-400' : 'text-slate-400'}`}>
              {isAiConfigured ? 'AI Ready' : 'AI Setup Required'}
            </span>
          </div>
          
          <button 
            onClick={() => setIsApiKeyModalOpen(true)}
            className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors"
            title="Configure API Key"
          >
            <HiKey className="text-lg" />
          </button>
          
          <button 
            onClick={handlePreview}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
            title="Preview website in new tab"
          >
            <HiEye className="text-sm" />
            <span>Preview</span>
          </button>
          
          <button 
            onClick={handleDownload}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
            title="Download HTML file"
          >
            <HiDownload className="text-sm" />
            <span>Download</span>
          </button>
          
          <button className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors">
            <HiCog className="text-lg" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Chat Sidebar */}
          <Panel defaultSize={35} minSize={25} maxSize={50}>
            <div className="h-full bg-slate-800 border-r border-slate-700 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-700">
                <h2 className="text-white font-semibold text-lg mb-1">AI Assistant</h2>
                <p className="text-slate-400 text-sm">Describe what you want to build</p>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-700 text-slate-100'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {/* Streaming Message */}
                {streamingMessage && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-slate-700 text-slate-100 border border-emerald-500/50">
                      <div className="flex items-start space-x-2">
                        <div className="flex items-center space-x-1 mt-1">
                          <HiSparkles className="text-emerald-400 text-xs animate-pulse" />
                          <span className="text-xs text-emerald-400">Generating...</span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap mt-2">{streamingMessage}</p>
                    </div>
                  </div>
                )}
                
                {/* Loading indicator when generating but no content yet */}
                {isGenerating && !streamingMessage && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-slate-700 text-slate-100 border border-emerald-500/50">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin"></div>
                        <span className="text-sm text-emerald-400">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-slate-700">
                {!isAiConfigured && (
                  <div className="mb-3 p-3 bg-amber-900/20 border border-amber-600/20 rounded-lg">
                    <p className="text-sm text-amber-200">
                      <span className="font-medium">⚠️ Setup Required:</span> Please configure your Gemini API key to start chatting with AI.
                    </p>
                    <button
                      onClick={() => setIsApiKeyModalOpen(true)}
                      className="mt-2 text-xs text-amber-400 hover:text-amber-300 underline"
                    >
                      Configure API Key
                    </button>
                  </div>
                )}
                
                <div className="flex space-x-2 items-end">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isAiConfigured ? "Describe your website..." : "Configure API key to start chatting..."}
                    rows={1}
                    disabled={!isAiConfigured || isGenerating}
                    className="flex-1 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none min-h-[40px] max-h-32 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      height: 'auto',
                      minHeight: '40px'
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                    }}
                  />
                  <button 
                    onClick={sendMessage}
                    disabled={!isAiConfigured || isGenerating || !inputMessage.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex-shrink-0 min-h-[40px] px-3 flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <HiPaperAirplane className="text-base transform rotate-90" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-1 bg-slate-700 hover:bg-slate-600 transition-colors cursor-col-resize" />

          {/* Editor Panel */}
          <Panel defaultSize={65}>
            <div className="h-full bg-slate-900 flex flex-col">
              {/* Editor Header */}
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <HiDocument className="text-slate-400" />
                    <span className="text-white text-sm font-medium">index.html</span>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  {isCodeGenerating && (
                    <div className="flex items-center space-x-2 px-2 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded text-xs text-emerald-400 animate-pulse">
                      <HiSparkles className="text-xs animate-spin" />
                      <span>Streaming code...</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleClearEditor}
                    className="text-slate-400 hover:text-red-400 p-1.5 rounded transition-colors"
                    title="Clear editor"
                  >
                    <HiTrash className="text-sm" />
                  </button>
                  <div className="w-px h-4 bg-slate-600 mx-1"></div>
                  <button 
                    onClick={handlePreview}
                    className="text-slate-400 hover:text-blue-400 p-1.5 rounded transition-colors"
                    title="Preview website"
                  >
                    <HiEye className="text-sm" />
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="text-slate-400 hover:text-emerald-400 p-1.5 rounded transition-colors"
                    title="Download HTML"
                  >
                    <HiDownload className="text-sm" />
                  </button>
                  <div className="w-px h-4 bg-slate-600 mx-1"></div>
                  <span className="text-slate-400 text-xs">HTML</span>
                </div>
              </div>
              
              {/* Code Editor */}
              <div className="flex-1 relative flex overflow-hidden">
                {/* Line numbers */}
                <div className="w-12 bg-slate-800 border-r border-slate-700 flex-shrink-0 overflow-y-auto">
                  <div className="p-4 pt-4">
                    <div className="text-slate-500 text-sm font-mono leading-relaxed text-right">
                      {code.split('\n').map((_, index) => (
                        <div key={index} className="pr-2">
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Code textarea */}
                <div className="flex-1 overflow-hidden">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-slate-900 text-slate-100 font-mono text-sm p-4 border-none outline-none resize-none leading-relaxed overflow-y-auto"
                    style={{ 
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      tabSize: 4
                    }}
                    placeholder={isCodeGenerating ? "Code is streaming..." : "Your code will appear here..."}
                  />
                </div>
              </div>
              
              {/* Status Bar */}
              <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-4">
                  <span>Lines: {code.split('\n').length}</span>
                  <span>Characters: {code.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Ready</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onSave={handleApiKeySave}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { 
  HiCode, 
  HiPaperAirplane, 
  HiPlay,
  HiDocument,
  HiCog
} from 'react-icons/hi';

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to Static Write! I can help you create and build static websites. What would you like to create today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Static Site</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            color: #333;
        }
        h1 {
            color: #059669;
            margin-bottom: 1rem;
        }
        .hero {
            text-align: center;
            padding: 3rem 0;
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfccb 100%);
            border-radius: 12px;
            margin: 2rem 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Static Site</h1>
    </header>
    
    <main>
        <div class="hero">
            <h2>Built with Static Write</h2>
            <p>This is a simple, fast, and secure static website.</p>
        </div>
        
        <section>
            <h3>About</h3>
            <p>This website was generated using Static Write, making it incredibly fast and easy to deploy anywhere.</p>
        </section>
    </main>
</body>
</html>`);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, 
      { role: 'user', content: inputMessage },
      { role: 'assistant', content: 'I understand you want to ' + inputMessage + '. Let me help you with that! I\'ll update the code to reflect your request.' }
    ]);
    setInputMessage('');
    
    // Reset textarea height
    const textarea = document.querySelector('textarea[placeholder="Describe your website..."]') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = '40px';
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
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
            <HiPlay className="text-sm" />
            <span>Deploy</span>
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
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex space-x-2 items-end">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your website..."
                    rows={1}
                    className="flex-1 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none min-h-[40px] max-h-32"
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
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex-shrink-0 min-h-[40px] px-3 flex items-center justify-center"
                  >
                    <HiPaperAirplane className="text-base transform rotate-90" />
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
                </div>
                
                <div className="flex items-center space-x-2">
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
                    placeholder="Your code will appear here..."
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
    </div>
  );
}

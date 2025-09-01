'use client';

import React, { useState, useEffect } from 'react';
import { HiKey, HiEye, HiEyeOff, HiX } from 'react-icons/hi';

interface ApiKeyModalProps {
  isOpen: boolean;
  onSave: (apiKey: string) => void;
  onClose: () => void;
}

export default function ApiKeyModal({ isOpen, onSave, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing API key from localStorage (only in browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedApiKey = localStorage.getItem('gemini_api_key');
      if (savedApiKey) {
        setApiKey(savedApiKey);
      }
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      alert('Please enter a valid API key');
      return;
    }

    setIsLoading(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('gemini_api_key', apiKey.trim());
      onSave(apiKey.trim());
      onClose();
    } catch (error) {
      console.error('Error saving API key:', error);
      alert('Error saving API key. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <HiKey className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Setup Gemini AI</h2>
              <p className="text-sm text-slate-400">Enter your Google Gemini API key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <HiX className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="AIzaSy..."
                className="w-full bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showApiKey ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <h3 className="text-sm font-medium text-emerald-400 mb-2">How to get your API key:</h3>
            <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
              <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">Google AI Studio</a></li>
              <li>Sign in with your Google account</li>
              <li>Click &quot;Create API Key&quot;</li>
              <li>Copy and paste the key here</li>
            </ol>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/20 rounded-lg p-4">
            <p className="text-sm text-amber-200">
              <span className="font-medium">🔒 Privacy:</span> Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !apiKey.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save & Continue</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

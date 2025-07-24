import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import './ChatBot.scss';
import Header from '../../components/Header';

const MODEL_NAME = 'gemini-pro';
const API_KEY = 'AIzaSyD13G06HT6NvAxeuMkoyRj-AXQkEcy7b5w'; 
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

function GeminiChat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const DISASTER_PROMPT = "You are a disaster management assistant specializing in India. Provide accurate, relevant disaster data, statistics, preparedness information, and emergency guidance specific to India. Focus on disasters like floods, cyclones, earthquakes, droughts, and other natural calamities affecting Indian states and regions. User query: ";

  const sendMessage = async (retryCount = 0) => {
    if (userInput.trim() === '') return;
    setIsLoading(true);

    const promptWithDisaster = DISASTER_PROMPT + userInput;

    const payload = {
      contents: [
        {
          parts: [
            { text: promptWithDisaster }
          ]
        }
      ]
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': API_KEY
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      // Check for API errors
      if (data.error) {
        let errorMessage = 'Sorry, I encountered an error. ';
        
        switch (data.error.code) {
          case 503:
            errorMessage = 'The AI service is currently overloaded. Please try again in a few moments. 🔄';
            break;
          case 429:
            errorMessage = 'Too many requests. Please wait a moment before trying again. ⏱️';
            break;
          case 400:
            errorMessage = 'Invalid request. Please rephrase your question. ❓';
            break;
          case 401:
            errorMessage = 'Authentication error. Please refresh the page. 🔑';
            break;
          default:
            errorMessage = `Service error: ${data.error.message || 'Unknown error occurred'} ❌`;
        }
        
        // Retry for overload errors (503) up to 2 times with delay
        if (data.error.code === 503 && retryCount < 2) {
          setTimeout(() => {
            sendMessage(retryCount + 1);
          }, (retryCount + 1) * 2000); // 2s, 4s delay
          return;
        }
        
        throw new Error(errorMessage);
      }
      
      const botMessage = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';

      setChatHistory([
        ...chatHistory,
        { role: 'user', message: userInput },
        { role: 'model', message: botMessage }
      ]);
      setUserInput('');
    } catch (error) {
      const errorMessage = error.message || 'Network error. Please check your connection and try again. 🌐';
      
      setChatHistory([
        ...chatHistory,
        { role: 'user', message: userInput },
        { role: 'model', message: errorMessage }
      ]);
      setUserInput('');
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="gemini-chat-page">
      <div className="chatbot-title">
      <Header title="Disaster Management Assistant"   />
      </div>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.length === 0 && (
            <div className="welcome-message">
              <div className="bot-avatar">🤖</div>
              <div className="message-bubble bot-message">
                <p>Hello! I'm your disaster management assistant. I can help you with:</p>
                <ul>
                  <li>Current disaster alerts in India</li>
                  <li>Historical disaster data</li>
                  <li>Emergency preparedness tips</li>
                  <li>Regional risk assessments</li>
                </ul>
                <p>What would you like to know?</p>
              </div>
            </div>
          )}
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role}`}>
              {msg.role === 'model' && <div className="bot-avatar">🤖</div>}
              <div className={`message-bubble ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                <div className="message-content" dangerouslySetInnerHTML={{
                  __html: msg.message.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>
              {msg.role === 'user' && <div className="user-avatar">👤</div>}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message model">
              <div className="bot-avatar">🤖</div>
              <div className="message-bubble bot-message typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="chat-input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about disasters, preparedness, or emergency guidance..."
              disabled={isLoading}
              className="chat-input"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !userInput.trim()}
              className="send-button"
            >
              {isLoading ? '⏳' : '📤'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeminiChat;

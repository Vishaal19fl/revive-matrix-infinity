
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import './ChatBot.scss';
import Header from '../../components/Header';

const MODEL_NAME = 'gemini-pro';
const API_KEY = 'AIzaSyDsZXccEjiiBb0Op7AXJOYO0iJAYeAYh_I'; 

function GeminiChat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    setIsLoading(true);
    setIsBotTyping(true);

    const chat = model.startChat({
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      history: [
        {
          role: "user",
          parts: [{ text: ""}],
        },
        {
          role: "model",
          parts: [{ text: ""}],
        },
      ],
    });

    const result = await chat.sendMessage(userInput);
    const response = result.response;

    setChatHistory([...chatHistory, { role: 'user', message: userInput }, { role: 'model', message: response.text() }]);
    setUserInput('');
    setIsLoading(false);
    setIsBotTyping(false);
  };

  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const checkIframeLoaded = () => {
      if (iframe && iframe.contentWindow) {
        const iframeDocument = iframe.contentWindow.document;
        const style = document.createElement("style");
        style.innerHTML = `
          footer {
            display: none !important;
          }
        `;
        iframeDocument.head.appendChild(style);
      }
    };

    iframe.addEventListener("load", checkIframeLoaded);
    return () => {
      iframe.removeEventListener("load", checkIframeLoaded);
    };
  }, []);

  return (
    <div className="gemini-chat-page">
      <Header title="Chat with us" subtitle="Enter your queries" />
      {/* <iframe
src="https://www.chatbase.co/chatbot-iframe/6ynm4ROqIvXaRqhAaXM12"
width="100%"
style="height: 100%; min-height: 700px"
frameborder="0"
></iframe> */}

<iframe

src="https://www.chatbase.co/chatbot-iframe/6ynm4ROqIvXaRqhAaXM12"

width="100%"

style={{ height: "100%", minHeight: "650px", width: "90%", borderRadius:"5px", boxShadow:"10%" }}

frameborder="0"
ref={iframeRef}

></iframe>
      <div className="black-bar"></div>
    </div>
  );
}

export default GeminiChat;

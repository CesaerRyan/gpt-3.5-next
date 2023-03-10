"use client";
import React, { useState } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useChatStore } from "../store/useChat";
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
} from "openai";
import { createParser} from "eventsource-parser";
export const ChatInput = () => {
  const { chats, addMessage,streamingMessage } = useChatStore();
  const [prompt, setPrompt] = useState("");

  const addChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt == "") return;
    addMessage({
      message: prompt,
    });

    sendRequest([
      {content:prompt,role:'user',name:'Haodong'}
    ])
    setPrompt("");


  };

  const sendRequest = async (messages: ChatCompletionRequestMessage[]) => {
    const resBody = {
      messages: messages,
      model: "gpt-3.5-turbo",
      n: 1,
      stream:true
    } as CreateChatCompletionRequest;
    const response = await fetch("/api/edgeReq",{
      method: "POST",
      body:JSON.stringify(resBody)
    });
    
    const reader = response.body?.getReader();
    const parser =  createParser((event)=>{
        if (event.type ==='event'){
          try{
            const json = JSON.parse(event.data) ;
            const text = json.choices[0].delta?.content || "";
            text && streamingMessage(json.id, text)
          }catch(e){
            // skip
          }
          if (event.data === '[DONE]'){
            // loading 
          }
        }

    })

    while (true){
      const {value,done} = await reader!.read()
      if (done) break;
      parser.feed(Buffer.from(value).toString('utf-8'))
    }

  
  };

  return (
    <form className="bg-neutral flex items-center" onSubmit={addChatMessage}>
      <input
        className="bg-transparent flex-1
      text-white w-full  p-6 
      placeholder:text-base-100
      outline-none"
        placeholder="输入你想问的问题"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit" className="btn btn-lg h-full  ">
        <ChatBubbleLeftRightIcon className="text-white w-6 h-6  "></ChatBubbleLeftRightIcon>
      </button>
    </form>
  );
};

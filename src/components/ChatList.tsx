'use client'
import React from 'react'
import { useChatStore } from '../store/useChat'
import ChatMessage from './ChatMessage'

export const ChatList = () => {
  const {chats} = useChatStore()
  return (
    <div className=' p-6 flex-1 overflow-y-auto'>
    
    {
      chats.map(chat => (
        <ChatMessage key={chat.id} message={chat}  />
      ))
    }
   
   
  


   
    </div>
  )
}

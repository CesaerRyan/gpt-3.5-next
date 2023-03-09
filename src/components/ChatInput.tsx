
'use client'
import React, { useState } from 'react'
import {ChatBubbleLeftRightIcon} from '@heroicons/react/24/outline'
import { useChatStore } from '../store/useChat'
export const ChatInput = () => {
  const {chats,addMessage} = useChatStore()
  const [prompt, setPrompt] = useState('')

  const addChatMessage = (e:React.FormEvent) =>{
    e.preventDefault() ;
    if (prompt=='') return;
       addMessage({
        message: prompt
       })
       setPrompt('')
  }

  
  return (
      <form className='bg-neutral flex items-center' onSubmit={addChatMessage}
    >
      <input 
     className='bg-transparent flex-1
      text-white w-full  p-6 
      placeholder:text-base-100
      outline-none'
       placeholder='输入你想问的问题'
       value={prompt}
       onChange={(e)=>setPrompt(e.target.value) }
     />
     <button type='submit' className='btn btn-lg h-full  '  >
    <ChatBubbleLeftRightIcon className='text-white w-6 h-6  '></ChatBubbleLeftRightIcon>
     </button>
      </form>
  )
}

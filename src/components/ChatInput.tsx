
import React from 'react'
import {ChatBubbleLeftRightIcon} from '@heroicons/react/24/outline'
export const ChatInput = () => {


  
  return (
    <div className='bg-neutral flex items-center'>
     <input 
     className='bg-transparent flex-1
      text-white w-full  p-6 
      placeholder:text-base-100
      outline-none'
       placeholder='输入你想问的问题'
     />
     <button type='submit' className='btn btn-lg h-full  '>
    <ChatBubbleLeftRightIcon className='text-white w-6 h-6  '></ChatBubbleLeftRightIcon>
     </button>
    </div>
  )
}

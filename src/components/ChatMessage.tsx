import Image from "next/image";
import React from "react";
import {motion} from 'framer-motion'
type Props = {
  message: {
    name: string;
    message: string;
    time: number;
    avatar: string;
    id: string;
    status:  "Thinking"| "typing" | "done" |'error'
  };
};

const ChatMessage = ({ message }: Props) => {
  const isRobot = (message?.name === "GPT");
  return (
    <motion.div
    animate={{ y: 0,opacity:1}}
    initial={{y:50,opacity:0.2}}
  transition={{ ease: "easeOut", duration: 0.3 }}
   >
      <div className={`chat ${isRobot ? "chat-start": "chat-end" }`} >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Image src={message.avatar!} alt="avatar" width={32} height={32} />
          </div>
        </div>
        <div className="chat-header space-x-2">
            <span>
          {message.name}
          {isRobot}
            </span>
          <time className="text-xs opacity-50">{
           new Date(message.time).toLocaleString()
          }</time>
        </div>
        <div className="chat-bubble">{message.message}</div>
        <div className="chat-footer opacity-50">{message.status}</div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;

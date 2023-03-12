import { createParser } from "eventsource-parser";
import produce, { current } from "immer";
import { nanoid } from "nanoid";
import { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai";
import { create } from "zustand";

export type Message = {
    name: string;
    message: string;
    time: number;
    avatar: string;
    id: string;
    status:  "Thinking"| "typing" | "done" |'error'
};

type ChatStore = {
  chats: Message[];
  addMessage: (message: Partial<Message>) => void;
  updateMessage: (chatId: string, message: string) => void;
  streamingMessage: (chatId: string, message: string) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  addMessage: (message) =>
    set(() =>
      produce(get(), (draft) => {
        draft.chats.push({
          id: message.id || nanoid(6),
          message: message.message || "",
          time: Date.now(),
          name: "You",
          status:'typing',
          avatar: '/react.svg'
        });


        const params:ChatCompletionRequestMessage[]  = current(draft.chats).map(chat=>{
          return {
            content: chat.message,
            role : 'user',
            name: chat.name
          } as ChatCompletionRequestMessage
        })

        sendRequest(params, draft.streamingMessage)



      })
    ),
  updateMessage: (chatId: string, message: string) =>
    set(() =>
      produce(get(), (draft) => {
        const chat = draft.chats.find((ct) => ct.id === chatId);
        chat && (chat.message = message);
      })
    ),
  streamingMessage: (chatId: string, message: string) =>
    set(() =>
      produce(get(), (draft) => {
        const chat = draft.chats.find((ct) => ct.id === chatId);
        if (chat) {
          chat.message += message;
        }
        else{
          draft.chats.push({
            id: chatId,
            message,
            time: Date.now(),
            name: "GPT",
            status:'typing',
            avatar: '/react.svg'
          });
        }
      })
    ),
}));




const sendRequest = async (messages: ChatCompletionRequestMessage[] ,fn:(id:string, text:string)=>void) => {
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
          text && fn(json.id, text ) 
        
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
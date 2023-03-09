import { create } from 'zustand'


type  Message = {
    role:string,
    message: string;
    time: number;
    chatId: string;
  };



 type ChatStore = {
    chats: Message[]
    setMessage:(chatId:string,message:string)=>void
}


const useChatStore = create<ChatStore>((set,get) => ({
  chats:[],
setMessage:(chatId:string,message:string)=>

set((state)=>{
  
    return {}
}),
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
}))
import produce from "immer";
import { nanoid } from "nanoid";
import { create } from "zustand";

type Message = {
  name: string;
    message: string;
    time: number;
    avatar?: string;
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
          name: "你",
          status:'typing',
          avatar: '/react.svg'
        });
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
      })
    ),
}));

import { ChatInput } from "../components/ChatInput";
import { ChatList } from "../components/ChatList";

export default function AppPage() {
  return (
    <div className="h-screen bg-base-200 flex flex-col  max-w-3xl m-auto "> 
      <ChatList />
      <ChatInput />
    </div>
  );
}

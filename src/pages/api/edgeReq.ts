import type { NextRequest, NextResponse } from 'next/server'
import { CreateChatCompletionRequest } from "openai/dist/api";
  
export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest,
    ) {
      const body :CreateChatCompletionRequest  = await req.json();
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.OPEN_API_KEY,
        },
        body: JSON.stringify({...body,
          model: "gpt-3.5-turbo",
        } as CreateChatCompletionRequest),
      })
  return res
}
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openAI = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(request: NextRequest) {
  let prompt = "Test";

  const response = await openAI.chat.completions.create({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  const aiContent = response.choices[0].message.content;

  let parsedData;
}

import { NextResponse } from "next/server";
import generateUI from "./Model";

const apikey = process.env.GEMINI_API_KEY;


export async function POST(request) {
  const prompt = await request.json();

  const requestPrompt = prompt.prompt;

  const resp = await generateUI(apikey,requestPrompt)

  console.log(resp);

  return new NextResponse(resp);
}

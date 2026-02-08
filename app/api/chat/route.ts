export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "No API key configured" },
        { status: 500 }
      );
    }

    console.log("API kek fetched")

    const ai = new GoogleGenAI({ apiKey });

    // Build conversation context
    const conversationContext = conversationHistory
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join('\n');

    const chatPrompt = `
      You are a helpful financial assistant chatbot for students in Canada. Be conversational, friendly, and concise.
      
      Your expertise includes:
      - Personal finance and budgeting for students
      - Expense tracking and management
      - OSAP (Ontario Student Assistance Program) - applications, eligibility, repayment
      - Tax filing for students - T2202, tuition credits, common deductions
      - Canadian student banking and credit
      - Saving and investing basics for students
      
      Previous conversation:
      ${conversationContext}
      
      User: ${message}
      
      Respond naturally and helpfully. Keep responses under 150 words unless explaining something complex.
      Use Canadian terminology and examples. Be encouraging and supportive.
    `;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: chatPrompt,
    });

    return NextResponse.json({
      response: result.text,
      type: "text"
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
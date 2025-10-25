import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      console.log("Invalid request: missing or invalid message");
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log("Received user message:", message.substring(0, 100));

    // Call Claude API (non-streaming)
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    // Extract text from response
    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    console.log(
      "Claude response:",
      assistantMessage.substring(0, 100),
      "..."
    );

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error: any) {
    console.error("Error calling Claude API:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

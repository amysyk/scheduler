import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { fetchScheduleData } from "@/lib/notion";
import * as fs from "fs";
import * as path from "path";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Read system prompt from file
const systemPromptPath = path.join(
  process.cwd(),
  "prompts",
  "scheduling-assistant.md"
);
const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");

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

    const userName = "app user"; // Phase 2: hardcoded for all users
    console.log("User:", userName, "Question:", message.substring(0, 100));

    // Fetch fresh schedule data from Notion (no caching)
    let scheduleData: string;
    try {
      scheduleData = await fetchScheduleData();
    } catch (error: any) {
      console.error("Notion API: Failed to fetch schedule", {
        error: error.message,
      });
      return NextResponse.json(
        {
          error: "Sorry, I couldn't load the schedule. Please try again.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    // Call Claude API with system prompt and schedule context
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `# Kids Schedule

${scheduleData}

---

User question: ${message}`,
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
    console.log("User:", userName, "Response delivered");

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

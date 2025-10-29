import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { auth } from "@/auth";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user?.email) {
      console.log("Unauthorized request: no valid session");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userName = session.user.email; // Phase 4: Use real user email from Google OAuth

    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      console.log("Invalid request: missing or invalid message");
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log("User:", userName, "Question:", message.substring(0, 100));

    // Read system prompt from file
    const systemPromptPath = path.join(
      process.cwd(),
      "prompts",
      "scheduling-assistant.md"
    );
    const baseSystemPrompt = fs.readFileSync(systemPromptPath, "utf-8");

    // Get current date in Pacific timezone
    const today = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Inject today's date into system prompt
    const systemPrompt = `${baseSystemPrompt}\n\n**Today's date is ${today} (Pacific Time)**`;

    // Read schedule data from file
    const schedulePath = path.join(process.cwd(), "data", "schedule.md");
    const scheduleData = fs.readFileSync(schedulePath, "utf-8");

    // Call Claude API with system prompt and schedule context
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
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

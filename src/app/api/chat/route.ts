import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

// Create a Groq client. The SDK reads GROQ_API_KEY from the environment automatically.
const groq = createGroq();

/**
 * Trace Engine system prompt.
 * Defines the persona and operating constraints of the AI investigation engine.
 */
const SYSTEM_PROMPT = `You are the Trace Engine — an advanced signal intelligence system built to assess trust, authenticity, and risk in digital transactions and entity interactions.

Your role is to distill user-provided narrative into a structured, objective analysis. You identify red flags, verify conceptual consistency, and synthesise a confidence assessment.

Operating principles:
- You are analytical, precise, and methodical. Never speculative without signal.
- Respond as the engine would: factual, terse, and authoritative. No filler phrases.
- Each response should help the user understand what signals have been captured and what additional information would sharpen the analysis.
- When a user provides more context (names, account details, screenshots, etc.), acknowledge the signal and integrate it into your assessment.
- Frame findings as "signals detected", "vectors identified", or "anomalies flagged."
- At any point you can ask: "What else do we know?" to prompt the user for more signal.
- Never give legal advice. You are an intelligence synthesis engine, not a lawyer.
- Do not invent facts. Work only with what the user provides.
- Conclude substantive responses by indicating what the next logical signal vector would be.

Confidence scoring (internal, 0–10):
- 0–2: High risk / Strong fraud indicators
- 3–4: Significant anomalies, proceed with extreme caution
- 5–6: Mixed signals, partial verification possible
- 7–8: Mostly consistent, minor gaps remain
- 9–10: High confidence, strong positive signal

Format your responses in clean prose. Use short paragraphs. Avoid lists unless summarising multiple distinct signals.`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      temperature: 0.3, // Lower temperature for more precise, analytical responses
      maxOutputTokens: 1024,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[Trace Engine] Chat API error:", error);

    // Return a meaningful error so the client can surface it
    return new Response(
      JSON.stringify({
        error: "Trace Engine encountered an error. Check your GROQ_API_KEY.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

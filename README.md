# Trace.One

> Confidence begins with a trace.

Trace.One is a trust-intelligence web app that lets users submit narrative context about a digital transaction or entity — and receive a structured, streamed AI analysis through the **Trace Engine**. The Engine interrogates the signals, flags anomalies, and synthesises a Confidence Index.

---

## How It Works

1. **Home → Chat**: Type a narrative prompt (e.g. "I'm negotiating a ₦2.5M deal with @lux_hairs on Instagram...") and submit it.
2. **Trace Engine**: The prompt is sent to the streaming API at `/api/chat`, which routes it to a Groq-hosted LLM with a structured investigation persona.
3. **Signal Spine**: The AI response streams back token-by-token and is rendered in the chat UI in real time, numbered by signal depth.
4. **Conversation**: Add follow-up context — account details, screenshots, documents — to sharpen the analysis.
5. **Result**: A Confidence Index and synthesis findings are surfaced on the result page.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server components + streaming API routes |
| AI SDK | Vercel AI SDK v6 (`ai`) | First-class streaming + `useChat` hook |
| AI Provider | **Groq** (`@ai-sdk/groq`) | Free tier, fastest inference, streaming support, no OpenAI/Google dependency |
| Model | `llama-3.3-70b-versatile` | High-quality reasoning, free on Groq's tier |
| UI | Tailwind CSS v4 + Shadcn components | Pre-existing project components |
| Streaming renderer | `streamdown` | Streams markdown token-by-token as it arrives |

### Why Groq?

Groq is a hardware-accelerated inference provider hosting open-source models (Llama, Mistral, Gemma, etc.) with an OpenAI-compatible API. Key advantages:

- **Free tier** with generous rate limits — no credit card required to start
- **Fastest public inference** — tokens stream near-instantly, making the Signal Spine feel authentically live
- **Vercel AI SDK native support** via `@ai-sdk/groq`
- **No OpenAI or Google dependency** — satisfies the project constraint
- **Easy provider swap** — changing providers is a one-line change in the API route

**Fallback option:** For fully local inference, use Ollama (`ollama pull llama3.2`) with `@ai-sdk/openai-compatible` pointed at `http://localhost:11434/v1`. See [Switching Providers](#switching-providers) below.

---

## Local Development

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com) (free, no credit card needed)

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd trace.one
npm install

# 2. Environment variables
cp .env.local.example .env.local
# Open .env.local and paste your GROQ_API_KEY

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start a trace.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | **Yes** | API key from [console.groq.com](https://console.groq.com). Free tier available. |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Optional — for future persistent storage via Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Optional — for future persistent storage via Supabase |

Copy `.env.local.example` to `.env.local` and fill in the values.

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                  # Home — prompt input, navigates to /chat?q=...
│   ├── chat/
│   │   └── page.tsx              # Chat page (server) — reads ?q= param, passes to ChatInterface
│   ├── result/
│   │   └── page.tsx              # Result — Confidence Index + synthesis findings
│   └── api/
│       └── chat/
│           └── route.ts          # Streaming POST endpoint (Groq + Trace Engine persona)
│
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx     # useChat wiring, auto-submits initial prompt
│   │   ├── CustomPromptInput.tsx # Follow-up input with file/screenshot attachment support
│   │   ├── SignalSpine.tsx       # Renders message list with numbered engine bubbles
│   │   ├── EngineBubble.tsx      # Streaming assistant message with typing animation
│   │   └── UserBubble.tsx        # User message display
│   ├── home/
│   │   ├── MainInput.tsx         # Home prompt form → router.push('/chat?q=<prompt>')
│   │   └── Chip.tsx              # Example prompt chips with click-to-fill
│   └── ai-elements/              # Low-level AI UI primitives (message, conversation, etc.)
```

### Data Flow

```
Home page
  └─ User types prompt
  └─ Submit → router.push('/chat?q=<encoded-prompt>')

Chat page (server component)
  └─ Awaits searchParams.q
  └─ Passes initialPrompt to <ChatInterface>

ChatInterface (client component, "use client")
  └─ useChat({ api: '/api/chat' })
  └─ On mount: append({ role: 'user', content: initialPrompt })
  └─ Renders <SignalSpine messages={messages} status={status} />
  └─ Renders <CustomPromptInput onSubmit={handleNewMessage} status={status} />

/api/chat (POST, streaming)
  └─ Receives messages[]
  └─ streamText({ model: groq('llama-3.3-70b-versatile'), system: SYSTEM_PROMPT, messages })
  └─ Returns DataStreamResponse (Vercel AI SDK protocol)

Client useChat hook
  └─ Reads the data stream
  └─ Updates messages[] incrementally as tokens arrive
  └─ SignalSpine re-renders with each update → smooth streaming
```

### Session & Storage

All conversation data is **ephemeral by default**. `useChat` holds messages in React state; nothing is written to a database. This is intentional:

- No user data is stored server-side between requests
- Sessions are scoped to the browser tab lifetime
- To add persistence later: add a `onFinish` callback in the API route to write to Supabase

---

## Streaming

The `/api/chat` route uses `streamText` from the Vercel AI SDK and returns a `DataStreamResponse`. The `useChat` hook reads this stream and updates `messages` incrementally as tokens arrive.

`SignalSpine` passes `isStreaming={true}` to the active `EngineBubble` while status is `"streaming"` or `"submitted"`. `EngineBubble` passes this to `MessageResponse` (via `streamdown`), which animates text as tokens arrive.

When the user submits a follow-up, they can also stop the stream at any time using the stop button (square icon) that replaces the send button during streaming.

---

## Switching Providers

The AI provider is isolated to `src/app/api/chat/route.ts`. Swap providers by replacing the import and model call:

### Anthropic Claude

```bash
npm install @ai-sdk/anthropic
```

```ts
import { createAnthropic } from "@ai-sdk/anthropic";
const anthropic = createAnthropic();
// in handler:
model: anthropic("claude-3-5-haiku-20241022"),
```

Add `ANTHROPIC_API_KEY` to `.env.local`.

### Mistral

```bash
npm install @ai-sdk/mistral
```

```ts
import { createMistral } from "@ai-sdk/mistral";
const mistral = createMistral();
model: mistral("mistral-small-latest"),
```

### Ollama (fully local, free)

```bash
ollama pull llama3.2
npm install @ai-sdk/openai-compatible
```

```ts
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
const ollama = createOpenAICompatible({ baseURL: "http://localhost:11434/v1", name: "ollama" });
model: ollama("llama3.2"),
```

No API key needed. No rate limits.

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Set `GROQ_API_KEY` in the Vercel project dashboard under Settings → Environment Variables.

### Other Platforms

```bash
npm run build
npm start
```

Set `GROQ_API_KEY` in the environment. Requires Node.js 18+. No database required by default.

---

## Database (Optional)

The app works without a database. To add persistence for traces:

1. Set up a [Supabase](https://supabase.com) project
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
3. In `src/app/api/chat/route.ts`, add an `onFinish` callback to `streamText`:

```ts
const result = streamText({
  model: ...,
  messages,
  onFinish: async ({ text }) => {
    // write to Supabase here
  },
});
```

The local pgAdmin 17 setup is fully compatible with Supabase's PostgreSQL schema conventions.

# Trace.One

> Confidence begins with a trace.

Trace.one is an AI-native investigative workspace for capturing narratives, evidence, and streamed model outputs in a single traceable environment. It supports rich conversational analysis with branching responses, attachment workflows, and incremental rendering designed for provenance-aware AI collaboration. The app is built around the Trace Engine persona, which reads the prompt, flags signals, and returns a structured assessment.

## What It Does

The current flow is simple:

1. The home page accepts an initial prompt and sends the user to `/chat?q=...`.
2. The chat page auto-submits that prompt into the AI pipeline.
3. `/api/chat` streams the Trace Engine response back to the client.
4. The chat UI renders the conversation in real time.
5. The result route at `/result` renders a dedicated ResultCard view.

The app is intentionally ephemeral by default. There is no database layer required to use the core experience.

## Tech Stack

| Layer              | Choice                              | Notes                                                      |
| ------------------ | ----------------------------------- | ---------------------------------------------------------- |
| Framework          | Next.js 16 App Router               | Server components, route handlers, and client-side chat UI |
| Language           | TypeScript                          | Strict typed React and API code                            |
| AI UI              | `@ai-sdk/react` + `ai`              | Chat transport and streaming helpers                       |
| Provider           | `@ai-sdk/groq`                      | Groq-hosted model access                                   |
| Model              | `llama-3.3-70b-versatile`           | Used in the chat route                                     |
| Styling            | Tailwind CSS v4 + custom components | Existing design system and UI primitives                   |
| Markdown streaming | `streamdown`                        | Used for streamed analysis rendering                       |

## Project Structure

```text
src/
├── app/
│   ├── page.tsx           # Home screen with the main prompt input
│   ├── chat/page.tsx      # Chat route that seeds the initial prompt
│   ├── result/page.tsx    # Dedicated result route with the ResultCard
│   ├── api/chat/route.ts   # Streaming AI endpoint
│   └── globals.css         # App-wide theme and font variables
├── components/
│   ├── chat/               # Chat interface, prompt input, and message spine
│   ├── home/               # Home page input and branding helpers
│   ├── result/             # ResultCard presentation
│   ├── shared/             # Logo, menu, footer, and other shared UI pieces
│   ├── ai-elements/        # Low-level AI/streaming UI primitives
│   └── ui/                 # Reusable design-system components
└── lib/
    └── utils.ts            # Shared helpers
```

## User Flow

### Home

The home page is defined in [src/app/page.tsx](src/app/page.tsx). It presents the landing layout, branding, and the main input. The input component in [src/components/home/MainInput.tsx](src/components/home/MainInput.tsx) pushes the user into the chat route with the prompt encoded in the query string.

### Chat

The chat page in [src/app/chat/page.tsx](src/app/chat/page.tsx) reads the query param, decodes it, and passes it into [src/components/chat/ChatInterface.tsx](src/components/chat/ChatInterface.tsx). That component wires `useChat` to the API route, auto-submits the initial prompt, and renders:

- the conversation transcript
- the streaming engine bubble
- the prompt input for follow-up context

The message stack is rendered by [src/components/chat/SignalSpine.tsx](src/components/chat/SignalSpine.tsx), while [src/components/chat/EngineBubble.tsx](src/components/chat/EngineBubble.tsx) and [src/components/chat/UserBubble.tsx](src/components/chat/UserBubble.tsx) handle the visual styles for assistant and user messages.

### Result

The result page in [src/app/result/page.tsx](src/app/result/page.tsx) renders [src/components/result/ResultCard.tsx](src/components/result/ResultCard.tsx). That card is the dedicated synthesis view for the final assessment experience.

## AI Pipeline

The AI endpoint in [src/app/api/chat/route.ts](src/app/api/chat/route.ts) does the following:

- accepts the chat message array from the client
- converts UI messages to model messages
- calls Groq through the Vercel AI SDK
- streams the response back as a UI message stream response

The system prompt describes the Trace Engine persona: terse, analytical, objective, and focused on signals rather than speculation.

## Fonts and Visual System

The app loads its global fonts in [src/app/layout.tsx](src/app/layout.tsx) and maps the brand font token in [src/app/globals.css](src/app/globals.css). The branding leans on a custom display font for the Trace.One identity and Raleway for general UI text.

## Environment Variables

| Variable                        | Required | Purpose                                         |
| ------------------------------- | -------- | ----------------------------------------------- |
| `GROQ_API_KEY`                  | Yes      | Required for the chat route to stream responses |
| `NEXT_PUBLIC_SUPABASE_URL`      | No       | Reserved for future persistence work            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No       | Reserved for future persistence work            |

## Local Development

### Prerequisites

- Node.js 18+
- A Groq API key

### Setup

```bash
npm install
touch .env.local
npm run dev
```

Add at least `GROQ_API_KEY=...` to `.env.local` before starting the app.

Open [http://localhost:3000](http://localhost:3000) and start a trace.

## Scripts

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build for production         |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

## Notes

- The core chat experience is streamed and browser-local by default.
- The result route is separate from the chat route, so navigation is what exposes the ResultCard view.
- The project currently favors a lightweight, direct flow over a persistence-heavy architecture.

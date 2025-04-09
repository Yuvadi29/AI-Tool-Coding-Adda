import { NextRequest } from 'next/server';
import { fetchTranscript } from "@/lib/fetchTranscript";
import { detectLanguage } from "@/lib/detectLanguage";
import { translateToEnglish } from "@/lib/translateToEnglish";
import { runAITasks } from "@/lib/runAITasks";
import { saveTODB } from "@/lib/saveContent";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
        return new Response("Missing URL", { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            const send = (msg: any) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(msg)}\n\n`));
            };

            try {
                send({ message: "📥 Fetching transcript..." });
                let transcript = await fetchTranscript(url);

                send({ message: "🌐 Detecting language..." });
                const language = await detectLanguage(transcript);

                let translatedTranscript = transcript;
                if (language === "hi") {
                    send({ message: "🌐 Translating Hindi to English..." });
                    translatedTranscript = await translateToEnglish(transcript);
                }

                send({ message: "🤖 Running AI tasks (summary, titles, etc)..." });
                const aiOutput = await runAITasks(translatedTranscript);

                send({ message: "💾 Saving to database..." });
                await saveTODB({
                    url,
                    transcript,
                    translatedTranscript,
                    language,
                    ...aiOutput
                });

                send({ message: "✅ All done!", done: true, ...aiOutput });
                controller.close();
            } catch (err: any) {
                send({ error: err.message || "Internal error" });
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
}

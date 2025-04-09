import { detectLanguage } from "@/lib/detectLanguage";
import { fetchTranscript } from "@/lib/fetchTranscript";
import { runAITasks } from "@/lib/runAITasks";
import { saveTODB } from "@/lib/saveContent";
import { translateToEnglish } from "@/lib/translateToEnglish";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { url } = await req.json()

    try {
        // Fetch Transcript
        let transcript = await fetchTranscript(url);

        //Detect language
        const language = await detectLanguage(transcript);

        //Translate if Hindi
        const translatedTranscript = language === "hi" ? await translateToEnglish(transcript) : transcript;

        // Run AI tasks
        const aiOutput = await runAITasks(translatedTranscript);
        const { chapters, shortsIdeas, titles, thumbnailPrompt, selectedTitle, summary } = aiOutput;

        // Save everything to DB
        await saveTODB({
            url,
            transcript,
            translatedTranscript,
            language,
            chapters,
            shortsIdeas,
            titles,
            thumbnailPrompt,
            selectedTitle,
            summary
        })

        return NextResponse.json({
            success: true,
            ...aiOutput
        })
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            error: error.message || "Internal Error"
        },
            {
                status: 500
            })
    }
}
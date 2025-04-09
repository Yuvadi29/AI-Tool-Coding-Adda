import { GoogleGenAI } from "@google/genai";
import { prompts } from "./prompts";

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenAI({
    apiKey: apiKey,
});

export async function runAITasks(transcript: string) {
    // Utility to call Gemini
    const generate = async(prompt: string) => {
        const res = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [{parts: [{text: prompt}]}],
            config: {
                temperature: 0.7
            },
        })
        return res.text?.trim() || ''
    }

    // Run prompts in parallel
    const [chapterText, shorts, titles, summary] = await Promise.all([
        generate(prompts.chapters(transcript)),
        generate(prompts.shortIdeas(transcript)),
        generate(prompts.titles(transcript)),
        generate(prompts.summary(transcript)),
    ]);

    // Pick the first title to generate thumbnail concept
    const bestTitle = titles.split('\n')[0]?.replace(/^\d+\.\s*/, '') || 'Coding Adda Podcast';
    const thumbnail = await generate(prompts.thumbnail(transcript, bestTitle));

    return  {
        chapters: chapterText,
        shortIdeas: shorts,
        titles,
        thumbnailPrompt: thumbnail,
        summary,
        selectedTitle: bestTitle,
    }
}
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
    apiKey: 'AIzaSyBLCxsijJCFR3L8sYkaQbmJC27gT68pYAQ',
});

export async function translateToEnglish(hindiText:string): Promise<string> {
    const prompt = `You are a translator. Translate the following Hindi transcript to English:\n\n${hindiText}`;

    const completion = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            temperature: 0.3
        }
    });
    console.log(completion.text);
    return completion.text ?? '';
}
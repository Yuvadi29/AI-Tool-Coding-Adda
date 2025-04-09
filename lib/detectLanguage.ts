import { franc } from "franc";

export async function detectLanguage(text:string): Promise<'hi' | 'en'> {
    const langCode = franc(text);

    //Franc returns 'hin' for Hindi and 'eng' for English
    if (langCode === 'hin') return 'hi';
    if (langCode === 'eng') return 'en';

    return 'en'
}
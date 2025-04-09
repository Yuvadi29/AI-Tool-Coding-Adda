import {prisma} from '../prisma/client';

type SaveProps = {
    url: string
    transcript: string
    translatedTranscript: string
    language: string
    chapters: string
    shortsIdeas: string
    titles: string
    selectedTitle: string
    thumbnailPrompt: string
    summary: string
}

export async function saveTODB({
    url, 
    transcript,
    translatedTranscript,
    language,
    chapters,
    shortsIdeas,
    titles,
    selectedTitle,
    thumbnailPrompt,
    summary
}: SaveProps) {
    await prisma.videoContent.create({
        data: {
            youtubeUrl: url,
            language,
            originalTranscript: transcript,
            translatedTranscript,
            chapters,
            shortsIdeas,
            titles,
            selectedTitle,
            thumbnailPrompt,
            summary,
        },
    })
}
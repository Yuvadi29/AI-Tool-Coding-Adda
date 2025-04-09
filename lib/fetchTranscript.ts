import { YoutubeTranscript } from "youtube-transcript";

export async function fetchTranscript(videoUrl: string): Promise<string>{
    try {
        const transcriptArray = await YoutubeTranscript.fetchTranscript(videoUrl);

        const transcript = transcriptArray.map((item) => item.text)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()

        return transcript
    } catch (error) {
        console.error('Error Fetching Transcript: ', error);
        throw new Error('Could not fetch transcript')
    }
}
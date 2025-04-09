export const prompts = {
    chapters: (transcript: string) => `
    You are a podcast assistant. Divide the following transcript into chapters with the following format:
    1. Chapter Title - Short Summary - Timestamp(Approx)
    Here is the transcript:
    ${transcript}
    `,
    shortIdeas: (transcript: string) => `
    Based on the transcript below, suggest 5 short-form video ideas.
    Each ideas should include:
     - Hook
     - Caption
     - Timestamp(approx)
     Transcript:
     ${transcript}
    `,
    titles: (transcript: string) => `
    Suggest 5 engaging, click-worthy Youtube titles based on this transcript:
    ${transcript}`,
    thumbnail: (transcript: string, title: string) => `
    Based on the video title "${title}", and the transcript below, suggest a thumbnail concept with:
     - Text overlay
     - Visual scene
     Transcript:
     ${transcript}`,
    summary: (transcript: string) => `
     Summarize the following podcast transcript in 3 ways:
     1. 2-line summary
     2. Medium paragraph
     3. 5 Bullet points
     Transcript:
     ${transcript}`,
}
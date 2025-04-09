export const prompts = {
    chapters: (transcript: string) => `
    You are a world-class podcast assistant specializing in video structuring. Break the following transcript into clearly defined chapters. Each chapter should be distinct, chronologically ordered, and formatted like this:
    
    1. Chapter Title — Short Summary — Approx. Timestamp (mm:ss)
    
    - Make titles engaging and specific
    - Summaries should be 1-2 lines and highlight the essence of the section
    - Estimate timestamps based on natural breaks in conversation
    
    Transcript:
    ${transcript}
    `,
    shortIdeas: (transcript: string) => `
    You are an expert short-form content strategist. From the transcript below, extract 5 highly engaging short-form video ideas for YouTube Shorts, Instagram Reels, or TikTok.
    
    For each idea, provide:
    - Hook (1 sentence designed to grab attention instantly)
    - Caption (Enticing, context-giving sentence or tagline)
    - Approximate Timestamp (mm:ss from the transcript)
    
    Each idea should be punchy, viral-friendly, and based on compelling moments.
    
    Transcript:
    ${transcript}
    `,
    titles: (transcript: string) => `
    You are a top-tier YouTube strategist. Based on the following transcript, generate 5 engaging, high-converting video titles that:
    - Spark curiosity
    - Promise value
    - Are optimized for clicks
    
    Avoid clickbait—ensure the titles reflect the actual content and tone of the video.
    
    Transcript:
    ${transcript}
    `
    ,
    thumbnail: (transcript: string, title: string) => `
    You're a creative director for viral YouTube content. Based on the video title "${title}" and the transcript, suggest a compelling thumbnail concept.

    Include:
    - **Text Overlay**: 3–5 impactful words max. Should evoke curiosity/emotion.
    - **Visual Scene**: Describe a bold, eye-catching visual that summarizes the video’s core message or emotion.

    Transcript:
    ${transcript}
    `
    ,
    summary: (transcript: string) => `
     Summarize the following podcast transcript in 3 ways:
     1. 2-line summary
     2. Medium paragraph
     3. 5 Bullet points
     Transcript:
     ${transcript}`,
}
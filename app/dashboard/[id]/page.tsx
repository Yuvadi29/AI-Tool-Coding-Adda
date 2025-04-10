import { prisma } from '../../../prisma/client';
import ReactMarkdown from 'react-markdown';

interface PageProps {
    params: { id: string }
};

export default async function VideoDetails({ params }: PageProps) {
    const video = await prisma.videoContent.findUnique({
        where: { id: params?.id },
    })

    if (!video) return <div className='p-10'>Video Not Found</div>

    return (
        <main className='max-w-5xl mx-auto p-8'>
            <h1 className="text-2xl font-bold mb-4">{video?.customTitle}</h1>

            <div className="flex justify-center items-center rounded">
                <iframe
                    width="600"
                    height="350"
                    src={video?.youtubeUrl?.replace('watch?v=', 'embed/')}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className='rounded-md shadow-md'
                ></iframe>
            </div>


            <section className='mt-6 space-y-6'>
                <Block title='Summary' content={video?.summary} />
                <Block title='Chapters' content={video?.chapters} />
                <Block title='Short Form Ideas' content={video?.shortsIdeas} />
                <Block title='Titles' content={video?.titles} />
                <Block title='Thumbnail Prompts' content={video?.thumbnailPrompt} />
                <Block title='Original Transcript' content={video?.originalTranscript.slice(0, 2000) + '...'} />

            </section>
        </main>
    )
}

function Block({ title, content }: { title: string; content: string }) {
    return (
        <div>
            <h2 className="font-semibold text-lg mb-1">{title}</h2>
            <pre className='bg-gray-100 p-4 rounded overflow-x-auto whitespace-pre-wrap'>
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </pre>
        </div>
    )
}
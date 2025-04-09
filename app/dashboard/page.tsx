import Link from 'next/link';
import { prisma } from '../../prisma/client';
import Image from 'next/image';

export default async function Dashboard() {
    const videos = await prisma.videoContent.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    });

    if (!videos || videos.length === 0) {
        return <div>No videos found</div>;
    }

    // Helper function to extract video ID from YouTube URL
    const getVideoId = (videoUrl: string) => {
        const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = videoUrl.match(videoIdRegex);

        if (match) {
            return match[1]; // Return the captured video ID
        }

        return null;
    };

    return (
        <main className='max-w-7xl mx-auto p-6'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => {
                    const videoId = getVideoId(video?.youtubeUrl); // Get video ID synchronously

                    return (
                        <div
                            key={video.id}
                            className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            <Link href={`/dashboard/${video.id}`}>
                                <div className="block p-4">
                                    {/* Thumbnail */}
                                    <div className="relative w-full h-56 mb-4">
                                        <Image
                                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} // Use resolved videoId
                                            layout="fill"
                                            objectFit="cover"
                                            alt="Thumbnail"
                                            className="rounded-t-lg"
                                        />
                                    </div>
                                    {/* Video title */}
                                    <div className="font-semibold text-xl text-blue-600 hover:underline">
                                        {video.id || 'Untitled'}
                                    </div>
                                    {/* Video URL */}
                                    {/* <div className="text-sm text-gray-500 mt-1">
                                        {video.youtubeUrl}
                                    </div> */}
                                    {/* Video language */}
                                    {/* <div className="text-sm mt-1 text-gray-400">
                                        Language: {video.language?.toUpperCase()}
                                    </div> */}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

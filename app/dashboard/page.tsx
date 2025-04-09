import Link from 'next/link';
import { prisma } from '../../prisma/client';

export default async function Dashboard() {
    const videos = await prisma.videoContent.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })

    return (
        <main className='max-w-4xl mx-auto p-6'>
            {videos?.map((video) => (
                <div
                    key={video?.id}
                    className="border p-4 rounded shadow hover:bg-gray-50 transition">
                    <Link href={`/dashboard/${video?.id}`}>
                        <div className="font-medium text-lg text-blue-600 hover:underline">
                            {video?.selectedTitle || 'UnTitled'}
                        </div>
                        <div className="text-sm text-gray-500">{video?.youtubeUrl}</div>
                        <div className="text-sm mt-1 text-gray-400">
                            Language: {video?.language?.toUpperCase()}
                        </div>
                    </Link>
                </div>
            ))}
        </main>
    )
}
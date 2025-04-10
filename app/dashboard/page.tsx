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
    return (  
      <div className="text-center text-white/80 py-20 text-xl">
        🚫 No videos found.
      </div>
    );
  }

  // Extract YouTube Video ID
  const getVideoId = (videoUrl: string) => {
    const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(videoIdRegex);
    return match ? match[1] : null;
  };


  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        📼 Your AI-Enhanced YouTube Content
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {videos.map((video) => {
          const videoId = getVideoId(video?.youtubeUrl);

          return (
            <Link
              key={video.id}
              href={`/dashboard/${video.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/40 border border-white/10 transition-transform transform hover:scale-105 bg-white/5 backdrop-blur-lg"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-84">
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  layout="fill"
                  objectFit="cover"
                  alt="Thumbnail"
                  className="rounded-t-2xl group-hover:brightness-110"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-cyan-300 group-hover:text-white transition">
                  {video?.customTitle || video?.selectedTitle || "Untitled"}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Language: <span className="uppercase">{video.language}</span>
                </p>
              </div>

              {/* Glow Overlay */}
              <span className="absolute inset-0 rounded-2xl pointer-events-none group-hover:opacity-100 opacity-0 transition duration-300 bg-blue-500/10 blur-xl animate-pulse-slow" />
            </Link>
          );
        })}
      </div>
    </main>
  );
}

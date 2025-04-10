'use client';

import TranscriptForm from '@/components/Form';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-12 flex flex-col items-center">

      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-text">
          🚀 Coding Adda AI Assistant
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Let AI analyze YouTube videos, generate summaries, chapter breakdowns, titles, thumbnails & more. One-click magic 🪄.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
        <TranscriptForm />
      </div>

      {/* Dashboard Button */}
      <div className="mt-10">
        <a href="/dashboard">
          <Button variant="ghost" className="text-lg px-6 py-3 font-semibold border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl cursor-pointer">
            <Sparkles className="mr-2 w-5 h-5" />
            Go to Dashboard
          </Button>
        </a>
      </div>

      {/* Footer Glow */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0f0c29] to-transparent pointer-events-none" />
    </main>
  );
};

export default LandingPage;

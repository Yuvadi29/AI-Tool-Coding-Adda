'use client';
import TranscriptForm from '@/components/Form'
import React, { useEffect, useState } from 'react'
import { prisma } from '../prisma/client';

interface Video {
  id: string;
  selectedTitle: string;
  youtubeUrl: string;
  language: string;
}

const page = () => {

  return (
    <main className='max-w-2xl mx-auto p-10'>
      <h1 className="text-2xl font-bold mb-4">Coding Adda AI Tool</h1>
      <TranscriptForm />
      
      <a href='/dashboard' className='font-bold text-2xl cursor-pointer'>Go To Dashboard</a>

    </main>
  )
}

export default page
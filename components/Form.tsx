"use client";

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner';

const TranscriptForm = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async () => {
        setLoading(true);
        const eventSource = new EventSource(`/api/generate-sse?url=${encodeURIComponent(url)}`)

        eventSource.onmessage = (event) => {
            const { message, done, error } = JSON.parse(event.data);
            if (error) {
                toast.error(error);
                eventSource.close();
                setLoading(false);
                return;
            }
            toast(message);
            if (done) {
                toast.success("🎉 All done!");
                eventSource.close();
                setLoading(false);
            }
        };

        eventSource.onerror = () => {
            toast.error("Something went wrong.");
            eventSource.close();
            setLoading(false);
        };
    }

    return (
        <div className='flex gap-4 items-center'>
            <Input
                type='text'
                placeholder='Enter Youtube Video URL...'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleSubmit} disabled={loading} className='cursor-pointer'>
                {loading ? 'Generating...' : "Generate"}
            </Button>

        </div>
    )
}

export default TranscriptForm
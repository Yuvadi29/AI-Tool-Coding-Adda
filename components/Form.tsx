"use client";

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner';

const TranscriptForm = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const res = await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify({ url }),
        })

        const data = await res.json();
        if (res.ok) {
            toast.success("AI content generated successfully!!")
        } else {
            toast.error(data.error || "Something went wrong")
        }

        setLoading(false);
    }

    return (
        <div className='flex gap-4 items-center'>
            <Input
                type='text'
                placeholder='Enter Youtube Video URL...'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Generating...' : "Generate"}
            </Button>

        </div>
    )
}

export default TranscriptForm
// @ts-nocheck

import { useState, useEffect } from 'react'
import { useNFTContentType } from '@cura/hooks'

function Text({ media }: { media: string }) {
    const [content, setContent] = useState('')

    useEffect(() => {
        fetch(media)
            .then((r) => r.text())
            .then((r) => setContent(r))
    }, [])

    return <div>{content}</div>
}

function Video({ media, autoPlay }: { media: string; autoPlay: boolean }) {
    return (
        <video muted autoPlay={autoPlay} controls={!autoPlay} loop playsInline>
            <source src={media} />
        </video>
    )
}

function Audio({ media }: { media: string }) {
    return <audio controls src={media}></audio>
}

function Image({ media }: { media: string }) {
    return <img src={media} />
}

function Iframe({ media }: { media: string }) {
    return <iframe src={media} frameBorder="0" scrolling="no"></iframe>
}

export function MediaObject({
    mediaURI,
    autoPlay = false,
}: {
    mediaURI?: string
    autoPlay: boolean
}) {
    const [mediaType, setMediaType] = useState()
    const { contentType } = useNFTContentType(mediaURI)

    useEffect(() => {
        setMediaType(contentType)
    }, [mediaURI, contentType])

    switch (mediaType) {
        case 'image':
            return <Image media={mediaURI} />

        case 'video':
            return <Video media={mediaURI} autoPlay={autoPlay} />

        case 'audio':
            return <Audio media={mediaURI} />

        case 'text':
            return <Text media={mediaURI} />

        case 'html' || 'other':
            return <Iframe media={mediaURI} />

        default:
            return <></>
    }
}

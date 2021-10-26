// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState, useEffect } from 'react'
import { useNFTContentType } from '@cura/hooks'

function Text({ media, width, height }) {
    const [content, setContent] = useState('')

    useEffect(() => {
        fetch(media)
            .then((r) => r.text())
            .then((r) => setContent(r))
    }, [])

    return (
        <div
            sx={{
                width: width,
                height: height,
            }}
        >
            {content}
        </div>
    )
}

function Video({ media, width, height, autoPlay }) {
    return (
        <video width={width} height={height} muted autoPlay={autoPlay} controls={!autoPlay} loop playsInline>
            <source src={media} />
        </video>
    )
}

function Audio({ media, width, height, }) {
    return <audio controls src={media}></audio>
}

function Image({ media, width, height, }) {
    return <img width={width} height={height} src={media} />
}

function Iframe({ media, width, height, }) {
    return <iframe width={width} height={height} src={media} frameBorder="0" scrolling="no"></iframe>
}

export function MediaObject({
    mediaURI,
    width,
    height,
    autoPlay = false,
}: {
    mediaURI?: string
    width?: number
    height?: number
    autoPlay: boolean
}) {
    const [mediaType, setMediaType] = useState()
    const { contentType } = useNFTContentType(mediaURI)

    useEffect(() => {
        setMediaType(contentType)
    }, [mediaURI, contentType])

    switch (mediaType) {
        case 'image':
            return (
                <Image
                    media={mediaURI}
                    width={width}
                    height={height ? height : width}
                />
            )

        case 'video':
            return (
                <Video
                    media={mediaURI}
                    width={width}
                    height={height ? height : width}
                    autoPlay={autoPlay}
                />
            )

        case 'audio':
            return (
                <Audio
                    media={mediaURI}
                    width={width}
                    height={height ? height : width}
                />
            )

        case 'text':
            return (
                <Text
                    media={mediaURI}
                    width={width}
                    height={height ? height : width}
                />
            )

        case 'html' || 'other':
            return (
                <Iframe
                    media={mediaURI}
                    width={width}
                    height={height ? height : width}
                />
            )

        default:
            return <></>
    }
}

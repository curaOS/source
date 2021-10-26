// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState, useEffect } from 'react'
import { useNFTContentType } from '@cura/hooks'

type mediaObjectProps = {
    mediaURI: string
    width?: number
    height?: number
    autoPlay?: boolean
}

function Text({ mediaURI, width, height }: mediaObjectProps) {
    const [content, setContent] = useState('')

    useEffect(() => {
        fetch(mediaURI)
            .then((r) => r.text())
            .then((r) => setContent(r))
    }, [])

    return (
        <div
            sx={{
                width: width,
                height: height || width,
            }}
        >
            {content}
        </div>
    )
}

function Video({ mediaURI, width, height, autoPlay }: mediaObjectProps) {
    return (
        <video
            width={width}
            height={height || width}
            muted
            autoPlay={autoPlay}
            controls={!autoPlay}
            loop
            playsInline
        >
            <source src={mediaURI} />
        </video>
    )
}

function Audio({ mediaURI, width, height }: mediaObjectProps) {
    return <audio controls src={mediaURI}></audio>
}

function Image({ mediaURI, width, height }: mediaObjectProps) {
    return <img width={width} height={height || width} src={mediaURI} />
}

function Iframe({ mediaURI, width, height }: mediaObjectProps) {
    return (
        <iframe
            width={width}
            height={height || width}
            src={mediaURI}
            frameBorder="0"
            scrolling="no"
        ></iframe>
    )
}

export function MediaObject(props: mediaObjectProps) {
    const [mediaType, setMediaType] = useState()
    const { contentType } = useNFTContentType(props.mediaURI)

    useEffect(() => {
        setMediaType(contentType)
    }, [props.mediaURI, contentType])

    switch (contentType) {
        case 'image':
            return <Image {...props} />

        case 'video':
            return <Video {...props} />

        case 'audio':
            return <Audio {...props} />

        case 'text':
            return <Text {...props} />

        case 'html' || 'other':
            return <Iframe {...props} />

        default:
            return <></>
    }
}

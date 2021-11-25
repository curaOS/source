// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Placeholder } from './Placeholder'

type ContentType = 'image' | 'video' | 'audio' | 'text' | undefined

type mediaObjectProps = {
    mediaURI: string
    type: ContentType
    width?: number | string
    height?: number | string
    loading?: boolean
    autoPlay?: boolean
}

function Text({ mediaURI, width, height }) {
    return (
        <pre
            sx={{
                width: width,
                height: height,
            }}
        >
            {mediaURI}
        </pre>
    )
}

function Video({ mediaURI, width, height, autoPlay }: mediaObjectProps) {
    return (
        <video
            width={width}
            height={height}
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

function Audio({ mediaURI }: mediaObjectProps) {
    return <audio controls src={mediaURI}></audio>
}

function Image({ mediaURI, width, height }: mediaObjectProps) {
    return (
        <img
            sx={{
                width: width,
                minHeight: height,
                maxHeight: '70vh',
                objectFit: 'cover',
                bg: 'gray.3',
            }}
            src={mediaURI}
        />
    )
}

function Iframe({ mediaURI, width, height }: mediaObjectProps) {
    return (
        <iframe
            width={width}
            height={height}
            src={mediaURI}
            frameBorder="0"
            scrolling="no"
        ></iframe>
    )
}

/**
 * MediaObject
 *
 * @param {string} mediaURI - URI to the media or Raw text if type == text
 * @param {ContentType} type - image | video | audio | text | undefined
 *
 */
export function MediaObject(props: mediaObjectProps) {
    if (props.loading) {
        return (
            <Placeholder
                width={props.width}
                height={props.height || props.width}
                style={{ my: 0 }}
            />
        )
    }
    switch (props.type) {
        case 'image':
            return <Image {...props} />

        case 'video':
            return <Video {...props} />

        case 'audio':
            return <Audio {...props} />

        case 'text':
            return <Text {...props} />

        default:
            return <Iframe {...props} />
    }
}

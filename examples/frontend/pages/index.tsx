// @ts-nocheck
/** @jsxImportSource theme-ui */

import { IconButton } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { ProjectCard } from '@cura/components'
import { useState } from 'react'
import { useRouter } from 'next/router'

const slideDetails = [
    {
        title: 'SHARE',
        image: '/share.png',
        description: 'Emoji art saved on blockchain.',
        tags: ['on-chain'],
        path: '/share',
    },
    {
        title: 'ML/1W',
        image: '/1w.png',
        description: 'A series of not so watches.',
        tags: ['ML'],
        path: '/ml/1w',
    },
    {
        title: 'ML/APRTS',
        image: '/aprts.png',
        description: 'Apparations example from Eth.',
        tags: ['js', 'sample'],
        path: '/cc/aprts',
    },
    {
        title: 'ML/1C',
        image: '/1c.png',
        description: 'Generated clothing models.',
        tags: ['ML'],
        path: '/ml/1c',
    },
    {
        title: 'CC/SQGL',
        image: '/sqgl.png',
        description: 'A sample of ArtBlocks Squiggles.',
        tags: ['js', 'sample'],
        path: '/cc/sqgl',
    },
]

const Index = () => {
    const [slide, setSlide] = useState(0)
    const router = useRouter()

    const goToSlide = (j: number) => {
        if (j == slideDetails.length) {
            setSlide(0)
        } else if (j == -1) {
            setSlide(slideDetails.length - 1)
        } else {
            setSlide(j)
        }
    }

    return (
        <div
            sx={{
                display: 'flex',
                flexDirection: ['column', 'row'],
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                // p: [80, 0, 50, 200],
                backgroundImage: (t) => `
		            linear-gradient(
                        to top,
                        ${alpha('black', 0.0)(t)},
                        ${alpha('black', 0.05)(t)}
		            )
		            `,
            }}
        >
            <IconButton
                aria-label="Previous slide"
                onClick={() => goToSlide(slide - 1)}
                sx={{
                    cursor: 'pointer',
                    ':hover': {
                        opacity: '0.8',
                    },
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="31"
                    height="31"
                    fill="currentcolor"
                >
                    <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
                </svg>
            </IconButton>
            <ProjectCard
                title={slideDetails[slide].title}
                image={slideDetails[slide].image}
                description={slideDetails[slide].description}
                tags={slideDetails[slide].tags}
                onCreateClick={() =>
                    router.push(slideDetails[slide].path + '/create')
                }
                onExploreClick={() =>
                    router.push(slideDetails[slide].path + '/explore')
                }
            />
            <IconButton
                aria-label="Next slide"
                onClick={() => goToSlide(slide + 1)}
                sx={{
                    cursor: 'pointer',
                    ':hover': {
                        opacity: '0.8',
                    },
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="31"
                    height="31"
                    fill="currentcolor"
                >
                    <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                </svg>
            </IconButton>
        </div>
    )
}

export default Index

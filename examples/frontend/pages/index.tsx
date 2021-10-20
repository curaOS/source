// @ts-nocheck
/** @jsxImportSource theme-ui */

import { IconButton } from 'theme-ui'
import { motion, AnimatePresence } from 'framer-motion'
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

const slideVariants = {
    enter: (direction: number) => {
        return {
            y: '-50%',
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }
    },
    center: {
        zIndex: 1,
        x: '-50%',
        y: '-50%',
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            y: '-50%',
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }
    },
}

const Index = () => {
    const router = useRouter()
    const [[page, direction], setPage] = useState([0, 0])

    const slidify = (newDirection: number) => {
        if (page == slideDetails.length - 1 && newDirection == 1) {
            setPage([0, newDirection])
        } else if (page == 0 && newDirection < 0) {
            setPage([slideDetails.length - 1, newDirection])
        } else {
            setPage([page + newDirection, newDirection])
        }
    }

    return (
        <div
            sx={{
                overflow: 'hidden',
                bg: 'gray.3',
                backgroundImage:
                    'radial-gradient(circle, #d7d7dd, #e1e1e5, #ebebee, #f5f5f6, #ffffff)',
            }}
        >
            <motion.div
                sx={{
                    transform: 'translate3d(0, 0, 0) scale(1, 1)',
                    height: '100vh',
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x
                    if (swipe < -1000) {
                        slidify(1)
                    } else if (swipe > 1000) {
                        slidify(-1)
                    }
                }}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 200, damping: 20 },
                            opacity: { duration: 0.2 },
                        }}
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                        }}
                    >
                        <ProjectCard
                            title={slideDetails[page].title}
                            image={slideDetails[page].image}
                            description={slideDetails[page].description}
                            tags={slideDetails[page].tags}
                            onCreateClick={() =>
                                router.push(slideDetails[page].path + '/create')
                            }
                            onExploreClick={() =>
                                router.push(
                                    slideDetails[page].path + '/explore'
                                )
                            }
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            <IconButton
                aria-label="Previous slide"
                onClick={() => slidify(-1)}
                sx={{
                    position: 'absolute',
                    top: [null, '50%'],
                    left: ['7%', null, null, '20%', '30%'],
                    bottom: ['-1%', null],
                    transform: [null, 'translate(0, -50%)'],
                    height: ['6rem', '8rem'],
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
            <IconButton
                aria-label="Next slide"
                onClick={() => slidify(1)}
                sx={{
                    position: 'absolute',
                    top: [null, '50%'],
                    right: ['7%', null, null, '20%', '30%'],
                    bottom: ['-1%', null],
                    transform: [null, 'translate(0, -50%)'],
                    height: ['6rem', '8rem'],
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

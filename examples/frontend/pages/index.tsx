// @ts-nocheck
/** @jsxImportSource theme-ui */

import { IconButton, Box } from 'theme-ui'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from '@cura/components'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useNearHooksContainer } from '@cura/hooks'
import { mapPathToProject } from 'utils/path-to-project'
import Link from 'next/link'

import Header from '../containers/Header'

const slideDetails = [
    {
        title: `SHARE`,
        image: `/share.png`,
        description: `Emoji art saved on blockchain.`,
        tags: [`on-chain`],
        path: `/share`,
    },
    {
        title: `ML/1W`,
        image: `/1w.png`,
        description: `A series of not so watches.`,
        tags: [`ML`],
        path: `/ml/1w`,
    },
    {
        title: `CC/APRTS`,
        image: `/aprts.png`,
        description: `Apparations example from Eth.`,
        tags: [`js`, `sample`],
        path: `/cc/aprts`,
    },
    {
        title: `ML/1C`,
        image: `/1c.png`,
        description: `Generated clothing models.`,
        tags: [`ML`],
        path: `/ml/1c`,
    },
    {
        title: `CC/SQGL`,
        image: `/sqgl.png`,
        description: `A sample of ArtBlocks Squiggles.`,
        tags: [`js`, `sample`],
        path: `/cc/sqgl`,
    },
]

const slideVariants = {
    enter: (direction: number) => {
        return {
            y: `-65%`,
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }
    },
    center: {
        zIndex: 1,
        x: `-50%`,
        y: `-65%`,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            y: `-65%`,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }
    },
}

const Index = () => {
    const router = useRouter()
    const [[page, direction], setPage] = useState([0, 0])
    const [pauseSlider, setPauseSlider] = useState(0)
    const [loading, setLoading] = useState(true)

    const { signOut } = useNearHooksContainer()


    const slidify = (newDirection: number) => {
        if (pauseSlider) return
        setPauseSlider(1)
        setTimeout(() => setPauseSlider(0), 300)
        if (page == slideDetails.length - 1 && newDirection == 1) {
            setPage([0, newDirection])
        } else if (page == 0 && newDirection < 0) {
            setPage([slideDetails.length - 1, newDirection])
        } else {
            setPage([page + newDirection, newDirection])
        }
    }

    useEffect(() => {
        setPage([Math.floor(Math.random() * slideDetails.length), 0])
        setLoading(false)
    }, [])

    const handleClick = async (path, buttonType) =>{
        if(localStorage.getItem('contractAddress') != mapPathToProject(path)){
            localStorage.removeItem('contractAddress')
            await signOut();
        }

        if(buttonType == 'create') {
            router.push(
                slideDetails[page].path + `/create`
            )
        } else {
            router.push(
                slideDetails[page].path + `/explore`
            )
        }
    }

    return (
        <Box
            sx={{
                overflow: ['auto', `hidden`],
                height: `100vh`,
                position: `relative`,
            }}
        >
            <Header
                isInitial={true}
                nextLinkWrapper={(href, children) => (
                    <Link href={href}>{children}</Link>)
                }
            />
            <div
                sx={{
                    // overflow: `hidden`,
                    height: `100vh`,
                    position: `relative`,
                    marginTop:['30px', '0px']
                }}
            >
                <motion.div
                    sx={{
                        transform: `translate3d(0, 0, 0) scale(1, 1)`,
                        height: `100%`,
                        width: `100%`,
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
                    {!loading && (
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: {
                                        type: `spring`,
                                        stiffness: 200,
                                        damping: 20,
                                    },
                                    opacity: { duration: 0.2 },
                                }}
                                sx={{
                                    position: `absolute`,
                                    left: `50%`,
                                    top: `48%`,
                                    width: [`100%`, `70%`, `auto`],
                                }}
                            >
                                <ProjectCard
                                    title={slideDetails[page].title}
                                    image={slideDetails[page].image}
                                    description={slideDetails[page].description}
                                    tags={slideDetails[page].tags}
                                    onCreateClick={() =>
                                        handleClick(slideDetails[page].path, 'create')
                                    }
                                    onExploreClick={() =>
                                        handleClick(slideDetails[page].path, 'explore')
                                    }
                                />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </motion.div>
                <IconButton
                    aria-label="Previous slide"
                    onClick={() => slidify(-1)}
                    sx={{
                        position: `absolute`,
                        top: [null, `calc(50% - 86px)`],
                        left: [`7%`, null, null, `20%`, `30%`],
                        bottom: [`10%`, null],
                        transform: [null, `translate(0, -50%)`],
                    }}
                >
                    <svg width="25" height="23" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path strokeWidth="0.4" d="M16.9044 9.00747L16.9282 8.01021L2.69649 7.67017C4.71243 5.95134 8.38466 2.77535 10.6984 0.772604L10.093 0.00976562L0.81521 8.10334L0.813721 8.16567L9.69836 16.5269L10.339 15.8146C8.16361 13.767 4.56614 10.3341 2.67266 8.66743L16.9044 9.00747Z" fill="#101010"/>
                    </svg>   
                </IconButton>
                <IconButton
                    aria-label="Next slide"
                    onClick={() => slidify(1)}
                    sx={{
                        position: `absolute`,
                        top: [null, `calc(50% - 86px)`],
                        right: [`7%`, null, null, `20%`, `30%`],
                        bottom: [`10%`, null],
                        transform: [null, `translate(0, -50%)`],
                    }}
                >
                    <svg width="25" height="23" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path strokeWidth="0.4" d="M0.915918 7.68227L0.89209 8.67954L15.1238 9.01958C13.1079 10.7384 9.43566 13.9144 7.1219 15.9171L7.72732 16.68L17.0051 8.5864L17.0066 8.52407L8.12197 0.162842L7.48131 0.875119C9.65671 2.92276 13.2542 6.3556 15.1477 8.02232L0.915918 7.68227Z" fill="#101010"/>
                    </svg>
                </IconButton>
            </div>
        </Box>
    )
}

export default Index

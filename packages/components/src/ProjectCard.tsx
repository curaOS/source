// @ts-nocheck
/** @jsxImportSource theme-ui */
import { Box, Heading, Text, Badge, Button, AspectImage } from 'theme-ui'

export function ProjectCard({
    title,
    description,
    image,
    share,
    tags,
    onCreateClick,
    onExploreClick,
}: {
    title?: string
    description?: string
    image?: string
    share?: string
    tags?: Array
    onCreateClick?: () => void
    onExploreClick?: () => void
}) {
    return (
        <Box
            bg="bg"
            p={3}
            sx={{
                width: '90vw',
                maxWidth: 470,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <AspectImage
                ratio={1}
                src={image}
                draggable={false}
                sx={{
                    width: '100%',
                    height: '100%',
                    bg: 'gray.3',
                    objectFit: 'cover',
                }}
            />
            <Box mt={[3, 4]}>
                <Box
                    mb={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        sx={{
                            variant: 'text.h2',
                            color: 'text',
                        }}
                    >
                        {title}
                    </Text>
                    <Box>
                        {tags.map((tag, i) => (
                            <Badge variant="tag" ml={2} my={1} key={i}>
                                {tag}
                            </Badge>
                        ))}
                    </Box>
                </Box>
                <Box mb={[4, 5]}>
                    <Text variant="body" sx={{}}>
                        {description}
                    </Text>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Button onClick={onCreateClick} variant="navigation">
                        Create
                    </Button>
                    <Button onClick={onExploreClick} variant="navigation">
                        Explore
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

// @ts-nocheck
/** @jsxImportSource theme-ui */
import { Box, Heading, Text, Image, Badge, Divider, Button } from 'theme-ui'

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
            sx={{
                width: 300,
                pb: 12,
                pt: 0,
                px: 0,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'muted',
                borderRadius: 4,
                backgroundColor: 'background',
            }}
        >
            <div
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Image
                    src={image}
                    width={300}
                    height={300}
                    sx={{ borderTopRightRadius: 2, borderTopLeftRadius: 2, bg: 'gray.3' }}
                />
                <div
                    sx={{
                        mx: 3,
                        my: 2,
                    }}
                >
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text sx={{ color: 'gray.9', my: 0, fontSize: 21 }}>
                            {title}
                        </Text>
                        <div>
                            {tags.map((tag) => (
                                <Badge
                                    sx={{ fontSize: 12, mr: 1, bg: 'gray.7' }}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Divider sx={{ mb: 1, mt: 2 }} />
                    <Text
                        sx={{
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 13,
                        }}
                    >
                        {description}
                    </Text>
                    <Divider sx={{ mb: 3, mt: 1 }} />
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            mt: 0,
                        }}
                    >
                        <Button onClick={onCreateClick} variant="due">
                            Create
                        </Button>
                        <Button onClick={onExploreClick} variant="uno">
                            Explore
                        </Button>
                    </div>
                </div>
            </div>
        </Box>
    )
}

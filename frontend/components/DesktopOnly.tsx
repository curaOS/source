import React from 'react'
import { Box } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'

export default function DesktopOnly({
  children,
  display = `block`,
}: {
  children: JSX.Element
  display?: string
}) {
  const ariaHidden = useResponsiveValue([true, true, true, false])
  return (
    <Box
      sx={{ display: [`none`, `none`, `none`, display] }}
      aria-hidden={ariaHidden}
      suppressHydrationWarning
    >
      {children}
    </Box>
  )
}

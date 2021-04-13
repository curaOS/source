import React from 'react'
import { useResponsiveValue } from '@theme-ui/match-media'
import { Box } from 'theme-ui'

export default function MobileOnly({
  children,
  display = `block`,
}: {
  children: JSX.Element
  display?: string
}) {
  const ariaHidden = useResponsiveValue([false, false, false, true])
  return (
    <Box
      sx={{ display: [display, display, display, `none`] }}
      aria-hidden={ariaHidden}
      suppressHydrationWarning
    >
      {children}
    </Box>
  )
}

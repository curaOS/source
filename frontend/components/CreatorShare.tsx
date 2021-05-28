/** @jsxImportSource theme-ui */

import React from 'react'
import { Box, Heading, Text } from 'theme-ui'

export default function CreatorShare({
  address,
  share,
}: {
  address?: string,
  share?: string,
}) {
  return (
    <Box sx={{width: 300, pb: 12, pt: 1, px:20, borderWidth: 2, borderStyle: "solid",  borderColor: "muted", borderRadius: 4 }}>
      <Text sx={{color: "secondary", fontSize: 12 }}>ROYALTIES</Text>
      <div sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 2}}>
        <Heading as="h5" sx={{color: "text"}}>{address}</Heading>
        <Heading as="h5" sx={{color: "text"}}>{parseInt(share) / 100}%</Heading>
      </div>
    </Box>
  )
}

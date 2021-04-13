import Head from 'next/head'
import React from 'react'
import Flex from '../components/Flex'
import Text from '../components/Text'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex center sx={{ width: '100vw', height: '75vh' }}>
        <Text fontSize={4} fontWeight="medium">
          Next.js Starter with theme-ui
        </Text>
      </Flex>
    </div>
  )
}

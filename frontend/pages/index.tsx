/** @jsxImportSource theme-ui */

import Head from 'next/head'
import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
// import Header from "../../components/header"
// import Footer from "../../components/footer"
import { Button, Text } from 'theme-ui'
import { appStore, onAppMount } from '../state/app';
import Link from 'next/link'
import Image from 'next/image'


const Index = ({ children }) => {
  const { state, dispatch, update } = useContext(appStore);
  const { near, wallet, account, localKeys, loading } = state;
  
  const signIn = () => {
    wallet.signIn()
  }
  const signOut = () => {
    wallet.signOut()
  }

  const onMount = () => {
    dispatch(onAppMount());
  };
  
  useEffect(onMount, []);

  if (loading) {
      return null;
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ minHeight: "100vh" }}>
        <header
          sx={{
            marginBottom: `1.45rem`,
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1rem 2rem`,
          }}
        >
        <div
          sx={{
            margin: `1rem auto 0rem auto`,
            background: `black`,
            maxWidth: 960,
            padding: `0.02rem 0rem`,
          }}
        />
        <div
          sx={{
            display: "flex",
            flexDirection: ["column", "row"],
            justifyContent: ["space-between"],
            alignItems: ["center"],
            mt: [3, 0],
            flexWrap: "wrap",
          }}
        >
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              mx: 3,
              flexWrap: "wrap",
              flex: "1 1 0%",
            }}
          >
            <>
              {!account?.accountId ? (
                <Button onClick={signIn} bg="primary"> Connect NEAR </Button>
                ) : (
                <Button onClick={signOut} bg="secondary"> Disconnect </Button>
              )}
            </>
          </div>
          <Link href="/" >
          <Text
            sx={{
              flex: "none",
              color: "black",
              textDecoration: "none",
              fontFamily: "IBM Plex Sans, sans-serif",
              fontWeight: 500,
              fontSize: "4rem",
              marginRight: "1rem",
            }}
          >
            Mojio
          </Text>
          </Link>
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              mx: 3,
              flexWrap: "wrap",
              flex: "1 1 0%",
            }}
          >
            {account?.accountId ? (
              <div>
                <p>{account?.accountId}</p>
              </div>
            ) : (
              <div>
                [blank]  
              </div>
            )}
          </div>
        </div>
        </header>
        <div
          sx={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1rem 2rem`,
          }}
        >
          <div
            sx={{
              margin: `1rem auto`,
              background: `black`,
              maxWidth: 960,
              padding: `0.02rem 0rem`,
            }}
          />
          <footer
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
           >
            <div
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a
                sx={{
                  ':hover': {
                    opacity: '0.5',
                  },
                }}
                href="https://twitter.com/Yassine_2024"
               >
                <Image
                  src="/twitter-logo-black.png"
                  alt="Black logo"
                  width={30}
                  height={25}
                />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Index
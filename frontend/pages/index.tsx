// @ts-nocheck
/** @jsxImportSource theme-ui */


import dynamic from 'next/dynamic';
import Head from 'next/head'
import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
// import Header from "../../components/header"
// import Footer from "../../components/footer"
import { Button, Text, Divider, Flex, NavLink, Spinner, Alert, Close} from 'theme-ui';
import { appStore, onAppMount } from '../state/app';
import Link from 'next/link';
import Image from 'next/image';
import { utils } from 'near-api-js';
import { getContract } from '../utils/near-utils';
import { useResponsiveValue, useBreakpointIndex } from '@theme-ui/match-media'



const ALLOWED_EMOJIS = [
  128995, // 🟣
  128993, // 🟡️
  9899, // ⚫️
  9898, // ⚪️
  128308, // 🔴
  128992, // 🟠
  128994, // 🟢
  128309, // 🔵
  128996, // 🟤
  128999, // 🟧
  129000, // 🟨
  11035, // ⬛
  128997, // 🟥
  129001, // 🟩
  128998, // 🟦
  129002, // 🟪
  129003, // 🟫
  11036, // ⬜ 
];

const SCHEMA_SIZE = 5;

const CustomEmojiPicker = ({ onEmojiPick }) => {
  return (
    <div>
      {ALLOWED_EMOJIS.map((emojiCode) => {
        return <Text mx="2" sx={{cursor: "pointer"}} onClick={() => onEmojiPick(emojiCode)}>{String.fromCodePoint(emojiCode)}</Text>;
      })}
    </div>
  );
};

const P5Wrapper = dynamic(import('react-p5-wrapper'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CONTRACT_DESIGN_GAS = utils.format.parseNearAmount('0.00000000020'); // 180 Tgas
const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount('0.00000000020'); // 180 Tgas
const CONTRACT_RANDOM_GAS = utils.format.parseNearAmount('0.00000000020'); // 180 Tgas

const SIZE = 22;

const CANVAS_WIDTH = [300, 400, 500, 600, 700]; // 0-4

const design = (instructions = [], mediaIndex = 0) => (p) => {
  let c = ""
  const designDimension = CANVAS_WIDTH[mediaIndex];

  const canvasStep = [designDimension / 25, designDimension / 25];
  const canvasTextSize = designDimension / 30;

  const canvasStart = [(designDimension - (canvasStep[0] * (SIZE - 0.2))) / 2, (designDimension - (canvasStep[1] * (SIZE - 1.5 ))) / 2];

  p.setup = () => {
    p.createCanvas(designDimension, designDimension);
    p.noLoop();
    if (instructions.length > 0) {
      p.background(0);
      p.textSize(canvasTextSize);
      for(let i = 0; i < SIZE; i++) {
        for(let j = 0; j < SIZE; j++) {
          c = String.fromCodePoint(instructions[j + i * SIZE]);
          
          p.text(c, canvasStart[0] + (j * canvasStep[0]), canvasStart[1] + (i * canvasStep[1]));
        }
      }
    }
  }
}

const Design = ({instructions} : { instructions : Array<number>}) => {
  const mediaIndex = useBreakpointIndex();

  const renderP5 = (instructions : Array<number>) => {
    const sketch = design(instructions, mediaIndex);
    return <P5Wrapper sketch={sketch}/>
  }

  return (
    <div>      
      {renderP5(instructions)}
    </div>
  );
}





const Index = ({ children }) => {
  const [indexLoader, setIndexLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [section, setSection] = useState(2);
  const [seed, setSeed] = useState();
  const [schema, setSchema] = useState(new Set());
  const [designInstructions, setDesignInstructions] = useState();
  const [myDesignInstructions, setMyDesignInstructions] = useState();
  const [randomDesign, setRandomDesign] = useState({ owner: '', instructions: []})
  const { state, dispatch, update } = useContext(appStore);
  const { near, wallet, account, localKeys, loading } = state;
  const contract = getContract(account);

  const moveToSection = (s : number) => {
    setSection(s);
  }

  const pickEmoji = (code : number) => {
    if (schema.has(code)) {
      setSchema((oldSchema) => {
        const newSchema = new Set(oldSchema);
        newSchema.delete(code);
        return newSchema;
      });
    } else if (schema.size < SCHEMA_SIZE) {
      setSchema((oldSchema) => {
        const newSchema = new Set(oldSchema);
        newSchema.add(code);
        return newSchema;
      });
    } else {
      // schema complete
      return;
    }

  }
  
  const signIn = () => {
    wallet.signIn()
  }
  const signOut = () => {
    wallet.signOut()
  }

  const onMount = () => {
    dispatch(onAppMount());
  };

  useEffect(() => {
    if (!account) return;
    retrieveDesign()
  }, [account])
  
  useEffect(onMount, []);

  if (loading) {
      return null;
  }


  async function retrieveDesign() {
    setIndexLoader(true);

    try {
      const result = await contract.viewMyDesign({}, CONTRACT_DESIGN_GAS);
      
      setMyDesignInstructions(result?.instructions);

      setTimeout(() => setIndexLoader(false), 200)
		} catch (e) {
      setIndexLoader(false);
      if (!/not present/.test(e.toString())) {
        setAlertMessage(e.toString());
			}
		}
  }

  async function exploreDesign() {
    setIndexLoader(true);

    try {
      const result = await contract.viewRandomDesign({}, CONTRACT_RANDOM_GAS);
      
      setRandomDesign(result);

      setTimeout(() => setIndexLoader(false), 200)
		} catch (e) {
      setIndexLoader(false);
      setAlertMessage(e.toString());
		}
  }

  async function retrieveData() {
    setIndexLoader(true);

    try {
      const result = await contract.design({ schema : Array.from(schema) }, CONTRACT_DESIGN_GAS);
      
      setDesignInstructions(result?.instructions);
      setSeed(result?.seed);

      setTimeout(() => setIndexLoader(false), 200)
		} catch (e) {
      setIndexLoader(false);
      setAlertMessage(e.toString());
		}
  }

  async function claimDesign() {
    setIndexLoader(true);

    try {
      const result = await contract.claimMyDesign({ seed, schema : Array.from(schema) }, CONTRACT_CLAIM_GAS);
      
      console.log(result);

      retrieveDesign();

      setTimeout(() => {
        setIndexLoader(false);
        setAlertMessage("Design claimed!");
      }, 200)
		} catch (e) {
      setIndexLoader(false);
      setAlertMessage(e.toString());
		}
  }

  async function burnDesign() {
    setIndexLoader(true);

    try {
      const result = await contract.burnMyDesign({}, CONTRACT_CLAIM_GAS);
      
      console.log(result);

      setMyDesignInstructions(null);

      setTimeout(() => {
        setIndexLoader(false);
        setAlertMessage("Design burned!");
      }, 200)
		} catch (e) {
      setIndexLoader(false);
      setAlertMessage(e.toString());
		}
  }

  return (
    <>
      <Head>
        <title>Share</title>
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
          {alertMessage && (
            <Alert>
              <Text>{alertMessage.substring(0, 80)} ...</Text>
              {console.log(alertMessage)}
              <Close ml="auto" mr={-2} sx={{height: "2rem", width: "4rem"}} onClick={() => setAlertMessage('')}/>
            </Alert>
          )}
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
           SHARE 
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
            marginBottom: `1.45rem`,
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0rem 2rem`,
            minHeight: "70vh",
          }}
        >
          <Divider />
          <Flex as="nav" sx={{ justifyContent: "space-around" }}>
            {account?.accountId ? (
              <>
                <NavLink href="#!" p={1} onClick={() => moveToSection(1)}>
                  Create 
                </NavLink>
                <NavLink href="#!" p={1} onClick={() => moveToSection(2)}>
                  View
                </NavLink>
                <NavLink href="#!" p={1} onClick={() => moveToSection(3)}>
                  Explore
                </NavLink>
              </>
            ) :
                <Text>Please connect to use dapp.</Text>
            }
          </Flex>
          <Divider />
          {indexLoader && (
            <div
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Spinner />
            </div>
          )}
          {(section === 1 && account?.accountId && !indexLoader) && (
            <>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                  px: 10,
                  textAlign: "center",
                }}
               >
                 <CustomEmojiPicker onEmojiPick={pickEmoji} />
               </div>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
                >
                <Button sx={{mx: 2, mt: 1}} onClick={retrieveData}>Design</Button>
                <Button sx={{mx: 2, mt: 1}} onClick={claimDesign} bg="secondary">Claim</Button>
              </div>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                  {Array.from(schema).map(emojiCode => {
                    return (<Text mx="1">{String.fromCodePoint(emojiCode)}</Text>);
                  })}
              </div>
              {/* <div sx={{ fontFamily: "monospace" }}><Design instructions={designInstructions} /></div> */}
              {/* <Design /> */}
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Design instructions={designInstructions}/>
              </div>
            </>
          )}
          {(section === 2 && account?.accountId && !indexLoader && myDesignInstructions) && (
            <>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
                >
                <Button sx={{ mt: 1 }} onClick={burnDesign} bg="secondary">Burn</Button>
              </div>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Design instructions={myDesignInstructions}/>
              </div>
            </>
          )}
          {(section === 3 && account?.accountId && !indexLoader) && (
            <>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
                >
                <Button sx={{ mt: 1 }} onClick={exploreDesign}>Explore</Button>
              </div>
              <div
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  mb: 4,
                }}>
                <Design instructions={randomDesign?.instructions}/>
                <Text>{randomDesign?.owner_id}</Text>
              </div>
            </>
          )}
        </div>
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
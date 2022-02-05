import {Box, Heading, Text} from "theme-ui";
import moment from "moment";

type historyProps = {
    type: string
    timestamp: string
    mintBy?: string | null
    burnBy?: string | null
    transferFrom?: string | null
    transferTo?: string | null
    transactionHash: string
}

function HistoryItemLayout({ children, timestamp } : { children: JSX.Element, timestamp: string }){
    return(
        <Box
            sx={{
                mt: 3
            }}
        >
            <Box
                sx={{
                    fontWeight:600,
                    mb:1
                }}
            >
                {children}
            </Box>
            <Box>
                <Text
                    sx={{
                        color:'gray.7',
                        fontSize: 16,
                        fontWeight: 400,
                    }}
                >
                    {moment(Number(timestamp)/1000000).format("dddd, DD MMMM YYYY, HH:MM:SS")}
                </Text>
            </Box>
        </Box>
    )
}

function Burn({ accountId } : { accountId : string }){
    return(
        <Box>
            { accountId } burned this NFT.
        </Box>
    )
}

function Mint({ accountId } : { accountId : string }){
    return(
        <Box>
            {accountId} minted this NFT.
        </Box>
    )
}

function Transfer({ accountId, receiverId } : { accountId : string, receiverId: string }){
    return(
        <Box>
            {accountId} transferred this NFT to {receiverId}
        </Box>
    )
}

export function History ({ history = [] } : {
    history: historyProps[]
}){

    return(
        <Box
            sx={{
                width: ['100%', '100%', 600],
                bg: 'bg',
                py: 3,
            }}
        >
            <Heading
                variant="h3"
                mb={4}
            >
                HISTORY
            </Heading>
            <Box>
                { history.map((historyItem)=>{
                    return(
                        <HistoryItemLayout timestamp={ historyItem.timestamp } >
                            <>
                                {historyItem.type == "burn" && <Burn accountId = {historyItem.burnBy! }/> }
                                {historyItem.type == "mint" && <Mint accountId = {historyItem.mintBy! }/> }
                                {historyItem.type == "transfer" && <Transfer accountId = {historyItem.transferFrom! } receiverId={ historyItem.transferTo! } /> }
                            </>
                        </HistoryItemLayout>
                    )
                })}

            </Box>
        </Box>
    )
}
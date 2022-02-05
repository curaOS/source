import {Box, Heading, Text, Link} from "theme-ui";
import moment from "moment";


type historyProps = {
    type: string
    timestamp: string
    mintBy?: string | null
    burnBy?: string | null
    bidBy?: string | null
    transferFrom?: string | null
    transferTo?: string | null
    transactionHash: string
}

function HistoryItemLayout(
    {
        children,
        timestamp,
        transactionHash
    }
        :
    {
        children: JSX.Element,
        timestamp: string,
        transactionHash: string
    }
) {
    return(
        <Box
            sx={{
                mt: 3
            }}
        >
            <Box
                sx={{
                    fontWeight:500,
                    mb:1
                }}
            >
                {children}
            </Box>
            <Box>
                <Link
                    sx={{
                        color:'gray.7',
                        fontSize: 16,
                        fontWeight: 400,
                        '&:hover':{
                            textDecoration: 'unset',
                            color: 'gray.8'
                        }
                    }}
                    href={`https://explorer.near.org/transactions/${transactionHash}`} target={"_blank"}>
                    <Text>
                        {moment(Number(timestamp)/1000000).format("dddd, DD MMMM YYYY, HH:MM:SS")}
                    </Text>
                </Link>
            </Box>
        </Box>
    )
}

function Burn({ accountId } : { accountId : string }){
    return(
        <Box>
            <Link href={`https://explorer.near.org/accounts/${accountId}`} target={"_blank"}>{ accountId }</Link> burned this NFT.
        </Box>
    )
}

function Mint({ accountId } : { accountId : string }){
    return(
        <Box>
            <Link href={`https://explorer.near.org/accounts/${accountId}`} target={"_blank"}>{accountId}</Link> minted this NFT.
        </Box>
    )
}

function Transfer({ accountId, receiverId } : { accountId : string, receiverId: string }){
    return(
        <Box>
            <Link href={`https://explorer.near.org/accounts/${accountId}`} target={"_blank"}>
                {accountId}
            </Link> transferred this NFT to{" "}
            <Link href={`https://explorer.near.org/accounts/${receiverId}`} target={"_blank"}>
                { receiverId}
            </Link>
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
                        <HistoryItemLayout
                            timestamp={ historyItem.timestamp }
                            transactionHash={ historyItem.transactionHash }
                        >
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
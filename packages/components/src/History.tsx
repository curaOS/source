import {Box, Heading, Text, Link} from "theme-ui";
import moment from "moment";


type historyProps = {
    type: string
    timestamp: string
    amount: number | null
    sender?: { id : string | null } | null
    recipient?: { id : string | null } | null
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
                        fontSize: 15,
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

function Bid({ accountId } : { accountId : string }){
    return(
        <Box>
            <Link href={`https://explorer.near.org/accounts/${accountId}`} target={"_blank"}>{accountId}</Link> placed a bid.
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
                mb={3}
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
                                {historyItem.type == "burn" && <Burn accountId = {historyItem.sender!.id! }/> }
                                {historyItem.type == "mint" && <Mint accountId = {historyItem.sender!.id! }/> }
                                {historyItem.type == "set_bid" && <Bid accountId = {historyItem.sender!.id! }/> }
                                {historyItem.type == "transfer" && <Transfer accountId = {historyItem.sender!.id! } receiverId={ historyItem.recipient!.id! } /> }
                            </>
                        </HistoryItemLayout>
                    )
                })}

            </Box>
        </Box>
    )
}
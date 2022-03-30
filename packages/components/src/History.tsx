import {Box, Heading, Text, Link} from "theme-ui";
import moment from "moment";


type historyProps = {
    type: string
    timestamp: string
    amount: number | null
    sender?: { id : string | null } | null
    recipient?: { id : string | null } | null
    block_hash_58: string
}

function HistoryItemLayout(
    {
        children,
        timestamp,
        blockHash58
    }
        :
    {
        children: JSX.Element,
        timestamp: string,
        blockHash58: string
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
                    href={`https://explorer.testnet.near.org/blocks/${blockHash58}`} target={"_blank"}>
                    <Text>
                        {moment(Number(timestamp)/1000000).format("dddd, DD MMMM YYYY, HH:mm:ss")}
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

function BidRemove({ accountId } : { accountId : string }){
    return(
        <Box>
            <Link href={`https://explorer.near.org/accounts/${accountId}`} target={"_blank"}>{accountId}</Link> removed their bid.
        </Box>
    )
}

function BidAccept({ accountId, receiverId } : { accountId : string, receiverId: string }){
    return(
        <Box>
            <Link href={`https://explorer.near.org/accounts/${accountId}`} target={"_blank"}>
                {accountId}
            </Link> accepted{" "}
            <Link href={`https://explorer.near.org/accounts/${receiverId}`} target={"_blank"}>
                { receiverId }
            </Link>
            's bid.
        </Box>
    )
}

function BidUpdate({ accountId } : { accountId : string }){
    return(
        <Box>
            <Link href={`https://explorer.near.org/accounts/${accountId}`} target={"_blank"}>{accountId}</Link> updated their bid.
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
                            blockHash58={ historyItem.block_hash_58 }
                        >
                            <>
                                {historyItem.type == "burn" && <Burn accountId = {historyItem.sender!.id! }/> }
                                {historyItem.type == "mint" && <Mint accountId = {historyItem.sender!.id! }/> }
                                {historyItem.type == "set_bid" && <Bid accountId = {historyItem.sender!.id! }/> }
                                {historyItem.type == "remove_bid" && <BidRemove accountId = {historyItem.sender!.id! }/> }
                                {historyItem.type == "accept_bid" && <BidAccept accountId = {historyItem.sender!.id! } receiverId={ historyItem.recipient!.id! }/> }
                                {historyItem.type == "update_bid" && <BidUpdate accountId = {historyItem.sender!.id! }/> }
                                {historyItem.type == "transfer" && <Transfer accountId = {historyItem.sender!.id! } receiverId={ historyItem.recipient!.id! } /> }
                            </>
                        </HistoryItemLayout>
                    )
                })}

            </Box>
        </Box>
    )
}
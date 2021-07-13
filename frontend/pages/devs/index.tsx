// @ts-nocheck
/** @jsxImportSource theme-ui */

import { providers } from 'near-api-js'
import { useEffect, useState, useMemo } from 'react'
import { useTable, useFilters } from 'react-table'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Text, Input, Button, Divider } from 'theme-ui'
import { reject, equals, omit } from 'ramda'

const ReactJson = dynamic(import('react-json-view'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

const provider = new providers.JsonRpcProvider('https://rpc.testnet.near.org')

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

const YSN_ADDRESS = process.env.YSN_ADDRESS
const SHARE_ADDRESS = process.env.SHARE_ADDRESS
const SHARE_MARKET_ADDRESS = process.env.SHARE_MARKET_ADDRESS

function transcode(data, source = 'base64', target = 'utf8') {
    const ENCODINGS = [
        'ascii', // For 7 bit ASCII data only. This encoding method is very fast, and will strip the high bit if set.
        'base64', // An efficient (power of 2) and safe (over the wire) encoding format used to move data around the interwebs
        'binary', // A way of encoding raw binary data into strings by using only the first 8 bits of each character.
        'ucs2', // 2-bytes, little endian encoded Unicode characters. It can encode only BMP(Basic Multilingual Plane, U+0000 - U+FFFF).
        'utf8', // Multi byte encoded Unicode characters. Many web pages and other document formats use UTF-8.
    ]

    if (!ENCODINGS.includes(source) || !ENCODINGS.includes(target)) {
        throw new Error(`Unsupported transcoding: ${source} --> ${target}`)
    }

    return Buffer.from(data, source).toString(target)
}

function format(text) {
    try {
        return JSON.stringify(JSON.parse(text), null, 2)
    } catch (error) {}
}

const Devs = ({}) => {
    const [contracts, setContracts] = useState([
        YSN_ADDRESS,
        SHARE_ADDRESS,
        SHARE_MARKET_ADDRESS,
    ])

    const [contractsState, setContractsState] = useState({})

    const [contractInput, setContractInput] = useState('')

    const addContract = () => {
        setContracts((contracts) => [contractInput, ...contracts])
    }
    const removeContract = (contract) => {
        setContractsState((contractsState) => {
            return omit([contract], contractsState)
        })
        setContracts((contracts) => {
            return reject(equals(contract), contracts)
        })
    }

    const columns = (name) => [
        {
            id: name,
            Header: (
                <div>
                    <Button mx="2" onClick={() => removeContract(name)}>
                        Remove
                    </Button>
                    {name}
                </div>
            ),
            Footer: 'Name',
            columns: [
                {
                    Header: 'Key',
                    accessor: 'key', // accessor is the "key" in the data
                },
                {
                    Header: 'Value',
                    accessor: 'value',
                    Cell: (props) => {
                        try {
                            const jsonParse = JSON.parse(props.value)
                            // console.log(jsonParse)
                            return typeof jsonParse === 'object' ? (
                                <ReactJson
                                    src={jsonParse}
                                    collapseStringsAfterLength={30}
                                    collapsed
                                />
                            ) : (
                                jsonParse
                            )
                        } catch (e) {
                            return props.value || null
                        }
                    },
                },
            ],
        },
    ]

    function getState() {
        contracts.forEach(async (contract) => {
            let rawResult = await provider.query({
                request_type: 'view_state',
                account_id: contract,
                finality: 'final',
                prefix_base64: '',
            })

            let data = []

            for (const entry of rawResult.values) {
                let row = {}
                row['key'] = transcode(entry.key)
                row['value'] = format(transcode(entry.value))

                data.push(row)
            }

            setContractsState((prevState) => ({
                [contract]: data,
                ...prevState,
            }))
        })
    }

    useEffect(getState, [contracts])

    return (
        <div>
            <div
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: [3, 0],
                }}
            >
                <Link href="/">
                    <Text
                        sx={{
                            flex: 'none',
                            color: 'black',
                            textDecoration: 'none',
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontWeight: 600,
                            fontSize: '4rem',
                            marginRight: '1rem',
                            textAlign: 'center',
                        }}
                    >
                        DEVS
                    </Text>
                </Link>
                <div sx={{ display: 'flex' }}>
                    <Button mx="2" onClick={addContract}>
                        Add
                    </Button>
                    <Input
                        name="contract"
                        defaultValue=""
                        sx={{ width: 300 }}
                        placeholder="Contract"
                        onChange={(e) => setContractInput(e.target.value)}
                    />
                </div>
            </div>

            {Object.entries(contractsState).map(([key, value]) => (
                <div sx={{ textAlign: 'center' }}>
                    <Divider />
                    <Table columns={columns(key)} data={value} />
                </div>
            ))}

            <>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 3,
                    }}
                ></div>
            </>
        </div>
    )
}

const Table = ({ columns, data }) => {
    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data, defaultColumn }, useFilters)

    return (
        <table {...getTableProps()} sx={{ px: 5, width: '100%' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                sx={{
                                    border: '2px solid black',
                                }}
                            >
                                {column.render('Header')}
                                <div>
                                    {column.canFilter
                                        ? column.render('Filter')
                                        : null}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        sx={{ border: '1px solid black' }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Devs

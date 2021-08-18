import Near from '@containers/near'

export default function NearProvider({ children }) {
    return <Near.Provider>{children}</Near.Provider>
}

export { Near }

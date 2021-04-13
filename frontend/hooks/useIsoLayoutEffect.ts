import { useEffect, useLayoutEffect } from 'react'

const useIsoLayoutEffect = process.browser ? useLayoutEffect : useEffect

export default useIsoLayoutEffect

declare module '@theme-ui/match-media' {
  export function useResponsiveValue<T>(
    values: T[],
    opts?: { defaultIndex?: number }
  ): T
  export function useBreakpointIndex(opts?: { defaultIndex?: number }): number
}

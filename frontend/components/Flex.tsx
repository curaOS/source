/* eslint-disable no-restricted-imports */
import React from 'react'
import { Flex as ThemedFlex, FlexProps as ThemedFlexProps } from 'theme-ui'

type FlexDirection = 'row' | 'column'
type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'initial'
  | 'inherit'
type FlexAlign =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'
  | 'initial'
  | 'inherit'
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse' | 'initial' | 'inherit'
export interface FlexProps extends ThemedFlexProps {
  direction?: FlexDirection | FlexDirection[]
  justify?: FlexJustify | FlexJustify[]
  align?: FlexAlign | FlexAlign[]
  wrap?: FlexWrap | FlexWrap[]
  center?: boolean
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    center = false,
    direction = `row`,
    justify = center ? `center` : `flex-start`,
    align = center ? `center` : `flex-start`,
    wrap = `wrap`,
    ...props
  },
  ref
) {
  return (
    <ThemedFlex
      {...props}
      ref={ref}
      sx={{
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        ...(props.sx ?? {}),
      }}
    />
  )
})

export default Flex

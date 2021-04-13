/* eslint-disable no-restricted-imports */
import React from 'react'
import { Text as ThemedText, TextProps as ThemedTextProps } from 'theme-ui'

type TextAlign =
  | 'start'
  | 'left'
  | 'center'
  | 'right'
  | 'end'
  | 'justify'
  | 'match-parent'

type FontWeight = 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

export interface TextProps extends ThemedTextProps {
  fontSize?: number | number[] | string | string[]
  fontWeight?: FontWeight | FontWeight[]
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'heading'
    | 'body'
    | 'caps'
  align?: TextAlign | TextAlign[]
  width?: string | number | string[] | number[]
}

const Text = React.forwardRef<HTMLDivElement, TextProps>(function Text(
  { fontWeight, fontSize, align, ...props },
  ref
) {
  return (
    <ThemedText
      {...props}
      ref={ref}
      sx={{
        fontSize,
        fontWeight,
        textAlign: align,
        ...(props.sx ?? {}),
      }}
    />
  )
})

export default Text

import { motion, MotionProps } from 'framer-motion'
import { Box, BoxProps, Grid, GridProps, Button, ButtonProps } from 'theme-ui'
import Text, { TextProps } from './Text'
import Flex, { FlexProps } from './Flex'

const MotionBox = motion(Box)
export type MotionBoxProps = BoxProps & MotionProps

const MotionFlex = motion(Flex)
export type MotionFlexProps = FlexProps & MotionProps

const MotionGrid = motion(Grid)
export type MotionGridProps = GridProps & MotionProps

const MotionButton = motion(Button)
export type MotionButtonProps = ButtonProps & MotionProps

const MotionText = motion(Text)
export type MotionTextProps = TextProps & MotionProps

export { MotionBox, MotionGrid, MotionFlex, MotionText, MotionButton }

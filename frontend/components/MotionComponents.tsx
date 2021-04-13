import { motion, MotionProps } from 'framer-motion'
import { Box, BoxProps, Grid, GridProps, Button, ButtonProps } from 'theme-ui'
import Text, { TextProps } from './Text'
import Flex, { FlexProps } from './Flex'

const MotionBox = motion.custom(Box)
export type MotionBoxProps = BoxProps & MotionProps

const MotionFlex = motion.custom(Flex)
export type MotionFlexProps = FlexProps & MotionProps

const MotionGrid = motion.custom(Grid)
export type MotionGridProps = GridProps & MotionProps

const MotionButton = motion.custom(Button)
export type MotionButtonProps = ButtonProps & MotionProps

const MotionText = motion.custom(Text)
export type MotionTextProps = TextProps & MotionProps

export { MotionBox, MotionGrid, MotionFlex, MotionText, MotionButton }

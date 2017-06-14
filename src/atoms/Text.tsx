import Box, { BoxProps, withStyle } from './Box'
import { Color, Theme } from '../theme'
import { withTheme, ThemeContext } from './Theme'

export type TextProps = BoxProps & {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  italic?: boolean, 
  color?: Color,
  decoration?: 'none' | 'underline' | 'line-through',
  fontFamily?: string,
  lineHeight?: number,
  size?: number,
  children?: string
}

/**
 * A simple implementation of the mixin from 
 * http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm/
 */
const computeFontSizeAndLineHeight = ({ typography }: Theme, size: number) => {
  const fontSize = typography.fontSize(size)
  const lines = Math.ceil(fontSize / typography.lineHeight)
  const lineHeight = (lines * typography.lineHeight) + 'px'
  return { fontSize, lineHeight }
}

/**
 * The actual text building block, I should point out any changes here will
 * DRAMATICALLY change the entire workflow of the application, enough said.
 */
const Text: React.SFC<TextProps> = (props, { theme }: ThemeContext) => {
  const {
    // Other variables.
    align,  
    bold,
    color = theme.text.color, 
    decoration,
    fontFamily = theme.text.fontFamily,
    italic, 
    lineHeight,
    size = 0, // Will default to the standrad font size
    children,
    css = () => ({}),
    ...restProps
  } = props
  
  return (
    <Box as="span" {...restProps} css={withStyle(css, (theme) => ({
        color,
        fontFamily,
        ...computeFontSizeAndLineHeight(theme, size),
        ...(align ? { textAlign: align } : null), 
        ...(bold ? { fontWeight: 'bold' } : null),
        ...(decoration ? { textDecoration: decoration } : null),
        ...(italic ? { fontStyle: 'italic' } : null),
        ...(lineHeight ? { lineHeight } : null),
      }))}>
      {children} 
    </Box>
  )
}
export default withTheme(Text)

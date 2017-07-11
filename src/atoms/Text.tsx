import { createBox } from './Box'
import { withStyle } from './style'

export type TextProps = {
    align?: 'left' | 'right' | 'center' | 'justify',
    bold?: boolean,
    italic?: boolean, 
    color?: string,
    decoration?: 'none' | 'underline' | 'line-through',
    fontFamily?: string,
    lineHeight?: number,
    size?: number,
}

type Props = TextProps & React.HTMLProps<HTMLSpanElement>

export default createBox<Props>('span', ({
    align,
    bold,
    color,
    decoration,
    fontFamily,
    italic,
    lineHeight,
    size = 0,
    css,
    ...restProps,
}) => ({
    css: withStyle(css, theme => ({
            color: color || theme.text.color,
            fontFamily,
            ...(align ? { textAlign: align } : null), 
            ...(bold ? { fontWeight: 'bold' } : null),
            ...(decoration ? { textDecoration: decoration } : null),
            ...(italic ? { fontStyle: 'italic' } : null),
            ...(lineHeight ? { lineHeight } : null),
            fontSize: size
        })),
    emulateReactNative: false,
    ...restProps
}))

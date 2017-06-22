import * as PropTypes from 'prop-types'
import { Theme, Color, Colors, StyleObject, MaybeRhythm } from '../theme'
import { withTheme, ThemeContext } from './Theme'

// The special type of a style element which can access the theme.
export type Style = (t: Theme) => StyleObject

// Allows two or more style objects to join together as follows.
export const joinStyles = (...styles: Style[]) => (theme: Theme) => 
    styles.filter((s) => s).reduce((total: StyleObject, style: Style) => ({
        ...total,
        ...(typeof style == 'object' ? style : style(theme))
    }), {})

// A conveniance function to allow style inheratance, this was made
// more complicated by passing around the theme component.
export const withStyle = (...styles: (Style | Style[])[]) => (theme: Theme) =>
    styles.reduce((total: StyleObject, style: (Style | Style[])) => ({
        ...total,
        ...((Array.isArray(style) ? joinStyles(...style) : style)(theme))
    }), {})

export type BoxProps = {
    // What underlying html or react element to render the box as.
    as?: string // | React.ComponentClass<Object> // -- Some difficulty here somehow.
    // A style object to pass to glamour.
    css?: Style | Array<Style>,
    // Should it emulate react native styling with flexbox?
    emulateReactNative?: boolean,
 
    margin?: MaybeRhythm,
    marginHorizontal?: MaybeRhythm,
    marginVertical?: MaybeRhythm,
    marginBottom?: MaybeRhythm,
    marginLeft?: MaybeRhythm,
    marginRight?: MaybeRhythm,
    marginTop?: MaybeRhythm,

    padding?: MaybeRhythm,
    paddingHorizontal?: MaybeRhythm,
    paddingVertical?: MaybeRhythm,
    paddingBottom?: MaybeRhythm,
    paddingLeft?: MaybeRhythm,
    paddingRight?: MaybeRhythm,
    paddingTop?: MaybeRhythm,
    
    bottom?: MaybeRhythm,
    height?: MaybeRhythm,
    left?: MaybeRhythm,
    maxHeight?: MaybeRhythm,
    maxWidth?: MaybeRhythm,
    minHeight?: MaybeRhythm,
    minWidth?: MaybeRhythm,
    right?: MaybeRhythm,
    top?: MaybeRhythm,
    width?: MaybeRhythm,

    // Flexbox. Only what's compatible with React Native.
    // github.com/facebook/react-native/blob/master/Libraries/StyleSheet/LayoutPropTypes.js
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
    alignSelf?:
        | 'auto'
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'stretch'
        | 'baseline',
    flex?: number,
    flexBasis?: number | string,
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
    flexGrow?: number,
    flexShrink?: number,
    flexWrap?: 'wrap' | 'nowrap',
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around',

    backgroundColor?: Color,
    opacity?: number,
    overflow?: 'visible' | 'hidden' | 'scroll',
    position?: 'absolute' | 'relative',
    zIndex?: number,

    borderStyle?: 'solid' | 'dotted' | 'dashed',

    borderWidth?: number,
    borderBottomWidth?: number,
    borderLeftWidth?: number,
    borderRightWidth?: number,
    borderTopWidth?: number,

    borderRadius?: number,
    borderBottomLeftRadius?: number,
    borderBottomRightRadius?: number,
    borderTopLeftRadius?: number,
    borderTopRightRadius?: number,

    color?: string,
    borderColor?: Color,
    borderBottomColor?: Color,
    borderLeftColor?: Color,
    borderRightColor?: Color,
    borderTopColor?: Color,
}

type BoxContext = ThemeContext

/**
 * Allows the altering of values, such as colors or rythm into consumable 
 * values.
 */
const reduce = (props: BoxProps, getValue: (v: MaybeRhythm) => MaybeRhythm) =>
    Object.keys(props).reduce((style: BoxProps, prop: (keyof BoxProps)) => {
        const v  = props[prop]
        if ( v === undefined ) return style
        if ( typeof v !== 'string' && typeof v !== 'number' ) return style
        return {
            ...style, 
            [prop]: getValue(v)
        }
    }, {})

const reduceRhythm = (rhythm: (a: number) => MaybeRhythm, props: BoxProps) =>
    reduce(props, (value) => (typeof value == 'number' ? rhythm(value) : value))
const reduceColors = (colors: Colors, props: BoxProps) => reduce(props, (value: Color) => colors[value])
const reduceValue = (props: BoxProps) => reduce(props, (value) => value)

/**
 * Emulates react native for the browser by applying similair flexbox properties.
 */
const emulateReactNativeInBrowser = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
}

/**
 * Transforms values from the style element that are vertical rhythm or colors into a 
 */
const reduceStyle = (theme: Theme, style: StyleObject) =>
    Object.keys(style).reduce((total: Object, key: string) => {
        const value: any = <any> style[key]
        if ( key.indexOf('margin') === 0
             || key.indexOf('padding') === 0
             || key === 'bottom'
             || key === 'height'
             || key === 'left'
             || key === 'maxWidth'
             || key === 'minHeight'
             || key === 'minWidth'
             || key === 'right'
             || key === 'top'
             || key === 'width' ) {
            return {
                ...total,
                [key]: (typeof value === 'number' ? theme.typography.rhythm(value) : value) 
            }
        }
        
        if ( key.indexOf('margin') === 0
             || key.indexOf('padding') === 0 
             || key === 'color'
             || key === 'borderColor'
             || key === 'borderBottomColor'
             || key === 'borderLeftColor'
             || key === 'borderRightColor'
             || key === 'borderTopColor' ) {
            return {
                ...total,
                [key]: theme.colors[value] || value
            }
        }
        return { ...total, [key]: value }
    }, {})

const Box: React.SFC<BoxProps & React.HTMLProps<HTMLDivElement>> = (props, { renderRule, theme }: BoxContext) => {
    const {
        as,
        css,
        emulateReactNative = true,

        margin,
        marginHorizontal,
        marginVertical,
        marginBottom = marginVertical,
        marginLeft = marginHorizontal,
        marginRight = marginHorizontal,
        marginTop = marginVertical,

        padding,
        paddingHorizontal,
        paddingVertical,
        paddingBottom = paddingVertical,
        paddingLeft = paddingHorizontal,
        paddingRight = paddingHorizontal,
        paddingTop = paddingVertical,

        bottom,
        height,
        left,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        right,
        top,
        width,

        alignItems,
        alignSelf,
        flex,
        flexBasis,
        flexDirection,
        flexGrow,
        flexShrink,
        flexWrap,
        justifyContent,
        backgroundColor,
        opacity,
        overflow,
        position,
        zIndex,
        borderStyle,

        borderWidth,
        borderBottomWidth,
        borderLeftWidth,
        borderRightWidth,
        borderTopWidth,

        borderRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderTopLeftRadius, 
        borderTopRightRadius,

        color,
        borderColor,
        borderBottomColor,
        borderLeftColor,
        borderRightColor,
        borderTopColor,

        ...restProps
    } = props

    const boxStyle = {
        ...(emulateReactNative ? emulateReactNativeInBrowser : {}),
        ...(reduceRhythm(theme.typography.rhythm, { 
            marginBottom,
            marginLeft,
            marginRight,
            marginTop,

            paddingBottom,
            paddingLeft,
            paddingRight,
            paddingTop,

            bottom,
            height,
            left,
            maxHeight,
            maxWidth,
            minHeight,
            minWidth,
            right,
            top,
            width,
        })),
        ...reduceValue({
            alignItems,
            alignSelf,
            flexBasis,
            flexDirection,
            flexGrow,
            flexShrink,
            flexWrap,
            justifyContent,
            opacity,
            overflow,
            position,
            zIndex,
            borderStyle,
            borderBottomWidth,
            borderLeftWidth,
            borderRightWidth,
            borderTopWidth,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            borderTopLeftRadius,
            borderTopRightRadius,
            flex,
        }),
        ...(reduceColors(theme.colors, {
            backgroundColor,
            borderBottomColor,
            borderLeftColor,
            borderRightColor,
            borderTopColor,
            borderColor, 
            color
        })),
        ...(reduceStyle(theme, (Array.isArray(css) ? joinStyles(...css) : joinStyles(css))(theme)))
    }
    const className = renderRule(boxStyle)
    return React.createElement(as || 'div', { ...restProps, className })
}

Box.contextTypes = {
    theme: PropTypes.object,
    renderRule: PropTypes.func
}

export default Box

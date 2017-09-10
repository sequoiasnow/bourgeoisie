import { hookForRules
         , customReturnHook
         , createPreprocessorTheme
         , withStyle
       } from '../style/lib'
import { Style, MaybeRhythm } from '../style/types'
import { withRenderer, RenderProps } from '../style/lib'
import { Theme } from '../theme/types' 


export interface BoxProps {
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

    backgroundColor?: string,
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
    borderColor?: string,
    borderBottomColor?: string,
    borderLeftColor?: string,
    borderRightColor?: string,
    borderTopColor?: string,
}



// Emulates react native for the browser by applying similair flexbox properties.
const emulateReactNativeInBrowser = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
}

const rhythmHook = (theme: Theme) => hookForRules([
    'margin',
    'marginLeft',
    'marginRight', 
    'marginTop',
    'marginBottom', 
    'padding',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
], (val) => (typeof (val == 'number') ?
             theme.typography.rhythm(val as number) : val))

const colorHook = (theme: Theme) => hookForRules([
    'color',
    'borderColor',
    'borderBottomColor',
    'borderTopColor',
    'borderLeftColor',
    'borderRightColor',
    'backgroundColor',
    'textDecorationColor',
    'outlineColor', 
], (val) => {
    const c = (typeof val == 'string') ? (theme.colors[val] || val) : val
    return c
})

const computeFontSizeAndLineHeightHook = ({ typography }: Theme) =>
    customReturnHook('fontSize', (size) => {
        let numSize = typeof size == 'number' ? size : parseInt(size, 10)
        let fontSize = typography.fontSize(numSize)
        let lines = Math.ceil(fontSize / typography.lineHeight)
        let lineHeight = (lines * typography.lineHeight) + 'px' 
        return { fontSize, lineHeight }
    })


// This will run only on a styleobject! eventually it would make sense for
// this to apply the theme as well, but not right now.
const preprocessor = createPreprocessorTheme(
    rhythmHook,
    computeFontSizeAndLineHeightHook,
    colorHook
)


export function createBox<Props>(
    as: string | React.SFC<Props>,
    changeProps?: (props: Props & BoxProps & RenderProps) => Props & BoxProps & RenderProps   
): React.SFC<Props & BoxProps> {
    return withRenderer<Props & BoxProps>((props) => {
        let newProps = changeProps ? changeProps(props) : props
        const {
            theme,
            renderer,
            mixins,
            addGlobalStyle,
            
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

            // TS Ignore, this is an error I can't seem to fix..
            ...restProps
        } = newProps as BoxProps & RenderProps // This is only to bypass ts warnings.

        const propStyles = {
            ...(emulateReactNative ? emulateReactNativeInBrowser : {}),
            
            margin,
            marginBottom,
            marginLeft,
            marginRight,
            marginTop,

            padding,
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
        }

        const styles = withStyle(css, propStyles)(theme)
        const className = renderer(preprocessor(theme)(styles))
        
        return React.createElement(<any> as, { ...restProps, className })
    }) 
}

export default createBox<React.HTMLProps<HTMLDivElement>>('div')

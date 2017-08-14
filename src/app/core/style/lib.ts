import { Theme } from '../theme/types'
import { MaybeRhythm
         , StyleObject
         , StyleWithTheme
         , Style
         , StyleProp } from './types'
import { connect } from 'app/redux'
import { StyleState, getStyleState } from './ducks'
import { ThemeProps } from '../theme/lib/withTheme'
import { getTheme } from '../theme/ducks'

/// A utility to take multiple styles an join them together. Also accepts null
/// values which are removed 
export const joinStyles: (...styles: Style[]) => StyleWithTheme
                 = (...styles) => (theme) => 
                 styles.filter((s) => s).reduce((total: StyleObject, style: Style) => ({
                     ...total,
                     ...(Array.isArray(style) ? joinStyles(style)(theme)
                         : (typeof style == 'object' ? style : style(theme))) 
                 }), {}) as StyleObject

/// A conveniance function that makes use of hte joinStyles utility to allow
/// easy extending of css styles...
export const withStyle: (...styles: (StyleProp | Style)[]) => StyleWithTheme
    = (...styles) => joinStyles(...styles.map((s) => Array.isArray(s) ? joinStyles(...s) : s))

/// A simple hook for a style object.
type Hook = (rule: string, value: MaybeRhythm) => StyleObject | null

/// A conveniance function to reduce a series of style values to a value.
const reduce = (props: StyleObject, hook: Hook) =>
    Object.keys(props).reduce((style, prop) => {
        let v = props[prop] 
        if ( typeof v !== 'string' && typeof v !== 'number' ) return style
        return {
            ...style,
            [prop]: hook(prop, v)
        }
    }, {})

/// A hook is a simple tranformation of a style, these are applied to groups for
/// simplicity.
export function hookForRules(rules: string[], func: (val: MaybeRhythm) => MaybeRhythm): Hook {
    return (rule, value) => {
        if (rules.indexOf(rule) != -1)  {
            return { [rule]: func(value) }
        }
        return null
    }
}

/// A hook for a rule that can output multiple values, its rather confusing.
export function customReturnHook(rule: string, func: (val: MaybeRhythm) => StyleObject): Hook {
    return (r, value) => {
        if ( r == rule ) {
            return func(value)
        }
        return null
    }
}

/// Takes an array of hooks and convert's them to a preprocessor, this function
/// is NOT very fast and dramatically needs improvement, it applies multiple functions
/// to each rule each time performing an index of lookup. Its basiclly an O3 lookup.
export function createPreprocessor(...hooks: Hook[]): (styles: StyleObject) => StyleObject {
    return (styles: StyleObject) => Object.keys(styles).reduce((styleAccumulator, rule) => {
        let value = styles[rule]

        if ( typeof value == 'undefined' )
            return styleAccumulator

        // Check that this is not a nested style object.
        if ( typeof value == 'number' || typeof value == 'string' ) {
            let newRules = hooks.map(hook => hook(rule, <MaybeRhythm> value))
                .filter(h => h).reduce((total, hRuleVal) => ({
                    ...total,
                    ...hRuleVal
                }), { [rule]: value })
            return {
                ...styleAccumulator,
                ...newRules 
            }
        }
        return {
            ...styleAccumulator,
            [rule]: value
        }
    }, {})
}

/// Same as above but works with curried functions.
type ThemeHook = (theme: Theme) => Hook
export function createPreprocessorTheme(...hooks: ThemeHook[]) {
    return (theme: Theme) => createPreprocessor(...hooks.map(hook => hook(theme))) 
}

export type RenderProps = StyleState & ThemeProps

// Access the renderer
export function withRenderer<Props>(Comp: React.SFC<Props & RenderProps>) {
    return connect<Props, RenderProps, {}>((state) => ({
        ...getStyleState(state),
        theme: getTheme(state)
    }))(Comp)
}

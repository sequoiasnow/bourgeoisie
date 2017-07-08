import { Theme } from '../types/theme'

/// Something is either a value or a multiplier of typography.
export type MaybeRhythm = number | string

/// A StyleObject contains a set of style rules already computed
/// with a theme. The only computations dome on a style object are
/// to alter typography settigns, such as fontSize.
/// Style Objects can be nested.
export interface StyleObject {
    [ruleName: string]: MaybeRhythm | StyleObject
}


/// The type of a style passed to the style property of a box or other
/// component.
export type StyleWithTheme = (theme: Theme) => StyleObject
export type Style = StyleObject | StyleWithTheme | null

/// The actual type of styles allowed to be passed as a property.
export type StyleProp = Style | Style[]

/// A utility to take multiple styles an join them together. Also accepts null
/// values which are removed 
export const joinStyles: (...styles: Style[]) => StyleWithTheme
    = (...styles: Style[]) => (theme: Theme) => 
    styles.filter((s) => s).reduce((total: StyleObject, style: Style) => ({
        ...total,
        ...(Array.isArray(style) ? joinStyles(style)(theme)
            : (typeof style == 'object' ? style : style(theme))) 
    }), {}) as StyleObject

/// A simple hook for a style object.
type Hook = (rule: string, value: MaybeRhythm) => MaybeRhythm

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
        if (rules.indexOf(rule) != -1)
            return func(value)
        return value
    }
}

/// Takes an array of hooks and convert's them to a preprocessor, this function
/// is NOT very fast and dramatically needs improvement, it applies multiple functions
/// to each rule each time performing an index of lookup.
export function createPreprocessor(...hooks: Hook[]) {
    return (styles: StyleObject) => reduce(styles, (rule, value) => {
        let val = value
        hooks.forEach(hook => val = hook(rule, value))
        return val
    }) 
}

/// Same as above but works with curried functions.
type ThemeHook = (theme: Theme) => Hook
export function createPreprocessorTheme(...hooks: ThemeHook[]) {
    return (theme: Theme) => createPreprocessor(...hooks.map(hook => hook(theme))) 
}

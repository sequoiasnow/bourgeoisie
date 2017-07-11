import { Theme } from './theme'

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


/// A renderer takes a set of styles and turns them into a className,
export type Renderer = (styles: StyleObject) => string

/// The type of a simple mixin that can be applied to styles.
export type Mixin = (...args: any[]) => StyleObject

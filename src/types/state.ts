import { Theme } from './theme'
import { Renderer, Mixin } from './style'

/// This is the shape of the entire redux store, currently it is
/// coallecsed into one giant file, but it SHOULD be spread out
/// amoung multiple to allow a smother interaction between
/// components and stores and such.
export interface State {
    theme: {
        current: Theme,
        mixins: { [name: string]: Mixin }, 
        renderRule: Renderer
    } 
}

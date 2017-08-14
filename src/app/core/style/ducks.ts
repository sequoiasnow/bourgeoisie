// The logico of the redux part of the style information, and how
// it works with the theme component.
import initialState from './index'
import { StyleObject, Renderer, Style } from './types'
import { ReduxStore } from '../../redux/ducks' 

/// The shape of the StyleState in the redux store.
export interface StyleState {
    addGlobalStyle: (tag: string, rules: StyleObject) => void,
    renderer: Renderer,
    mixins: { [name: string]: () => Style }
}

// Accessors
export function getRenderer(state: ReduxStore) {
    return state.core.style.renderer
}

export function getMixins(state: ReduxStore) {
    return state.core.style.mixins
}

export function getAddGlobalStyle(state: ReduxStore) {
    return state.core.style.addGlobalStyle 
}

export function getStyleState(state: ReduxStore) {
    return state.core.style
}

// Root Reducer
export default function(state = initialState) {
    return state 
}

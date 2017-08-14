import { Theme } from './types'
import themes from './themes'
import { ReduxStore } from 'app/redux/ducks'

const CHANGE_THEME = 'app/core/theme/CHANGE_THEME'

interface ThemeAction {
    type: typeof CHANGE_THEME,
    name: string,
}

export type ThemeState = Theme

const initialState: ThemeState = themes['simple-light']

// Get Theme function
export function getTheme(state: ReduxStore): ThemeState {
    return state.core.theme 
}

// Root Reducer
export default function(state = initialState, action: ThemeAction): ThemeState {
    if ( action.type == CHANGE_THEME ) {
        if ( themes[action.name] ) {
            return themes[action.name]
        }
    }
    return state
}

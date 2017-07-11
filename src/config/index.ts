import { State } from '../types/state'
import theme from './theme'
import { mixins, renderer } from './style'

/// The initial state for the redux store.
const initialState: State = {
    theme: {
        current: theme, 
        renderRule: renderer,
        mixins
    }
} 
export default initialState

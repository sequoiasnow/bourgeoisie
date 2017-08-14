import coreReducer, { CoreState } from '../core/ducks'
import { combineReducers } from 'redux'

export interface ReduxStore {
    core: CoreState
}

export default combineReducers({
    core: coreReducer
})

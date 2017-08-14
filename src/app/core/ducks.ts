import { StyleState } from './style/ducks'
import { ThemeState } from './theme/ducks'
import { combineReducers } from 'redux'
import style from './style/ducks'
import theme from './theme/ducks'

export interface CoreState { 
    style: StyleState,
    theme: ThemeState
} 

export default combineReducers({ 
    style,
    theme,
})  

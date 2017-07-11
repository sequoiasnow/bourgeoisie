import initialState from '../config'
import { createStore } from 'redux'
import { State } from '../types/state'

export default createStore((a: State) => a, initialState)

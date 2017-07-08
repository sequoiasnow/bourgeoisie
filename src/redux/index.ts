import { connect as reduxConnect } from 'react-redux'

/// Define the overall shape of the state store.
type State = { theme: any }

/// The standard shape of any action.
type Action = {
    type: string,
    [name: string]: any,
}

/// A declarative style of redux dipsatch thunk or regular function.
export interface Dispatch {
        <R>(asyncAction: (dispatch: Dispatch, getState: () => State) => R): R
        <R>(asyncAction: (dispatch: Dispatch) => R): R
        <R>(action: Action): void
}

/// Improve the connect function with some simple typing logic to allow
/// statefull components and easier typings across the board.
export function connect<OwnProps, StateProps, DispatchProps>(
    // Capture the return of mapStateToProps
    mapStateToProps: (state: State, ownProps: OwnProps) => StateProps,
    // Capture hte return of DispatchProps or acceept the shorthand
    mapDispatchToProps?: DispatchProps | ((dispatch: Dispatch, ownProps: OwnProps) => DispatchProps),
) {
    // Combine all generics into inline component.
    return function componentImplementation(
        component: React.ComponentType<OwnProps & StateProps & DispatchProps>
    ) {
        return reduxConnect(mapStateToProps, mapDispatchToProps as any)(component) as any as React.ComponentType<OwnProps>; 
    }
}

////////////////////////////////////////////////////////////////////////////////
// A bit of philosiphy...
// Seperating reducers/actions/components can make life increasingly difficult.
// In this section I'm creating a simple interface to allow any component to
// access the data from any point.
//
// So how does this work? Well the idea is simple, any component should be able
// to call some type of `register` function to setup an endpoint on the store.
// It should also be able to create some type of handler for the action that can
// be converted to a reducer. This is where it gets more interesting. Ideally,
// the reducers could be dynamicly added but that's not how redux works, you need
// to know all reducers beforehand to create the store. One way to handle this
// would be to delcare a global which would register each add a reducer logic,
// then only create a reducer when all those files have been imported, I might
// even try this, but I heasitate because it seemingly relies to much on magic.
////////////////////////////////////////////////////////////////////////////////

/// A simple reducer type for a single action, because it comes up a lot.
type Reducer<TState, TAction extends Action> = (state: TState, action: TAction) => TState

/// The return type of handleAction
interface SingleReducer<TState> {
    type: string,
    reducer: Reducer<TState, Action>
}

/// Creates one part of a reducer, for a specific endpoint of state.
export function handleAction<TState, TAction extends Action>(type: string, reducer: Reducer<TState, TAction>): SingleReducer<TState> {
    return { type, reducer }
}

/// Registers a new endpooint in the store, complete with reducer and actiontypes.
export function createReducer<TState>(initialState: TState, actionHandlers: SingleReducer<TState>[]): Reducer<TState, Action> {
    const map: { [x: string]: Reducer<TState, Action> } = actionHandlers.reduce(({ type, reducer }: SingleReducer<TState>, s) => ({
        ...s,
        [type]: reducer
    }), {})
    return (state = initialState, action) => {
        if ( map[action.type] ) {
            return map[action.type](state, action) 
        }
        return state
    }
}


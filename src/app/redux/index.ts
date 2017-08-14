import { connect as reduxConnect } from 'react-redux'
import { ReduxStore } from './ducks'

/// The standard shape of any action. 
type Action = {
    type: string,
    [name: string]: any,
}

/// A declarative style of redux dipsatch thunk or regular function.
export interface Dispatch {
        <R>(asyncAction: (dispatch: Dispatch, getState: () => ReduxStore) => R): R
        <R>(asyncAction: (dispatch: Dispatch) => R): R
        <R>(action: Action): void
}

/// Improve the connect function with some simple typing logic to allow
/// statefull components and easier typings across the board.
export function connect<OwnProps, StateProps, DispatchProps>(
    // Capture the return of mapStateToProps
    mapStateToProps: (state: ReduxStore, ownProps: OwnProps) => StateProps,
    // Capture hte return of DispatchProps or acceept the shorthand
    mapDispatchToProps?: DispatchProps | ((dispatch: Dispatch, ownProps: OwnProps) => DispatchProps),
) {
    // Combine all generics into inline component.
    return function componentImplementation(
        component: React.SFC<OwnProps & StateProps & DispatchProps>
    ) {
        return reduxConnect(mapStateToProps, (mapDispatchToProps as any) || (() => ({})))(component) as any as React.SFC<OwnProps>; 
    }
}

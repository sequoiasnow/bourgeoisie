import { CoreState } from '../core/ducks'

// The type of a simple action.
export type Action<T extends object> = { type: string } & T

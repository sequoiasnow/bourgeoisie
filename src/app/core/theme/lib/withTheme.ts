import * as PropTypes from 'prop-types'
import { Theme } from '../types'
import { connect } from 'app/redux' 
import { getTheme } from '../ducks'


export interface ThemeProps {
    theme: Theme
}

export function withTheme<Props>(Comp: React.SFC<Props & ThemeProps>) {
    return connect<Props, ThemeProps, {}>((state) => ({
        theme: getTheme(state)
    }))(Comp)
} 

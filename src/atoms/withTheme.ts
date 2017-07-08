import * as PropTypes from 'prop-types'
import { Theme } from '../types/theme'
import { connect } from '../redux'


export interface ThemeProps {
   theme: Theme
}

export function withTheme<Props>(Comp: React.ComponentType<Props & ThemeProps>) {
    return connect((state) => ({
        theme: state.theme.current
    }))(Comp)
} 

export interface RenderProps {
    theme: Theme,
    renderRule: (rule: Object) => string
}

export function withRenderer<Props>(Comp: React.ComponentType<Props & RenderProps>) {
    return connect((state) => ({
        theme: state.theme.current,
        renderRule: state.theme.renderRule
    }))(Comp)
}

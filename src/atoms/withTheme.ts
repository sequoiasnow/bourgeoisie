import * as PropTypes from 'prop-types'
import { Theme } from '../types/theme'
import { connect } from '../redux'


export interface ThemeProps {
   theme: Theme
}

export function withTheme<Props>(Comp: React.SFC<Props & ThemeProps>) {
    return connect<Props, ThemeProps, {}>((state) => ({
        theme: state.theme.current
    }))(Comp)
} 

export interface RenderProps {
    theme: Theme,
    renderRule: (rule: Object) => string
}

export function withRenderer<Props>(Comp: React.SFC<Props & RenderProps>) {
    return connect<Props, RenderProps, {}>((state) => ({
        theme: state.theme.current,
        renderRule: state.theme.renderRule
    }))(Comp)
}

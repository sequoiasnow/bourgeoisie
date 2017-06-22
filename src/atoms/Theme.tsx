import * as PropTypes from 'prop-types'
import { Theme } from '../theme'

/** 
 * Context consists of what variables are passed concerning theme
 */
export interface ThemeContext {
  theme: Theme,
  renderRule: (rule: Object) => string
}


/// Adds the contextTypes property to the component.
export function withTheme<T>(Component: React.ComponentType<T>): React.ComponentType<T> {
  Component.contextTypes = { theme: PropTypes.object }
  return Component
}


/**
 * The theme provider passes down a theme component using react context. It
 * can then be accessed using the withTheme connecting function. 
 */
export class ThemeProvider extends React.Component<ThemeContext, {}> {
  static childContextTypes = {
    theme: PropTypes.object,
    renderRule: PropTypes.func
  }

  getChildContext() {
    return {
      theme: this.props.theme,
      renderRule: this.props.renderRule
    }
  }
  
  render() {
    return ( <div>{this.props.children}</div>)
  } 
}

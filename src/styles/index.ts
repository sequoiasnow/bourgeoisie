import { css } from 'glamor'
import globalRules from './global'

// Adds a reset.css
import 'glamor/reset'

// Render the global rules.
css.global('body, html', globalRules)

// Export the renderRule command to be passed to all components.
export const renderRule = (rule: Object) => css(rule).toString()

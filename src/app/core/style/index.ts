import { css } from 'glamor'
import { StyleObject, Renderer } from './types'

// Add a reset.css
import 'glamor/reset'

/// Add a global style to a given tag such as body
function addGlobalStyle(tag: string, rules: StyleObject) {
    css.global(tag, rules)
}

/// The default renderer for the entire project, performes the wrapper
/// around glamor.
const renderer: Renderer = (rule) => css(rule).toString()

/// There are also the default mixins provided to the project.
const mixins = {
    /// Centers the content both vertically and horizonatlly.
    centerContent: () => ({
        justifyContent: 'center',
        alignItems: 'center'
    }),
    /// @see https://css-tricks.com/perfect-full-page-background-image/
    /// Creates a nice background image for the site.
    perfectBackgroundImage: (fixed = false) => ({
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttatchment: fixed ? 'fixed' : 'scroll'
    })
}

export default {
    addGlobalStyle,
    renderer,
    mixins
}

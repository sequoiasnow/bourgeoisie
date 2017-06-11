import { css } from 'glamor'
import currentTheme from './theme/current' 
import { ThemeProvider } from './atoms/Theme'

import Button from './atoms/Button'

// let test: string = css({ border: '1px solid black' })

/**
 * Transform the glamor css function into a proper format. 
 */
const renderRule = (rule: Object) => css(rule).toString()

export default () => (
  <ThemeProvider renderRule={renderRule} theme={currentTheme}>
    <Button>Hello World</Button>
  </ThemeProvider> 
)  

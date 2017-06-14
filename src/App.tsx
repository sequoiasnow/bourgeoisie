import { css } from 'glamor'
import currentTheme from './theme/current' 
import { ThemeProvider } from './atoms/Theme'

import Button from './atoms/Button'
import SegmentedControl from './atoms/SegmentedControl'
import Heading from './atoms/Heading'

// let test: string = css({ border: '1px solid black' })

/**
 * Transform the glamor css function into a proper format. 
 */
const renderRule = (rule: Object) => css(rule).toString()

export default () => (
  <ThemeProvider renderRule={renderRule} theme={currentTheme}>
    <div>
      <SegmentedControl values={['One', 'Two', 'Three']} />
      <Button>Hello World</Button>
      <Heading>Hello Boldly</Heading>
    </div>
  </ThemeProvider> 
)  

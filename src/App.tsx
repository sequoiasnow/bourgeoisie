import { renderRule } from './styles'
import currentTheme from './theme/current' 
import { ThemeProvider } from './atoms/Theme'

import Button from './atoms/Button'
import SegmentedControl from './atoms/SegmentedControl'
import Heading from './atoms/Heading'

export default () => (
  <ThemeProvider renderRule={renderRule} theme={currentTheme}>
    <div>
      <SegmentedControl values={['One', 'Two', 'Three']} />
      <Button>Hello World</Button>
      <Heading>Hello Boldly</Heading>
    </div>
  </ThemeProvider> 
)  

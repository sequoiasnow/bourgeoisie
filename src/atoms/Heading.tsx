import Text, { TextProps } from './Text'

/**
 * A simple superset of the Text Prop...
 */
const Heading: React.SFC<TextProps> = (props) => (
  <Text>
    {props.children}
  </Text>
)

export default Heading

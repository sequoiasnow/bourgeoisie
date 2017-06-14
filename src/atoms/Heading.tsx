import Text, { TextProps } from './Text'

const Heading: React.SFC<TextProps> = (props) => (
  <Text>
    {props.children}
  </Text>
)
export default Heading

import Box, { joinStyles, Style } from './Box'

export interface ButtonProps {
  onClick?: () => void,
  style?: Style,
  children: string
}

const buttonStyle: Style = (theme) => ({
  padding: 1,
  backgroundColor: theme.colors.primary,
  textAlign: 'center',
  fontSize: 1, 
  borderRadius: theme.borderRadius,
  borderWidth: 1,
  display: 'inline-block' 
})

const Button: React.SFC<ButtonProps> = ({ onClick, style, children }) => (
  <Box borderColor="secondary" style={joinStyles(style, buttonStyle)}> 
    {children} 
  </Box>
)
export default Button

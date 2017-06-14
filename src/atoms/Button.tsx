import Box, { joinStyles, Style } from './Box'

export interface ButtonProps {
  onClick?: () => void,
  style?: Style,
  children: string
}

const Button: React.SFC<ButtonProps> = ({ onClick, style, children }) => (
  <Box css={[style, (theme) => ({
      padding: 1,
      backgroundColor: theme.colors.primary,
      textAlign: 'center',
      fontSize: 1, 
      borderRadius: theme.borderRadius,
      display: 'inline-block',
      cursor: 'pointer',
      color: theme.colors.white
    })]}> 
    {children}  
  </Box>
)
export default Button

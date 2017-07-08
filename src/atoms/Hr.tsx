import Box, { Style, withStyle } from './Box'

interface LineBreakProps {
  color?: string,
  marginOverlap?: number,
  css?: Style | Array<Style>
}

/// Creats a simple <hr /> effect, marginOverlap makes it
/// stand out passed the content.
const LineBreak: React.SFC<LineBreakProps> = (props) => (
  <Box css={withStyle(theme => ({
      height: '1px',
      width: '100%',
      marginTop: 1,
      marginBottom: 1,
      backgroundColor: props.color || theme.colors.secondary,
      ...(props.marginOverlap ? {
        width: `${100 + props.marginOverlap * 2}%`,
        marginLeft: `-${props.marginOverlap}%`,
        marginRight: `-${props.marginOverlap}%`,
      } : {})
    }), props.css)} />
)
export default LineBreak

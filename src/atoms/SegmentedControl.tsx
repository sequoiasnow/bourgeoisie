import Box from './Box'

export interface SegmentedControlProps {
  onChange?: (index: number) => void,
  selectedIndex?: number,
  values: string[] 
}

const SegmentedControl: React.SFC<SegmentedControlProps> = ({ onChange = () => {}, selectedIndex = 0, values }) => (
  <Box css={(theme) => ({
      overflow: 'hidden',
      borderWidth: 1,
      borderStyle: 'solid', 
      borderColor: theme.colors.primary,
      borderRadius: theme.borderRadius,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    })}> 
    {values.map((value, i) => <Box key={i} as="span" onClick={() => onChange(i)} css={(theme) => ({
        borderLeft: i !== 0 ? `1px solid ${theme.colors.primary}` : null,
        textAlign: 'center',
        padding: 1 / 2, 
        cursor: 'pointer',
        backgroundColor: (i == selectedIndex) ? theme.colors.primary : 'transparent',
        color: (i == selectedIndex) ? theme.colors.white : theme.colors.black
      })}>{value}</Box>)}
  </Box>  
)
export default SegmentedControl

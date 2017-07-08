import Box from './Box'

/**
 * The page contains the content for the enitre site, and in this case 
 * is simply a minimal view that squishes the content.
 */
const Page: React.SFC<{}> =  ({ children }) => (
  <Box flexDirection="row" justifyContent="center" backgroundColor="white"> 
    <Box maxWidth={800} padding={2}>
      {children}  
    </Box> 
  </Box>
) 
export default Page

import Text from './atoms/Text'
import Box from './atoms/Box'

import { Provider } from 'react-redux'
import store from './redux/createStore'

export default () => (
    <Provider store={store}>
        <div> 
            <Box backgroundColor="primary" padding={4}>
                <Text size={3} decoration="underline">
                    Hello World
                </Text>
            </Box>
        </div>
    </Provider>
)  

import { Provider } from 'react-redux'
import store from './redux/store'
import Hello from './hello'

export default () => (
    <Provider store={store}>
        <Hello /> 
    </Provider>
)

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './app/redux/store'
import App from './app/app'

render(<App />, document.getElementById('react-root'))

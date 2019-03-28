import App from './components/App'
import * as serviceWorker from './serviceWorker'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import './index.css'

render(<Provider store = {store}><App/></Provider>, document.getElementById('container'))

serviceWorker.unregister()

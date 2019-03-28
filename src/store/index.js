import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'
import logger from '../middlewares/logger'
import thunk from 'redux-thunk'
import randomID from '../middlewares/randomID'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, randomID, logger)
)
const store = createStore(rootReducer, enhancer)

window.store = store

export default store
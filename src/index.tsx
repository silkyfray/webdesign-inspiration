import * as React from 'react'
import * as ReactDOM from 'react-dom'

import "skeleton-css/css/skeleton.css"
import "./css/index.scss";

// redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

// routing
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// logger
import logger from 'redux-logger'

//Components
import CatalogPage from "./components/pages/CatalogPage"
import UserSettingsPage from "./components/pages/UserSettingsPage"
import SubmitDesignPage from "./components/pages/SubmitDesignPage"
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routermiddleware = routerMiddleware(history)

// init store
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(routermiddleware, logger)
)

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={CatalogPage}/>
        <Route path="/submit" component={SubmitDesignPage}/>
        <Route path="/settings" component={UserSettingsPage}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

import jwtDecode from 'jwt-decode'

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import themeFile from './util/theme'
import AuthRoute from './util/AuthRoute'


import { Provider } from 'react-redux'
import store from './Redux/store'
import { SET_AUTHENTICATED } from './Redux/types'
import { logoutUser, getUserData } from './Redux/actions/userActions'
import axios from 'axios'




const theme = createMuiTheme(themeFile)


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'

  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>

        <Provider store={store} >
          <div className="App">
            <Router>
              <Navbar />
              <div className="container">

                <Switch>
                  <Route exact path="/" component={home} />
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                </Switch>
              </div>
            </Router>

          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App

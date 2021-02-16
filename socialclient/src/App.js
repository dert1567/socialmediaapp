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




const theme = createMuiTheme(themeFile)

let authenticated
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  }
  else {
    authenticated = true
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
                  <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
                  <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
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

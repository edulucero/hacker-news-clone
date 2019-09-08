import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './index.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Loading from './components/Loading'
import User from './components/User'
import Post from './components/Post'
import Jobs from './components/Jobs'
import { ThemeProvider } from './contexts/theme'

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({theme}) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }
  render() {
    return(
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path='/' render={() => <Home type='top'/>} />
                  <Route exact path='/new' render={() => <Home type='new'/>} />
                  <Route path='/jobs' component={Jobs} />
                  <Route path='/user' component={User} />
                  <Route path='/post' component={Post} />
                  <Route render={() => <h1>💩 Error 404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
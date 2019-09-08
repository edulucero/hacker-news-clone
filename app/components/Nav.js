import React from 'react'
import { NavLink } from 'react-router-dom' 
import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme}) => (
        <div className={`nav-wrapper nav-${theme}`}>
          <nav className='space-between'>
            <ul>
              <li>
                <NavLink
                  className='nav-link'
                  to='/'
                  exact
                >
                  <span className='title'>Hacker-News</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className='nav-link'
                  to='/'
                  exact
                  activeStyle={activeStyle}
                >
                  Top
                </NavLink>
              </li>
              <li>
                <NavLink
                  className='nav-link'
                  to='/new'
                  activeStyle={activeStyle}
                >
                  New
                </NavLink>
              </li>
              <li>
                <NavLink
                  className='nav-link'
                  to='/jobs'
                  activeStyle={activeStyle}
                >
                  Jobs
                </NavLink>
              </li>
            </ul>
            <button
              style={{fontSize: 30}}
              className='btn-clear'
              onClick={toggleTheme}
            >
              {theme === 'light' ? '🔦' : '💡'}
            </button>
          </nav>
        </div>
      )}
    </ThemeConsumer>
  )
}
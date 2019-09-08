import React from 'react'
import PropTypes from 'prop-types'
import Title from './Title'
import PostMetaInfo from './PostMetaInfo'
import PostMetaInfoLarge from './PostMetaInfoLarge'
import { ThemeConsumer } from '../contexts/theme'


export default class PostsList extends React.Component {
  
  state = {
    isMobile: null
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize = () => {
    console.log('resize')
    this.setState({
      isMobile: window.innerWidth < 480
    })
  }
  

  render() {

    const { posts } = this.props
    const { isMobile } = this.state

    if(posts === null || posts === []) {
      return(
        <p>
          No posts available
        </p>
      )
    }
  
    return(
      <ThemeConsumer>
  {({theme}) => (
    <div className='posts-list'>
    <ul>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <div className={`post-container post-container-${theme}`}>
              <div className={`rank-container rank-container-${theme}`}>
                  {posts.indexOf(post) + 1}
              </div>
              <div className='posts'>
                <Title url={post.url} title={post.title} id={post.id}/>
                {
                  isMobile === true ?
                  <PostMetaInfo
                  id={post.id}
                  by={post.by}
                  score={post.score}
                  time={post.time}
                  descendants={post.descendants}
                />
                :
                <PostMetaInfoLarge
                  id={post.id}
                  by={post.by}
                  score={post.score}
                  time={post.time}
                  descendants={post.descendants}
              />
              }
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
  )}
</ThemeConsumer>
    )
  }
}
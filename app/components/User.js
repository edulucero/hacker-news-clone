import React from 'react'
import { fetchUser, fetchPosts } from '../utils/api'
import queryString from 'query-string'
import Loading from './Loading'
import PostsList from './PostsList';
import { formatUnixTime } from '../utils/Helpers'
import { ThemeConsumer } from '../contexts/theme'

export default class User extends React.Component {
  
  state = {
    user: null,
    loadingUser: true,
    posts: null,
    loadingPosts: true,
    error: null
  }

  componentDidMount() {

    const { id } = queryString.parse(this.props.location.search)

    fetchUser(id)
      .then((user) => {
        this.setState({
          user,
          loadingUser: false
        })
        return fetchPosts(user.submitted.slice(0, 30))
      })
      .then((posts) =>
        this.setState({
          posts,
          loadingPosts: false,
          error: null
        })
      )
      .catch(({ message }) => 
          this.setState({
          loadingUser: false,
          loadingPosts: false,
          error: message
        }))
  }

  render() {

    const { user, posts, error, loadingUser, loadingPosts } = this.state

    if(error) {
      return <p>{error}</p>
    }

    return(
        <ThemeConsumer>
          {({ theme }) => (
            <React.Fragment>
              {loadingUser === true
                ? <Loading />
                : 
                  <React.Fragment>
                    <div className="user-heading">
                      <h1>{user.id}</h1>
                      <span className='meta-text'>joined: <strong className={`${theme}-text`}>{formatUnixTime(user.created)}</strong></span>
                      <span className='meta-text'> has <strong className={`${theme}-text`}>{user.karma}</strong> karma</span>
                      <h2>Posts</h2>
                    </div>
                  </React.Fragment>}
    
              {loadingPosts === true
                ? <Loading />
                :
                  <React.Fragment>
                    <PostsList posts={posts}/>
                  </React.Fragment>}
            </React.Fragment> 

          )}
        </ThemeConsumer>
    )
  }
}

import React from 'react'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'

export default class Home extends React.Component {
  state = {
    posts: null,
    error: null,
    loading: false
  }

  componentDidMount() {
    this.handleFetch()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetch()
    }
  }

  handleFetch = () => {
    this.setState({
      posts: null,
      error: null,
      loading: true,
    })

    fetchMainPosts(this.props.type)
      .then((posts) => this.setState({
        posts,
        loading: false,
        error: null
      }))
      .catch(({message}) => this.setState({
        loading: false,
        error: message
      }))

  }

  render() {

    const { posts, error, loading } = this.state

 
      if(loading === true) {
        return <Loading />
      }

      if(error) {
        return <p>{error}</p>
      }

      return <PostsList posts={posts}/>
    
  }

}
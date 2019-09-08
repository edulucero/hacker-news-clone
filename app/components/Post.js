import React from 'react'
import queryString from 'query-string'
import { fetchItem, fetchPosts, fetchComments } from '../utils/api'
import Loading from './Loading'
import Comment from './Comment'
import PostMetaInfo from './PostMetaInfo';
import { ThemeConsumer } from '../contexts/theme'

export default class Post extends React.Component {

  state = {
    post: null,
    comments: null,
    loadingPost: true,
    loadingComments: true,
    error: null
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    fetchItem(id)
      .then((post) => {
        this.setState({
          post,
          loadingPost: false
        })
        return fetchComments(post.kids || [])
      })
      .then((comments) => {
        this.setState({
          comments,
          loadingComments: false
        })
      })
      .catch(({ message } ) => {
        this.setState({
          loadingPost: false,
          loadingComments: false,
          error: message
        })
      })
  }

  render() {
    const { post, comments, loadingComments, loadingPost, error } = this.state

    if(error) {
      return <p>{error}</p>
    }
    
    return (
      <ThemeConsumer>
  {({ theme }) => (
    <React.Fragment>
      { 
        loadingPost === true 
        ? <Loading text={'Loading Posts'}/>
        : <React.Fragment>
          <div className={`post-header comment comment-${theme}`}>
            <a href={post.url}><h1>{post.title}</h1></a>  
            <PostMetaInfo score={post.score} by={post.by} time={post.time} />
            <p className="dsih" dangerouslySetInnerHTML={{__html: post.text}} />
          </div>
          </React.Fragment>
      }
      {
        loadingComments === true
        ? <Loading text={'Loading Comments'} speed={500}/>
        : <React.Fragment>
            <div className="comment-list">
              {comments.map((comment) => {
                return <Comment comment={comment} key={comment.id}/>
              })}
            </div>
          </React.Fragment>
      }
    </React.Fragment>
  )}
</ThemeConsumer>
    )
  }
}
import React from 'react'
import CommentMetaInfo from './CommentMetaInfo'
import { ThemeConsumer } from '../contexts/theme'

export default function Comment({comment}) {
  return(
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`comment comment-${theme}`}>
          <CommentMetaInfo
            by={comment.by}
            time={comment.time}
          />
          <p dangerouslySetInnerHTML={{__html: comment.text}} />
        </div>
      )}
    </ThemeConsumer>
  )
}
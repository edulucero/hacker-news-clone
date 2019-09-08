import React from 'react'
import { Link } from 'react-router-dom'
import { formatUnixTime} from '../utils/Helpers'
import { ThemeConsumer } from '../contexts/theme'
import { FaCommentAlt, FaUser } from 'react-icons/fa'

export default function PostMetaInfo({ id, by, score, time, descendants}) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="post-meta-info">
            {
              score === 1
              ? 
                <span className="meta-text">
                  <span className="score">{score}</span> point
                </span>
              :
                <span className="meta-text">
                  <span className="score">{score}</span> points
                </span>
            }
            <span className='meta-text'>
              <Link className={`${theme}-text`} to={`/user?id=${by}`}>
                by {by} <FaUser size={10}/>
              </Link>
            </span>
            <span className='meta-text'>
              on {formatUnixTime(time)}
            </span>
            {
              typeof descendants === 'number' &&
                <div className="meta-comments-container">
                  <span className='meta-text'>
                    <Link className={`${theme}-text meta-text`} to={`/post?id=${id}`}>
                      <FaCommentAlt size={10} color={"grey"}/> {descendants} comments
                    </Link>
                  </span>  
                </div>
            } 
        </div>
      )}
    </ThemeConsumer>
  )
}
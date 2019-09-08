import React from 'react'
import { Link } from 'react-router-dom'

export default function Title({url, title, id}) {
  return url
    ? <a href={url} className='link'>{title}</a>
    : <Link className='link' to={`/post?id=${id}`}>{title}</Link>
  
}
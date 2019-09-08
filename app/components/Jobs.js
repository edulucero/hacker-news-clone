import React from 'react'
import { fetchJobs } from '../utils/api'
import Loading from './Loading'
import Title from './Title'
import PostsList from './PostsList'
import { ThemeConsumer } from '../contexts/theme'
import { Link } from 'react-router-dom'
import { formatUnixTime } from '../utils/Helpers'

export default class Jobs extends React.Component {
  state = {
    jobs: null,
    loadingJobs: true,
    error: null
  }

  componentDidMount() {

    fetchJobs()
    .then((jobs) => {
      this.setState({
        jobs,
        loadingJobs: false
      })
    })
    .catch(({ message }) => this.setState({
      loadingJobs: false,
      error: message
    }))
  }

  render() {
    const { jobs, error, loadingJobs} = this.state

    if(loadingJobs === true) {
      return <Loading text='Loading jobs'/>
    }

    if(error) {
      return <p>{error}</p>
    }



    return(
      <ThemeConsumer>
      {({ theme }) => (
        <div className='posts-list'>
        <ul>
          {jobs.map((jobs) => {
            return (
              <li key={jobs.id}>
                <div className="posts-container">
                  <div className='posts'>
                    <Title url={jobs.url} title={jobs.title} id={jobs.id}/>
                    <div>
                      <span className='meta-text'>
                        by <Link className={`${theme}-text`} to={`/user?id=${jobs.by}`}>{jobs.by}</Link>
                      </span>
                      <span className='meta-text'> on {formatUnixTime(jobs.time)} </span>
                    </div>
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
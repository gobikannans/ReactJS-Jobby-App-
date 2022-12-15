import {Component} from 'react'
import Header from '../Header'
import JobsFilterSection from '../JobsFilterSection'
import './index.css'
import JobProfileSection from '../JobProfileSection'

class JobsForum extends Component {
  state = {searchInpu: ''}

  render() {
    return (
      <>
        <Header />
        <div className="jobsForum-container">
          <JobProfileSection />
        </div>
      </>
    )
  }
}

export default JobsForum

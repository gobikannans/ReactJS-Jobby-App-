import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobsFilterSection from '../JobsFilterSection'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobProfileSection extends Component {
  state = {
    searchInput: '',
    jobsApiStatus: apiStatusConstants.initial,
    jobsList: [],
    employmentType: [],
    salary: 0,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const {searchInput, employmentType, salary} = this.state
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const employTime = employmentType.join()

    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employTime}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const jobData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobBio: eachJob.job_description,
        location: eachJob.location,
        salary: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        id: eachJob.id,
      }))
      this.setState({
        jobsList: jobData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderNoJobsView = () => (
    <div className="no-job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-logo"
      />
      <h1 className="no-job-title">No Jobs Found</h1>
      <p className="no-job-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobSuccessView = () => {
    const {jobsList} = this.state
    const jobsView = jobsList.length > 0
    return jobsView ? (
      <ul className="job-list-container">
        {jobsList.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      this.renderNoJobsView()
    )
  }

  renderJobLoader = () => (
    <div className="profile-loader-failure-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobFailureView = () => (
    <div className="no-job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-job-logo"
      />
      <h1 className="no-job-title">Oops! Something went Wrong</h1>
      <p className="no-job-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-failure-btn"
        onClick={this.getJobsData}
      >
        Retry
      </button>
    </div>
  )

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterInput = () => {
    this.getJobsData()
  }

  changeEmployment = event => {
    const {employmentType} = this.state
    const inputNotInList = employmentType.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.getJobsData,
      )
    } else {
      const filteredData = employmentType.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        prevState => ({employmentType: filteredData}),
        this.getJobsData,
      )
    }
  }

  changeSalary = salary => {
    this.setState({salary}, this.getJobsData)
  }

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <div className="job-search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          onChange={this.onSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          className="search-btn"
          onClick={this.onEnterInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderAllProfileApi = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderJobLoader()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-section-container">
        <div className="mobile-search-container">{this.renderSearch()}</div>
        <JobsFilterSection
          changeEmployment={this.changeEmployment}
          changeSalary={this.changeSalary}
        />
        <div className="job-section-details">
          <div className="pc-search-container">{this.renderSearch()}</div>
          {this.renderAllProfileApi()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection

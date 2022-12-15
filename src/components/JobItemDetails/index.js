import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsList: [],
    similarJobList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobBio: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    salary: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  formattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobBio: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const jobDetailsData = this.getFormattedData(data.job_details)
      const similarJobData = data.similar_jobs.map(eachJob =>
        this.formattedSimilarData(eachJob),
      )
      console.log(jobDetailsData)
      console.log(similarJobData)

      this.setState({
        jobDetailsList: jobDetailsData,
        similarJobList: similarJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsSuccess = () => {
    const {jobDetailsList} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      title,
      jobBio,
      employmentType,
      salary,
      location,
      skills,
      lifeAtCompany,
    } = jobDetailsList

    const {description, imageUrl} = lifeAtCompany

    console.log(skills)

    return (
      <>
        <div className="job-item-details-card">
          <div className="card-job-top">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="details-company-logo"
            />
            <div className="job-company-container">
              <h1 className="card-company-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="company-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-middle">
            <div className="job-middle-section">
              <div className="job-company-details">
                <div className="rating-container">
                  <HiLocationMarker className="card-company-location" />
                  <p className="details-location-para">{location}</p>
                </div>
                <div className="rating-container">
                  <HiMail className="company-location" />
                  <p className="details-location-para">{employmentType}</p>
                </div>
              </div>
              <p className="details-company-salary">{salary}</p>
            </div>
            <hr className="job-hr-line" />
            <div className="job-bio-container">
              <h1 className="job-details-description-title">Description</h1>
              <div className="visit-link-container">
                <a href={companyWebsiteUrl} className="visit-link">
                  Visit
                </a>
                <a href={companyWebsiteUrl} className="visit-link">
                  <BiLinkExternal className="visit-icon" />
                </a>
              </div>
            </div>
            <p className="job-details-bio">{jobBio}</p>
          </div>
          <div className="skill-container">
            <h1 className="job-details-card-heading">Skills</h1>
            <ul className="skill-list-container">
              {skills.map(eachItem => (
                <SkillsCard skillsDetails={eachItem} key={eachItem.name} />
              ))}
            </ul>
          </div>
          <div className="life-company-container">
            <h1 className="job-details-card-heading">Life at Company</h1>
            <div className="life-company-details">
              <p className="company-bio">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-company-img"
              />
            </div>
          </div>
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobList} = this.state

    return (
      <div className="similar-job-container">
        <h1 className="job-details-heading">Similar Jobs</h1>
        <ul className="similar-list-container">
          {similarJobList.map(eachJob => (
            <SimilarJobItem similarJobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsLoader = () => (
    <div className="job-item-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailure = () => (
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
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsApi = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccess()
      case apiStatusConstants.inProgress:
        return this.renderJobDetailsLoader()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetailsApi()}
        </div>
      </>
    )
  }
}

export default JobItemDetails

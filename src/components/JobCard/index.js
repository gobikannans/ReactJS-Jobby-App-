import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobBio,
    location,
    salary,
    rating,
    title,
  } = jobDetails

  return (
    <Link className="jobs-links" to={`jobs/${id}`}>
      <li className="job-card-container">
        <div className="card-job-top">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="card-company-logo"
          />
          <div className="card-company-container">
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
                <p className="card-location-para">{location}</p>
              </div>
              <div className="rating-container">
                <HiMail className="card-company-location" />
                <p className="card-location-para">{employmentType}</p>
              </div>
            </div>
            <h1 className="job-company-salary">{salary}</h1>
          </div>
          <hr className="job-hr-line" />
          <h1 className="job-description-title">Description</h1>
          <p className="job-bio">{jobBio}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard

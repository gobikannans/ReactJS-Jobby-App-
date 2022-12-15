import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobBio,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <div className="similar-job-list">
      <div className="similar-job-top">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div className="similar-job-company-container">
          <h1 className="similar-company-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="company-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="similar-job-details-description-title">Description</h1>
        <p className="similar-job-details-bio">{jobBio}</p>
      </div>
      <div className="similar-job-last-section">
        <div className="rating-container">
          <HiLocationMarker className="company-location" />
          <p className="similar-location-para">{location}</p>
        </div>
        <div className="rating-container">
          <HiMail className="company-location" />
          <p className="similar-location-para">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobItem

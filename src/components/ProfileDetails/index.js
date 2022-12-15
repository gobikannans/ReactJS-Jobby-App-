import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {profileList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
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
      const profileData = {
        name: data.profile_details.name,
        profileImage: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        profileList: profileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileLoader = () => (
    <div className="profile-loader-failure-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileList} = this.state
    const {name, profileImage, bio} = profileList
    return (
      <div className="profile-success-container">
        <img src={profileImage} alt="profile" className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-loader-failure-container">
      <button
        type="button"
        className="profile-failure-btn"
        onClick={this.getProfileData}
      >
        Retry
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoader()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderApiStatus()}</>
  }
}

export default ProfileDetails

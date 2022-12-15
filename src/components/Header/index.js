import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="header-container">
        <Link to="/" className="links-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="header-links-container">
          <li className="list-style">
            <Link to="/" className="header-links">
              <p className="links-style">Home</p>
            </Link>
          </li>
          <li className="list-style">
            <Link to="/jobs" className="header-links">
              <p className="links-style">Jobs</p>
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
      <nav className="small-header-container">
        <Link to="/" className="links-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="header-links-container">
          <li className="list-style">
            <Link to="/" className="header-links">
              <AiFillHome className="header-icon" />
            </Link>
          </li>
          <li className="list-style">
            <Link to="/jobs" className="header-links">
              <BsFillBriefcaseFill className="header-icon" />
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          <FiLogOut className="header-icon" />
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)

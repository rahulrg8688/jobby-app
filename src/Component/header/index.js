import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  //   const JwtToken = Cookies.get('jwt_token')
  const LogOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/Login')
    // return <Redirect to="/Login" />
  }
  return (
    <div className="Header_container">
      <ul className="imageContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="websiteLogo"
        />
        <h3 className="JobbyName">Jobby App</h3>
      </ul>
      <ul className="home_jobs_container">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/Jobs">
          <h1>Jobs</h1>
        </Link>
      </ul>
      <ul className="button">
        <button className="buttonElement" onClick={LogOut} type="button">
          Logout
        </button>
      </ul>
    </div>
  )
}
export default withRouter(Header)

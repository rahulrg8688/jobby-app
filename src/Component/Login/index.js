import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = JwtToken => {
    const {history} = this.props
    const Jwttoken = Cookies.set('jwt_token', JwtToken, {expires: 30})
    if (Jwttoken !== undefined) {
      history.replace('/')
    }
  }

  onSubmitFailure = error => {
    this.setState({showSubmitError: true, errorMsg: error})
  }

  Submit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',

      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    // const {jwt_token} = data
    // console.log(`jjjjj${jwt_token}`)
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure()
    }
  }

  render() {
    const {username, password} = this.state
    console.log(username)
    console.log(password)
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken !== undefined) {
      console.log(`verified`)
    }
    return (
      <div className="loginContainer">
        <form onSubmit={this.Submit} className="Loginform">
          <ul>
            <ul className="imageContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                alt="websiteLogo"
                className="WebsiteLogo"
              />
            </ul>
            <ul className="UserContainer">
              <ul>
                <label htmlFor="name">USERNAME</label>
              </ul>
              <ul>
                <input
                  type="name"
                  placeholder="username"
                  id="name"
                  className="inputElement"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </ul>

              <ul>
                <label htmlFor="password">PASSWORD</label>
              </ul>
              <ul>
                <input
                  type="password"
                  placeholder="password"
                  id="password"
                  value={password}
                  className="inputElement"
                  onChange={this.onChangePassword}
                />
              </ul>

              <button className="button" type="submit">
                Login
              </button>
            </ul>
          </ul>
        </form>
      </div>
    )
  }
}

export default Login

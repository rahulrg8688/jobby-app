import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../header'
import JobsDescription from '../jobsDescription'
import Salary from '../salary'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const ApistatusExtends = {
  initial: 'INITIAl',
  loading: 'LOADING',
  Success: 'SUCCESS',
  failure: 'FAILURE',
}

class jobs extends Component {
  state = {
    detailsProfile: '',
    JobsDetails: [],
    EmploymentId: employmentTypesList[0].employmentTypeId,
    salaryId: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    ApiStatus: ApistatusExtends.initial,
  }

  componentDidMount() {
    this.getHomeDetails()
    this.renderDescriptionDetails()
  }

  getHomeDetails = async () => {
    const Url = 'https://apis.ccbp.in/profile'
    const JwtToken = Cookies.get('jwt_token')
    console.log(`jwt ${JwtToken}`)
    const Options = {
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, Options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const ProfileDetails = {
        name: data.profile_details.name,
        profileImage: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      console.log(ProfileDetails)
      this.setState({
        detailsProfile: ProfileDetails,
        ApiStatus: ApistatusExtends.Success,
      })
    }
  }

  renderProfileDetails = () => {
    const {detailsProfile} = this.state
    console.log(detailsProfile)
    const {name, profileImage, bio} = detailsProfile
    return (
      <div className="profile">
        <h4>{name}</h4>
        <img src={profileImage} alt={name} className="imagePro" />
        <p>{bio}</p>
      </div>
    )
  }

  renderDescriptionDetails = async () => {
    const {EmploymentId, salaryId} = this.state
    this.setState({ApiStatus: ApistatusExtends.loading})
    const JwtToken = Cookies.get('jwt_token')
    const Url = ` https://apis.ccbp.in/jobs?employment_type=${EmploymentId}&minimum_package=${salaryId}`
    console.log(`Token${JwtToken}`)
    const Options = {
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, Options)

    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedData = data.jobs.map(each => ({
        companyUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        salary: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      console.log(fetchedData)
      this.setState({
        JobsDetails: fetchedData,
        ApiStatus: ApistatusExtends.Success,
      })
    } else {
      this.setState({ApiStatus: ApistatusExtends.failure})
    }
    // this.setState({ApiStatus: ApistatusExtends.failure})
  }

  renderSuccessView = () => {
    const {JobsDetails, searchInput} = this.state
    // console.log(JobsDetails)

    const filteredData = JobsDetails.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(filteredData)
    if (filteredData.length === 0) {
      return (
        <div className="bg">
          <h1 className="heading">No Jobs found </h1>
        </div>
      )
    }

    return (
      <div>
        {filteredData.map(JobItems => (
          <ul className="JobsContainer">
            <JobsDescription JobDetails={JobItems} key={JobItems.id} />
          </ul>
        ))}
      </div>
    )
  }

  onChangeEmployee = id => {
    this.setState({EmploymentId: id}, this.renderDescriptionDetails)
  }

  onChangeSalary = id => {
    this.setState({salaryId: id}, this.renderDescriptionDetails)
  }

  salaryUpdates = () => {
    const {EmploymentId} = this.state

    return (
      <Salary
        EmploymentId={EmploymentId}
        EmploymentType={employmentTypesList}
        SortEmployee={this.onChangeEmployee}
        changeSalary={this.onChangeSalary}
        salaryRangesList={salaryRangesList}
      />
    )
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <div>
        <h1>Some thing went wrong</h1>
        <p>we cannot find the page you are looking for</p>
      </div>
    </div>
  )

  Api = () => {
    const {ApiStatus} = this.state
    console.log(ApiStatus)
    console.log(ApistatusExtends.Success)

    switch (ApiStatus) {
      case ApistatusExtends.Success:
        return this.renderSuccessView()

      case ApistatusExtends.loading:
        return this.renderLoading()

      case ApistatusExtends.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {EmploymentId, searchInput, JobsDetails} = this.state
    console.log(searchInput)

    // const filteredData = JobsDetails.filter(each => each.title === searchInput)
    // console.log(filteredData)
    return (
      <div>
        <Header />

        <div className="top_container">
          <ul className="profile_container">
            {this.renderProfileDetails()}
            <hr />
            <ul>{this.salaryUpdates()}</ul>
          </ul>
          <ul className="JobsContainer">
            <ul className="InputSearch">
              <input
                type="search"
                className="InputClass"
                onChange={this.onChangeInput}
              />
            </ul>
            {this.Api()}
            {/* {this.renderSuccessView()} */}
          </ul>
        </div>
      </div>
    )
  }
}

export default jobs

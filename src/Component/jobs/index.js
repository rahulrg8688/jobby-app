import {Component} from 'react'
import Cookies from 'js-cookie'
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

class jobs extends Component {
  state = {
    detailsProfile: '',
    JobsDetails: [],
    EmploymentId: employmentTypesList[0].employmentTypeId,
    salaryId: salaryRangesList[0].salaryRangeId,
    searchInput: '',
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
      this.setState({detailsProfile: ProfileDetails})
    }
  }

  renderProfileDetails = () => {
    const {detailsProfile} = this.state
    console.log(detailsProfile)
    const {name, profileImage, bio} = detailsProfile
    return (
      <div>
        <h4>{name}</h4>
        <img src={profileImage} alt={name} />
        <p>{bio}</p>
      </div>
    )
  }

  renderDescriptionDetails = async () => {
    const {EmploymentId, salaryId} = this.state

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
      this.setState({JobsDetails: fetchedData})
    }
  }

  renderSuccessView = () => {
    const {JobsDetails, searchInput} = this.state
    // console.log(JobsDetails)

    const filteredData = JobsDetails.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(filteredData)
    if (filteredData.length === 0) {
      return <h1>Not found</h1>
    }

    return (
      <div>
        {filteredData.map(each => (
          <JobsDescription JobDetails={each} key={each.id} />
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

  render() {
    const {EmploymentId, searchInput, JobsDetails} = this.state
    console.log(searchInput)

    // const filteredData = JobsDetails.filter(each => each.title === searchInput)
    // console.log(filteredData)
    return (
      <div>
        <Header />
        <ul className="InputSearch">
          <input
            type="search"
            className="InputClass"
            onChange={this.onChangeInput}
          />
        </ul>
        <div className="top_container">
          <ul className="profile_container">
            {this.renderProfileDetails()}
            <ul>{this.salaryUpdates()}</ul>
          </ul>
          {this.renderSuccessView()}
        </div>
      </div>
    )
  }
}

export default jobs

import {Component} from 'react'
import Cookies from 'js-cookie'
import Skills from '../Skills'
import Header from '../header'

import './index.css'

class JobsItemDetails extends Component {
  state = {
    UpdatedJobDetails: '',
    // skills: [],
    SimilarJobsDetails: [],
    LifeWork: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props

    const {params} = match

    const {id} = params
    const JwtToken = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    const data = await response.json()
    // console.log(data)

    const fetchedData = {
      jobDetails: {
        companyUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        description: data.job_details.job_description,

        lifeAtCompany: {
          Companydescription: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        salary: data.job_details.package_per_annum,
        rating: data.job_details.rating,

        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        title: data.job_details.title,
      },
      similarJobs: data.similar_jobs.map(each => ({
        id: each.id,
        title: each.title,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
      })),
    }

    // console.log(fetchedData)
    this.setState({
      UpdatedJobDetails: fetchedData.jobDetails,
      //   skills: fetchedData.jobDetails.skills,
      LifeWork: fetchedData.jobDetails.lifeAtCompany,
      SimilarJobsDetails: fetchedData.similarJobs,
    })

    // console.log(fetchedData.jobDetails.lifeAtCompany)
  }

  render() {
    const {UpdatedJobDetails, LifeWork, SimilarJobsDetails} = this.state

    const {lifeAtCompany, skills} = UpdatedJobDetails
    console.log(lifeAtCompany)
    console.log(skills)
    console.log(UpdatedJobDetails)
    // const {lifeAtCompany} = UpdatedJobDetails
    // console.log(LifeWork)
    // console.log(SimilarJobsDetails)
    // const {Companydescription} = lifeAtCompany
    // console.log(Companydescription)

    // console.log(lifeAtCompany.Companydescription)
    const {
      employmentType,
      companyWebsiteUrl,
      companyUrl,
      id,
      description,
      title,
      rating,
      salary,
      location,
    } = UpdatedJobDetails
    // console.log(employmentType)
    // const {salary} = lifeAtCompany
    // console.log(lifeAtCompany)
    // console.log(skills)
    //
    // console.log(title)
    // console.log(UpdatedJobDetails.lifeAtCompany.description)

    return (
      <div>
        <Header />
        <div className="bg_container">
          <ul className="TopSection">
            <ul className="Name_container">
              <img src={companyUrl} alt={title} />
              <ul>
                <h1>{title}</h1>
                <p>{rating}</p>
              </ul>
            </ul>
            <ul className="salary">
              <p>{location}</p>
              <p>{employmentType}</p>

              <p className="income">{salary}</p>
            </ul>
            <hr />
            <ul className="Description">
              <h1 className="heading">Description</h1>
              <p>{description}</p>
              <h2 className="skillsPara">skills</h2>
              <ul className="skillsContainer">
                {skills.map(each => (
                  <ul className="skills">
                    <p>{each.name}</p>
                    <img
                      src={each.imageUrl}
                      alt={each.name}
                      className="image"
                    />
                  </ul>
                ))}
              </ul>
            </ul>
            <ul>
              <h1>Life at Company</h1>
              <ul className="CompanyList">
                <p>{LifeWork.Companydescription}</p>
                <img src={LifeWork.imageUrl} alt={title} />
              </ul>
            </ul>
          </ul>

          <h1>similar Jobs</h1>

          <ul className="similarProductsSection">
            {SimilarJobsDetails.map(each => (
              <Skills similarJobs={each} Url={companyUrl} />
            ))}

            {/* /* <ul className="downSection">
                  <ul className="similarTop">
                    <img src={companyUrl} className="image" />
                    <h1>{each.title}</h1>

                    <h4>Description</h4>
                    <p>{each.jobDescription}</p>

                    <p>{each.location}</p>
                    <p>{each.employmentType}</p>
                  </ul>
                </ul> */}
          </ul>
        </div>
      </div>
    )
  }
}
export default JobsItemDetails

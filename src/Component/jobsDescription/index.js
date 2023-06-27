import {Link} from 'react-router-dom'

import './index.css'

const JobsDescription = props => {
  const {JobDetails} = props
  const {
    companyUrl,
    employmentType,
    id,
    jobDescription,
    location,
    salary,
    rating,
    title,
  } = JobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <div className="itemContainer">
        <ul>
          <img src={companyUrl} alt={id} />
          <h2>{title}</h2>
          <p>{rating}</p>
          <p>{location}</p>
          <p>{employmentType}</p>
          <p>{salary}</p>
          <hr />
          <p>{jobDescription}</p>
        </ul>
      </div>
    </Link>
  )
}

export default JobsDescription

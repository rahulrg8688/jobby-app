import './index.css'

const Skills = props => {
  const {similarJobs, Url} = props
  const {title, jobDescription, location, employmentType} = similarJobs
  //   const {companyUrl} = Url
  return (
    <ul className="similarProducts">
      <ul className="similarTop">
        <img src={Url} className="image" alt={title} />
        <h1>{title}</h1>

        <h4>Description</h4>
        <p>{jobDescription}</p>
        <li className="downSection">
          <p className="location">{location}</p>
          <p>{employmentType}</p>
        </li>
      </ul>
    </ul>
  )
}
export default Skills

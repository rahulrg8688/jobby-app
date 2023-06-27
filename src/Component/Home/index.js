import {Link} from 'react-router-dom'
import Header from '../header'

import './index.css'

const Home = () => (
  <div>
    <ul>
      <Header />
    </ul>
    <ul className="HomeComponent">
      <ul className="HomeCompoHeading">
        <h1>Find the jobs that fits your life</h1>
      </ul>
      <p>
        Millions of people are searching for jobs,salary,Find your jobs that
        fits your abilities
      </p>
      <Link to="/jobs">
        <button type="button" className="FindJobsButton">
          Find jobs
        </button>
      </Link>
    </ul>
  </div>
)
export default Home

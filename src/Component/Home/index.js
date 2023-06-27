import {Link} from 'react-router-dom'
import Header from '../header'

const Home = () => (
  <div>
    <ul>
      <Header />
    </ul>
    <h1>Find the jobs that fits your life</h1>
    <p>
      Millions of people are searching for jobs,salary,Find your jobs that fits
      your abilities
    </p>
    <Link to="/jobs">
      <button type="button">Find jobs</button>
    </Link>
  </div>
)
export default Home

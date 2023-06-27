import {Route, Switch} from 'react-router-dom'
import Login from './Component/Login'
import jobs from './Component/jobs'
import Home from './Component/Home'
import ProtectedRoute from './Component/ProtectedRoute'
import JobsItemDetails from './Component/JobsItemDetails'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
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

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/Login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/Jobs" component={jobs} />
    <Route exact path="/jobs/:id" component={JobsItemDetails} />
  </Switch>
)
export default App

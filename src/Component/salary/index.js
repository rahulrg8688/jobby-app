const Salary = props => {
  const {
    EmploymentType,
    EmploymentId,
    SortEmployee,
    salaryRangesList,
    changeSalary,
  } = props

  const onChangeEmployee = event => {
    SortEmployee(event.target.value)
    console.log(event.target.value)
  }

  const OnchangeSalary = event => {
    changeSalary(event.target.value)
    console.log(event.target.value)
  }

  return (
    <ul>
      {EmploymentType.map(each => (
        <ul>
          <input
            type="radio"
            id={each.employmentTypeId}
            name="salary"
            value={each.employmentTypeId}
            onChange={onChangeEmployee}
          />
          <label htmlFor={each.employmentTypeId}>{each.label}</label>
        </ul>
      ))}
      <ul>
        {salaryRangesList.map(each => (
          <ul>
            <input
              type="radio"
              id={each.salaryRangeId}
              name="salary"
              value={each.salaryRangeId}
              onChange={OnchangeSalary}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </ul>
        ))}
      </ul>
    </ul>
  )
}

export default Salary

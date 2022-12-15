import ProfileDetails from '../ProfileDetails'
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

const JobsFilterSection = props => {
  const employmentSection = () => (
    <>
      <ul className="filter-container">
        {employmentTypesList.map(employType => {
          const {changeEmployment} = props

          return (
            <li
              className="filter-list"
              key={employType.employmentTypeId}
              onChange={changeEmployment}
            >
              <input
                type="checkbox"
                id={employType.employmentTypeId}
                className="filter-input"
                value={employType.employmentTypeId}
              />
              <label
                htmlFor={employType.employmentTypeId}
                className="filter-style"
              >
                {employType.label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )

  const salarySection = () => (
    <>
      <ul className="filter-container">
        {salaryRangesList.map(salaryType => {
          const {changeSalary} = props

          const onChangeSalaryType = () =>
            changeSalary(salaryType.salaryRangeId)

          return (
            <li className="filter-list" key={salaryType.salaryRangeId}>
              <input
                type="radio"
                id={salaryType.salaryRangeId}
                className="filter-input"
                onChange={onChangeSalaryType}
                name="salary"
              />
              <label
                htmlFor={salaryType.salaryRangeId}
                className="filter-style"
              >
                {salaryType.label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )

  return (
    <>
      <div className="jobs-filter-container">
        <ProfileDetails />
        <hr className="hr-line" />
        <h1 className="filter-heading">Type of Employment</h1>
        {employmentSection()}
        <hr className="hr-line" />
        <h1 className="filter-heading">Salary Range</h1>
        {salarySection()}
      </div>
    </>
  )
}

export default JobsFilterSection

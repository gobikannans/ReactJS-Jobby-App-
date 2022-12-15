import './index.css'

const SkillsCard = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails

  return (
    <li className="skill-list">
      <img src={imageUrl} alt={name} className="skill-logo" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillsCard

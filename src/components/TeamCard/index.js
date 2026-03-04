import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {details} = props
  const {id, teamImageUrl, name} = details
  return (
    <Link to={`/team-matches/${id}`} className="team-card-link">
      <li className="team-card-container">
        <img src={teamImageUrl} alt={name} className="team-image"/>
        <p className="team-card-heading">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard

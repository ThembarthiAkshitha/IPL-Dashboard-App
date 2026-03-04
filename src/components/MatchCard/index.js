import './index.css'

const MatchCard = props => {
  const {details} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = details
  const colorStyle = matchStatus === 'Won' ? 'won-color' : 'lose-color'
  return (
    <li className="match-card-item-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-image"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={`${colorStyle}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

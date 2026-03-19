import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import {Link} from 'react-router-dom'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    dataList: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
      },
      recentMatches: data.recent_matches.map(each => ({
        id: each.id,
        competingTeamLogo: each.competing_team_logo,
        competingTeam: each.competing_team,
        result: each.result,
        matchStatus: each.match_status,
      })),
    }
    this.setState({
      dataList: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {dataList, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = dataList
    return (
      <>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-match-details-bg-container">
            <img
              src={teamBannerUrl}
              className="team-banner"
              alt="team banner"
            />
            <h1 className="team-matches-latest-matches-heading">
              Latest Matches
            </h1>
            <LatestMatch details={latestMatchDetails} />
            <ul className="match-card-container">
              {recentMatches.map(each => (
                <MatchCard details={each} key={each.id} />
              ))}
            </ul>
            <Link to="/">
              <button className="back-btn" type="button">
                Back
              </button>
            </Link>
          </div>
        )}
      </>
    )
  }
}

export default TeamMatches

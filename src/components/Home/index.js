import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    isLoading: true,
    iplTeamList: [],
  }

  componentDidMount() {
    this.getIplList()
  }

  getIplList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const updatedList = teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    console.log(teams)
    this.setState({
      isLoading: false,
      iplTeamList: updatedList,
    })
  }

  render() {
    const {isLoading, iplTeamList} = this.state
    return (
      <>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="ipl-main-bg-container">
            <div className="ipl-heading-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="ipl-image"
              />
              <h1 className="ipl-main-heading">IPL Dashboard</h1>
            </div>
            <ul className="unordered-list-container">
              {iplTeamList.map(each => (
                <TeamCard details={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default Home

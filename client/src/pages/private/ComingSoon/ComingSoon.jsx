import React, { Component } from "react";
import { Link } from "react-router-dom";
import GamesService from "./../../../services/games.service"

export default class ComingSoon extends Component {
  constructor() {
    super();
    this.service = new GamesService();

    this.state = {
      releases7DaysAgo: [],
      releases7Days: [],
      releases14Days: [],
      releases1Month: [],
      releases6Months: [],
      releases1Year: []
    };
  }
  render() {
    return (
      <>
        <h1>Releases</h1>
        {this.render7DaysAgo()}
        {this.render7Days()}
        {this.render14Days()}
        {this.render1Month()}
        {this.render6Months()}
        {this.render1Year()}
      </>
    );
  }

  async loadReleases(period, statePeriod, order = "asc") {
    let released = await this.service.getReleases(20, 0, period, order)

    let newState = {...this.state}
    newState[statePeriod] = released.data
    this.setState(newState)
  }

  render7DaysAgo () {
    return (
      <section>
        <h2>Recently released</h2>
        <ul>
        {this.state.releases7DaysAgo.length > 0
        ? this.state.releases7DaysAgo.map(game => {
          return (
            <li key={game.id}>
              {`${game.name} (${new Date(game.first_release_date * 1000).toDateString()})`}
            </li>
          )
        })
        : <p>Loading...</p>
    }
      </ul>
      </section>
    )
  }

  render7Days () {
    return (
      <section>
        <h2>Next 7 days</h2>
        <ul>
        {this.state.releases7Days.length > 0
        ? this.state.releases7Days.map(game => {
          return (
            <li key={game.id}>
              {`${game.name} (${new Date(game.first_release_date * 1000).toDateString()})`}
            </li>
          )
        })
        : <p>Loading...</p>
    }
      </ul>
      </section>
    )
  }

  render14Days () {
    return (
      <section>
        <h2>Next 14 days</h2>
        <ul>
        {this.state.releases14Days.length > 0
        ? this.state.releases14Days.map(game => {
          return (
            <li key={game.id}>
              {`${game.name} (${new Date(game.first_release_date * 1000).toDateString()})`}
            </li>
          )
        })
        : <p>Loading...</p>
    }
      </ul>
      </section>
    )
  }

  render1Month () {
    return (
      <section>
        <h2>Next 30 days</h2>
        <ul>
        {this.state.releases1Month.length > 0
        ? this.state.releases1Month.map(game => {
          return (
            <li key={game.id}>
              {`${game.name} (${new Date(game.first_release_date * 1000).toDateString()})`}
            </li>
          )
        })
        : <p>Loading...</p>
    }
      </ul>
      </section>
    )
  }

  render6Months () {
    return (
      <section>
        <h2>Next 6 months</h2>
        <ul>
        {this.state.releases6Months.length > 0
        ? this.state.releases6Months.map(game => {
          return (
            <li key={game.id}>
              {`${game.name} (${new Date(game.first_release_date * 1000).toDateString()})`}
            </li>
          )
        })
        : <p>Loading...</p>
    }
      </ul>
      </section>
    )
  }

  render1Year () {
    return (
      <section>
        <h2>Next year</h2>
        <ul>
        {this.state.releases1Year.length > 0
        ? this.state.releases1Year.map(game => {
          return (
            <li key={game.id}>
              {`${game.name} (${new Date(game.first_release_date * 1000).toDateString()})`}
            </li>
          )
        })
        : <p>Loading...</p>
    }
      </ul>
      </section>
    )
  }

  async componentDidMount() {
    this.loadReleases(1, "releases7DaysAgo", "desc")
    this.loadReleases(2, "releases7Days")
    this.loadReleases(3, "releases14Days")
    this.loadReleases(4, "releases1Month")
    this.loadReleases(5, "releases6Months")
    this.loadReleases(6, "releases1Year")
  }
}
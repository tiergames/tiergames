import React, { Component } from "react";
import { Link } from "react-router-dom";
import GamesService from "./../../../services/games.service";

export default class ComingSoon extends Component {
  constructor(props) {
    super(props);
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

  render7DaysAgo() {
    return (
      <section>
        <h2>Recently released</h2>

        {
          <ul>
            {this.props.releases.releases7DaysAgo.isLoading7DaysAgo ? (
              <p>Loading...</p>
            ) : this.props.releases.releases7DaysAgo.releases7DaysAgo.length >
              0 ? (
              this.props.releases.releases7DaysAgo.releases7DaysAgo.map(
                release => {
                  return (
                    <li key={release.id}>
                      {`${release.name} (${new Date(
                        release.first_release_date * 1000
                      ).toDateString()})`}
                    </li>
                  );
                }
              )
            ) : (
              <p>No recent releases</p>
            )}
          </ul>
        }
      </section>
    );
  }

  render7Days() {
    return (
      <section>
        <h2>Next 7 days</h2>
        {
          <ul>
            {this.props.releases.releases7Days.isLoading7Days ? (
              <p>Loading...</p>
            ) : this.props.releases.releases7Days.releases7Days.length > 0 ? (
              this.props.releases.releases7Days.releases7Days.map(release => {
                return (
                  <li key={release.id}>
                    {`${release.name} (${new Date(
                      release.first_release_date * 1000
                    ).toDateString()})`}
                  </li>
                );
              })
            ) : (
              <p>No recent releases</p>
            )}
          </ul>
        }
      </section>
    );
  }

  render14Days() {
    return (
      <section>
        <h2>Next 14 days</h2>
        {
          <ul>
            {this.props.releases.releases14Days.isLoading14Days ? (
              <p>Loading...</p>
            ) : this.props.releases.releases14Days.releases14Days.length > 0 ? (
              this.props.releases.releases14Days.releases14Days.map(release => {
                return (
                  <li key={release.id}>
                    {`${release.name} (${new Date(
                      release.first_release_date * 1000
                    ).toDateString()})`}
                  </li>
                );
              })
            ) : (
              <p>No releases for the next 14 days</p>
            )}
          </ul>
        }
      </section>
    );
  }

  render1Month() {
    return (
      <section>
        <h2>Next 30 days</h2>
        {
          <ul>
            {this.props.releases.releases1Month.isLoading1Month ? (
              <p>Loading...</p>
            ) : this.props.releases.releases1Month.releases1Month.length > 0 ? (
              this.props.releases.releases1Month.releases1Month.map(release => {
                return (
                  <li key={release.id}>
                    {`${release.name} (${new Date(
                      release.first_release_date * 1000
                    ).toDateString()})`}
                  </li>
                );
              })
            ) : (
              <p>No releases for the next 30 days</p>
            )}
          </ul>
        }
      </section>
    );
  }

  render6Months() {
    return (
      <section>
        <h2>Next 6 months</h2>
        {
          <ul>
            {this.props.releases.releases6Months.isLoading6Months ? (
              <p>Loading...</p>
            ) : this.props.releases.releases6Months.releases6Months.length >
              0 ? (
              this.props.releases.releases6Months.releases6Months.map(game => {
                return (
                  <li key={game.id}>
                    {`${game.name} (${new Date(
                      game.first_release_date * 1000
                    ).toDateString()})`}
                  </li>
                );
              })
            ) : (
              <p>No releases for the next 6 months</p>
            )}
          </ul>
        }
      </section>
    );
  }

  render1Year() {
    return (
      <section>
        <h2>Next year</h2>
        {
          <ul>
            {this.props.releases.releases1Year.isLoading1Year ? (
              <p>Loading...</p>
            ) : this.props.releases.releases1Year.releases1Year.length > 0 ? (
              this.props.releases.releases1Year.releases1Year.map(release => {
                return (
                  <li key={release.id}>
                    {`${release.name} (${new Date(
                      release.first_release_date * 1000
                    ).toDateString()})`}
                  </li>
                );
              })
            ) : (
              <p>No releases for next year</p>
            )}
          </ul>
        }
      </section>
    );
  }
}

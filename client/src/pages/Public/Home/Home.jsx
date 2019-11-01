import React, { Component } from 'react'
import Tile from '../../../components/Tile/Tile';

export default class Home extends Component {

  render() {
    return (
      <section className="landing">
        {this.render7DaysAgo()}
        {this.render7Days()}
        {this.render14Days()}
        {this.render1Month()}
        {this.render6Months()}
        {this.render1Year()}
      </section>
    );
  }

  render7DaysAgo() {
    return (
      <section className="home-section animated fadeIn">
        <h2 className="section-title">Recently released</h2>
        {
          <ul className="tile-list">
            {this.props.releases.releases7DaysAgo.isLoading7DaysAgo ? (
              <p>Loading...</p>
            ) : this.props.releases.releases7DaysAgo.releases7DaysAgo.length >
              0 ? (
              this.props.releases.releases7DaysAgo.releases7DaysAgo.map(
                release => {
                  return (
                    <Tile key={release.id} type="game" tileInfo={release} />
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
      <section className="home-section animated fadeIn">
        <h2 className="section-title">Next 7 days</h2>
        {
          <ul className="tile-list">
            {this.props.releases.releases7Days.isLoading7Days ? (
              <p>Loading...</p>
            ) : this.props.releases.releases7Days.releases7Days.length > 0 ? (
              this.props.releases.releases7Days.releases7Days.map(release => {
                return (
                  <Tile key={release.id} type="game" tileInfo={release} />
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
      <section className="home-section animated fadeIn">
        <h2 className="section-title">Next 14 days</h2>
        {
          <ul className="tile-list">
            {this.props.releases.releases14Days.isLoading14Days ? (
              <p>Loading...</p>
            ) : this.props.releases.releases14Days.releases14Days.length > 0 ? (
              this.props.releases.releases14Days.releases14Days.map(release => {
                return (
                  <Tile key={release.id} type="game" tileInfo={release} />
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
      <section className="home-section animated fadeIn">
        <h2 className="section-title">Next 30 days</h2>
        {
          <ul className="tile-list">
            {this.props.releases.releases1Month.isLoading1Month ? (
              <p>Loading...</p>
            ) : this.props.releases.releases1Month.releases1Month.length > 0 ? (
              this.props.releases.releases1Month.releases1Month.map(release => {
                return (
                  <Tile key={release.id} type="game" tileInfo={release} />
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
      <section className="home-section animated fadeIn">
        <h2 className="section-title">Next 6 months</h2>
        {
          <ul className="tile-list">
            {this.props.releases.releases6Months.isLoading6Months ? (
              <p>Loading...</p>
            ) : this.props.releases.releases6Months.releases6Months.length >
              0 ? (
              this.props.releases.releases6Months.releases6Months.map(release => {
                return (
                  <Tile key={release.id} type="game" tileInfo={release} />
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
      <section className="home-section animated fadeIn">
        <h2 className="section-title">Next year</h2>
        {
          <ul className="tile-list">
            {this.props.releases.releases1Year.isLoading1Year ? (
              <p>Loading...</p>
            ) : this.props.releases.releases1Year.releases1Year.length > 0 ? (
              this.props.releases.releases1Year.releases1Year.map(release => {
                return (
                  <Tile key={release.id} type="game" tileInfo={release} />
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

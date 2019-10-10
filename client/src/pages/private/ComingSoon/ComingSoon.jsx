import React, { Component } from "react";
import { Link } from "react-router-dom";
import ComingService from "./../../../services/coming.service";

export default class ComingSoon extends Component {
  constructor() {
    super();
    this.service = new ComingService();

    this.state = {
      comingSoon: []
    };
  }
  render() {
    return (
      <div>
        <h1>Coming soon</h1>

        <ul className="best-rated-list">
          {this.state.comingSoon.length > 0
            ? this.state.comingSoon.map(game => {
                return (
                  <li key={game.id}>
                    {game.name}
                        {new Date(game.first_release_date * 1000) > new Date() ? (
                          <span>Coming Soon!</span>
                        ) : (
                          ""
                        )}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }

  async componentDidMount() {
    const comingGames = await this.service.coming();
    this.setState({
      ...this.state,
      comingSoon: comingGames
    });
  }
}

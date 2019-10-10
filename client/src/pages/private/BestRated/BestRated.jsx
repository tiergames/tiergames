import React, { Component } from "react";
import { Link } from "react-router-dom";
import BestRatedService from "./../../../services/best-rated.service";

export default class BestRated extends Component {
  constructor() {
    super();
    this.service = new BestRatedService();

    this.state = {
      bestRated: []
    };
  }

  render() {
    return (
      <div>
        <h1>Best-Rated Games</h1>
        <ul className="best-rated-list">
          {this.state.bestRated.length > 0
            ? this.state.bestRated.map(game => {
                return (
                  <li key={game.id}>
                    {game.name} ({game.rating})
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }

  async componentDidMount() {
    let bestRatedGames = await this.service.bestRated();
    this.setState({
      ...this.state,
      bestRated: bestRatedGames
    });
  }
}

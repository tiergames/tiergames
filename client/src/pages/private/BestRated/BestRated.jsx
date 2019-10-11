import React, { Component } from "react";
import { Link } from "react-router-dom";
import GamesService from "./../../../services/games.service";

export default class BestRated extends Component {
  constructor() {
    super();
    this.service = new GamesService();

    this.state = {
      bestRated: []
    };
  }

  render() {
    return (
      <section>
        <h1>Best rated Games</h1>
        <ul className="best-rated-list">
          {this.state.bestRated.length > 0
            ? this.state.bestRated.map(game => {
                return (
                  <li key={game.id}>
                    {game.name} ({((game.rating * 5) / 100).toFixed(1)})
                  </li>
                );
              })
            : <p>Loading...</p>
            }
        </ul>
      </section>
    );
  }

  async loadBestRatedGames(order = "desc") {
    let bestRatedGames = await this.service.getBestRated(20, 0, order);

    let newState = { ...this.state };
    newState.bestRated = bestRatedGames.data;
    this.setState(newState);
  }

  async componentDidMount() {
    this.loadBestRatedGames();
  }
}

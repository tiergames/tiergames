import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BestRated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bestRated: props.bestRated
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
                    <Link to={`/games/${game.id}`}>{game.name} ({((game.rating * 5) / 100).toFixed(1)})</Link>
                  </li>
                );
              })
            : <p>Loading...</p>
            }
        </ul>
      </section>
    );
  }
}

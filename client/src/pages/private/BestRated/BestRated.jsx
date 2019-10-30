import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BestRated extends Component {
  
  render() {
    return (
      <section>
        <h1>Best rated Games</h1>
        <ul className="best-rated-list">
          {this.props.bestRated.length > 0
            ? this.props.bestRated.map(game => {
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

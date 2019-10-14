import React, { Component } from "react";
import ReviewsService from "./../../../services/reviews.service";
import ReviewTile from "../../../components/ReviewTile/ReviewTile";
import Platforms from "../../../components/Platforms/Platforms";

export default class Reviews extends Component {
  constructor(props) {
    super();
    this.reviewsService = new ReviewsService();
    this.state = {
      reviews: [],
      isLoadingReviews: true
    };
  }

  render() {
    return (
      <div>
        {console.log("Rendering", this.state.reviews)}
        {this.renderReviews()}
      </div>
    );
  }

  componentDidMount() {
    this.loadReviews(0, 10);
  }

  async loadReviews(offset, limit) {
    let reviews = await this.reviewsService.getReviews(offset, limit);
    console.log("Reviews loaded...", reviews);
    this.setState({
      ...this.state,
      reviews: reviews,
      isLoadingReviews: false
    });
  }

  renderReviews() {
    return (
      <section>
        <h2>Reviews</h2>

        <Platforms />
        <ul>
          {this.state.reviews.length > 0
            ? this.state.reviews.map(review => {
                return <ReviewTile key={review._id} gameTile={review} />;
              })
            : null}
        </ul>
        {this.state.isLoadingReviews ? <p>Loading...</p> : <p>Load more</p>}
      </section>
    );
  }
}

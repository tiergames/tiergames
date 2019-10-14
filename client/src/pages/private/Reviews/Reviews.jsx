import React, { Component } from 'react'
import ReviewsService from './../../../services/reviews.service'
import ReviewTile from '../../../components/ReviewTile/ReviewTile'
import { Link } from 'react-router-dom'
import PlatformsTags from './../../../components/PlatformsTags/PlatformsTags'

export default class Reviews extends Component {
  constructor(props) {
    super(props)
    this.reviewsService = new ReviewsService()
    this.state = {
      reviews: props.reviews
    }
  }

  render() {
    return (
      <div>
        {this.renderReviews()}
      </div>
    );
  }

  componentDidMount() {
    // this.loadReviews(0, 10)
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
    console.log("THE REVIEWS", this.state)
    return (
      <section>
        <h2>Reviews</h2>

        {/* <PlatformsTags /> */}
        <ul>
          {this.state.reviews.reviewsFiltered.length > 0
            ?
              this.state.reviews.reviewsFiltered.map(review => {
                return <ReviewTile key={review._id} gameTile={review} />
              })
            : null}
        </ul>
        {this.state.reviews.isLoadingReviews
          ?
            <p>Loading...</p>
          :
            <Link to={"#"} onClick={this.props.handleLoadMore}>Load more</Link>
        }
      </section>
    );
  }
}

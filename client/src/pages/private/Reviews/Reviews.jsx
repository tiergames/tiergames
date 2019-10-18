import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReviewsService from './../../../services/reviews.service'
import ReviewTile from '../../../components/ReviewTile/ReviewTile'
import PlatformsTags from './../../../components/PlatformsTags/PlatformsTags'

export default class Reviews extends Component {
  constructor(props) {
    super(props)
    this.reviewsService = new ReviewsService()
    this.state = {
      reviews: props.reviews,
      platforms: props.platforms
    }
  }

  render() {
    return (
      <div>
        {this.renderNewReviewLink()}
        {this.renderReviews()}
      </div>
    );
  }

  componentDidMount() {
    // this.loadReviews(0, 10)
  }  

  async loadReviews(offset, limit) {
    let reviews = await this.reviewsService.getReviews(offset, limit);
    this.setState({
      ...this.state,
      reviews: reviews,
      isLoadingReviews: false
    });
  }

  renderNewReviewLink() {
    return <Link to={"/reviews/create"}>Create review</Link>
  }

  renderReviews() {

    const { platforms: {platforms} } = this.state;

    return (
      <section>
        <h2 className="section-title">Reviews</h2>

        <PlatformsTags platforms={platforms} type="radio" />

        <ul>
          {this.state.reviews.reviewsFiltered.length > 0
            ?
              this.state.reviews.reviewsFiltered.map(review => {
                return (
                  <Link key={review._id} to={`/reviews/${review._id}`}>
                    <ReviewTile gameTile={review} />
                  </Link>
                )
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

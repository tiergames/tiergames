import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReviewsService from './../../../services/reviews.service'
import ReviewTile from '../../../components/ReviewTile/ReviewTile'
// import PlatformsTags from './../../../components/PlatformsTags/PlatformsTags'

export default class Reviews extends Component {
  constructor(props) {
    super(props)
    this.reviewsService = new ReviewsService()
  }

  render() {
    return (
      <div>
        {/* {this.renderNewReviewLink()} */}
        {this.renderReviews()}
      </div>
    );
  }

  renderNewReviewLink() {
    return <Link to={"/reviews/create"}>Create review</Link>
  }

  renderReviews() {
    // const { platforms: {platforms} } = this.props;

    return (
      <section>
        <h2 className="section-title">Reviews</h2>

        {/* TODO: In the future */}
        {/* <PlatformsTags platforms={platforms} type="radio" /> */}

        <ul>
          {this.props.reviews.reviewsFiltered.length > 0
            ?
              this.props.reviews.reviewsFiltered.map(review => {
                return (
                  <Link key={review._id} to={`/reviews/${review._id}`}>
                    <ReviewTile gameTile={review} />
                  </Link>
                )
              })
            : null}
        </ul>
        {this.props.reviews.isLoadingReviews
          ?
            <p>Loading...</p>
          :
            <Link to={"#"} onClick={this.props.handleLoadMore}>Load more</Link>
        }
      </section>
    );
  }
}

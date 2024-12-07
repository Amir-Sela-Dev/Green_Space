import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { loadUser } from '../store/user.actions'
import { loadReviews, addReview, removeReview } from '../store/review.actions.js'
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { reviewService } from "../services/review.service"

export function UserDetails() {

  const params = useParams()
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)

  useEffect(() => {
    loadUser(params.id)
    onLoadReviews()
  }, [])

  function onLoadReviews() {
    let filterBy = reviewService.getDefultReviewFilter()
    filterBy.byUserId = params.id
    loadReviews(filterBy)
  }
  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
  }


  return (
    <section className="user-details">
      <h1>User Details</h1>
      {user && <div>
        <h3 className='user-name'>
          {user.fullname}
        </h3>

        {/* Demo for dynamic images: */}
        <img src={user.imgUrl} alt="" />
        <div className="user-img" style={{ backgroundImage: `url('/img/u${0}.png')` }}>
        </div>
        <h3>
          balance: {user.score}
        </h3>
        {(reviews.length > 0) && <div className="review-container">
          <h1>User reviews</h1>
          <ul className="review-list">
            {reviews.map(review => (
              <li key={review._id}>
                {canRemove(review) &&
                  <button onClick={() => onRemove(review._id)}>X</button>}
                <p>
                  About:
                  <Link to={`/plant/${review.aboutPlant._id}`}>
                    {review.aboutPlant.fullname}
                  </Link>
                </p>
                <h3>{review.txt}</h3>
                <p>
                  By:
                  <Link to={`/user/${review.byUser._id}`}>
                    {review.byUser.fullname}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </div>}

        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>}
    </section>
  )
}
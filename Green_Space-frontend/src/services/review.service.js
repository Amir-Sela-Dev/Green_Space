import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { plantService } from './plant.service.js'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
// import { getActionRemoveReview, getActionAddReview } from '../store/review.actions'
// import { store } from '../store/store'
// import { showSuccessMsg } from '../services/event-bus.service'

// ;(() => {
//   socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//     console.log('GOT from socket', review)
//     store.dispatch(getActionAddReview(review))
//   })
//   socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//     showSuccessMsg(`New review about me ${review.txt}`)
//   })
// })()


export const reviewService = {
  add,
  query,
  remove,
  getDefultReviewFilter
}

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?aboutPlantId=${filterBy.aboutPlantId}&byUserId=${filterBy.byUserId}`
  return httpService.get(`review${queryStr}`)
  // return storageService.query('review')
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
}

async function add({ txt, aboutPlantId }) {
  const addedReview = await httpService.post(`review`, { txt, aboutPlantId })

  // const aboutPlant = await plantService.get(aboutPlantId)
  // console.log('aboutPlant', aboutPlant);
  // const reviewToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutPlant: {
  //     _id: aboutPlant._id,
  //     name: aboutPlant.name,
  //     imgUrl: aboutPlant.imgUrl,
  //     price: aboutPlant.price
  //   }
  // }

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

function getDefultReviewFilter() {
  return { byUserId: '', aboutPlantId: '' }
}
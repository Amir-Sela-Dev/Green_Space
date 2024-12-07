import React from 'react';

import { plantService } from "../services/plant.service.local.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { loadPlant } from "../store/plant.action.js"
import { useDispatch, useSelector } from 'react-redux'
import { loadReviews, addReview, removeReview } from '../store/review.actions.js'
import { reviewService } from '../services/review.service.js';
import { ChatRoom } from '../cmps/chat-room.jsx';

export function PlantDetails() {
    // const [plant, setPlant] = useState(null)
    let { plant } = useSelector((storeState) => storeState.plantModule)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutPlantId: '' })
    const [isChatOpen, setIsChatOpen] = useState(false)

    const { plantId } = useParams()
    const navigate = useNavigate()

    let imgUrl;
    try {
        imgUrl = require(`../assets/img/${plant.imgName}.png`);
    } catch {
        imgUrl = require('../assets/img/Ficus benjamina.png'); // Default fallback image
    }


    useEffect(() => {
        loadPlant(plantId)
        onLoadReviews()
    }, [])

    function onLoadReviews() {
        let filterBy = reviewService.getDefultReviewFilter()
        filterBy.aboutPlantId = plantId
        loadReviews(filterBy)
    }


    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        reviewToEdit.aboutPlantId = plantId
        if (!reviewToEdit.txt || !reviewToEdit.aboutPlantId) return alert('All fields are required')
        try {
            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '', aboutPlantId: '' })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
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







    if (!plant) return <div>Loading...</div>

    const { name, price, _id } = plant

    return <section className="plant-details">
        <h1>Plant vendor : {name}</h1>
        <h3>Price: ${price}</h3>
        <img src={imgUrl} />
        <p>{plant.description}</p>
        <Link to={`/plant/edit/${_id}`}>Edit</Link>

        {(reviews.length > 0) && <div className="review-container">
            <h1>Reviews</h1>
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
        <h1>Add review</h1>

        {(loggedInUser) &&
            <form onSubmit={onAddReview}>
                <textarea
                    name="txt"
                    onChange={handleChange}
                    value={reviewToEdit.txt}
                ></textarea>
                <button>Add</button>
            </form>}

        {(isChatOpen) && <ChatRoom plantId={plantId} setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} plant={plant} />
        }
        {(!isChatOpen) &&
            <div className="chat-img" onClick={() => { setIsChatOpen(!isChatOpen) }}>
            </div>
        }


    </section>
}
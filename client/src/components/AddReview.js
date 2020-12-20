import React, { useState } from "react";
import { useParams,useLocation,useHistory } from "react-router-dom";
import RestaurantFinder from '../apis/RestaurantFinder';
const AddReview = () => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");
  const { id } = useParams();
  const history=useHistory();
  const location=useLocation();

  console.log(id);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const handleRatingChange = (event) => {
    console.log(event.target.value);
    setRating(event.target.value);
  };

  const handleReviewTextChange = (event) => {
    console.log(event.target.value);
    setReviewText(event.target.value);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
        const newReview=await RestaurantFinder.post(`/${id}/addReview`,{
            name:name,
            review:reviewText,
            rating:rating
        })
        history.push("/")
        history.push(location.pathname)
        console.log(newReview)
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="mb-2">
      <form>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              id="name"
              type="text"
              placeholder="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="custom-select"
              value={rating}
              onChange={handleRatingChange}
            >
              <option disabled={true}>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            id="Review"
            className="form-control"
            value={reviewText}
            onChange={handleReviewTextChange}
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;

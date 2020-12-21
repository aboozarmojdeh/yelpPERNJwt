import React, { Fragment, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import { RestaurantsContext } from '../context/RestaurantsContext';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';
const RestaurantDetailPage = () => {

    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {
        try {
            const fetchData = async () => {

                const response = await RestaurantFinder.get(`/${id}`);
                console.log(response.data.data)
                setSelectedRestaurant(response.data.data)

                // const response2 = await RestaurantFinder.get(`/${id}/reviews`);
                // console.log(response2.data.data.reviews)
                // setSelectedRestaurant(response1.data.data.restaurant)
            }
            fetchData();

        } catch (err) {
            console.error(err.message)
        }


    }, [])
    return (
        <div>{selectedRestaurant && (
            <Fragment>
                <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
                <div className='text-center'>
                    <StarRating rating={selectedRestaurant.restaurant.average_rating} />
                    <span className="text-warning ml-1">
                        {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}

                    </span>
                </div>
                <div className='mt-3'>
                    <Reviews reviews={selectedRestaurant.reviews} />

                </div>
                <AddReview />
            </Fragment>
        )}


        </div>
    )
}

export default RestaurantDetailPage

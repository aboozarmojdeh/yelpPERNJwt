import React, { useEffect, useContext, Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from './StarRating';
const RestaurantList = (props) => {
    let history = useHistory();
    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await RestaurantFinder.get('/');
                setRestaurants(response.data.data.restaurants)
                console.log(response.data.data.restaurants)
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchData();
    }, []);

    const handleDeleteRestaurant = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter((restaurant) => {
                return restaurant.id !== id
            }))
        } catch (err) {
            console.error(err.message)
        }

    };

    const handleUpdateRestaurant = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }
    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return (
                <span className="text-warning">0 reviews</span>
            )
        }
        return (
            <Fragment>
                <StarRating rating={restaurant.average_rating} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </Fragment>
        )
    }
    const restaurantArray = restaurants.map((restaurant) => {
        return (
            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td><button onClick={(e) => handleUpdateRestaurant(e, restaurant.id)} className='btn btn-warning'>Update</button></td>
                <td><button onClick={(e) => handleDeleteRestaurant(e, restaurant.id)} className='btn btn-danger'>Delete</button></td>
            </tr>
        )
    })



    return (
        <div className='list-group'>
            <table className="table table-dark table-hover">
                <thead>
                    <tr className='bg-primary'>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurantArray}
                    {/* <tr>
      
      <td>McDonalds</td>
      <td>Richmond Hill</td>
      <td>$$$</td>
      <td>Ratings</td>
      <td><button className='btn btn-warning'>Update</button></td>
      <td><button className='btn btn-danger'>Delete</button></td>
    </tr>
    <tr>
      
      <td>Tim Hortons</td>
      <td>Thornhill</td>
      <td>$$$$$</td>
      <td>Ratings</td>
      <td><button className='btn btn-warning'>Update</button></td>
      <td><button className='btn btn-danger'>Delete</button></td>
    </tr>
     */}

                </tbody>
            </table>

        </div>
    )
}

export default RestaurantList

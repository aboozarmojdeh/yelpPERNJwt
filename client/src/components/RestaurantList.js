import React, { useEffect, useContext, Fragment,useState } from "react";
import { useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";
const RestaurantList = (props) => {
  let history = useHistory();
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [facePhoto,setFacePhoto]=useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
        console.log(response.data.data.restaurants);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
    console.log('restaurants',restaurants)
    uiFacesFetch(restaurants.length);
  }, []);

  const uiFacesFetch = async (number) => {
    const response = await fetch(
      `https://uifaces.co/api?limit=${number}&gender[]=female&from_age=18&to_age=30`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": ["D3745996-3E2C41D1-9CA9CBE9-554CB42A"],
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    const faces = await response.json();
    setFacePhoto(faces)
    console.log('faces',faces.length)
    
  };

  

//   const faceImage = async () => {
//     uiFacesFetch();
   
//   };

  const handleDeleteRestaurant = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdateRestaurant = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };
  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <Fragment>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </Fragment>
    );
  };
  const restaurantArray = restaurants.map((restaurant,index) => {
    // uiFacesFetch(restaurants.length);
    return (
      <tr
        onClick={() => handleRestaurantSelect(restaurant.id)}
        key={restaurant.id}
      >
        <td>{restaurant.name}</td>
        <td>{restaurant.location}</td>
        <td>{"$".repeat(restaurant.price_range)}</td>
        <td>{renderRating(restaurant)}</td>
        <td>{!facePhoto.length ? <div>Waiting</div>:<img alt='model-face' src={facePhoto[index].photo} style={{borderRadius:'50%'}} width='100px' height='100px'/>}</td>
        <td>
          <button
            onClick={(e) => handleUpdateRestaurant(e, restaurant.id)}
            className="btn btn-warning"
          >
            Update
          </button>
        </td>
        <td>
          <button
            onClick={(e) => handleDeleteRestaurant(e, restaurant.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="list-group">
      <table className="table table-dark table-hover">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Photo</th>
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
  );
};

export default RestaurantList;

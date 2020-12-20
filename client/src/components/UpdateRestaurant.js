import React, { useState, useContext,useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UpdateRestaurant = (props) => {
    const { id } = useParams();
    let history=useHistory();
    const { restaurants } = useContext(RestaurantsContext)
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        const fetchData=async()=>{
            try {
                
                    const response=await RestaurantFinder.get(`/${id}`);
                    
                    console.log(response.data.data.restaurant)
                    setName(response.data.data.restaurant.name)
                    setLocation(response.data.data.restaurant.location)
                    setPriceRange(response.data.data.restaurant.price_range)
                }catch (err) {
                console.error(err.message)
            }}
            fetchData();
    }, [])
    const nameChange = (event) => {
        setName(event.target.value)
    };
    const locationChange = (event) => {
        setLocation(event.target.value)
    };
    const priceChange = (event) => {
        setPriceRange(event.target.value)
    };

    const handleUpdateRestaurant = async(e) => {
e.preventDefault();
const updateRestaurant=await RestaurantFinder.put(`/${id}`,{
    name:name,
    location:location,
    price_range:priceRange
})
history.push('/');
    };
    
    return (
        <div>
        {/* <h1>{restaurants[0].name}</h1> */}
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input value={name} onChange={nameChange} id='name' className='form-control' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input value={location} onChange={locationChange} id='location' className='form-control' type='text' />
                </div>
                <div className='form-group'>
                    <label htmlFor='price_range'>Price Range</label>
                    <input value={priceRange} onChange={priceChange} id='price_range' className='form-control' type='number' />
                </div>
                <button type='submit' onClick={handleUpdateRestaurant} className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant

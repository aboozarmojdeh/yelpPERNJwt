import React, { useState,useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
const AddRestaurant = () => {
    const {addRestaurants}=useContext(RestaurantsContext)
    const [name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ priceRange, setPriceRange ] = useState("Price Range");

    const nameChange = (event) => {
        setName(event.target.value)
    };
    const locationChange = (event) => {
        setLocation(event.target.value)
    };
    const priceChange = (event) => {
        setPriceRange(event.target.value)
    };

    const handleSubmitRestaurant = async(e) => {
        e.preventDefault();
        
        try {
            const addRestaurant=await RestaurantFinder.post('/',{
                name:name,
                location:location,
                price_range:priceRange
            })  
            console.log(addRestaurant)
            addRestaurants(addRestaurant.data.data.restaurant)
        } catch (err) {
            console.error(err.message)
        }
       
    }

    return (
        <div className='mb-4'>
            <form>
                <div className='form-row'>
                    <div className='col'>
                        <input value={name} onChange={nameChange} className='form-control' type='text' placeholder='name' />
                    </div>
                    <div className='col'>
                        <input value={location} onChange={locationChange} className='form-control' type='text' placeholder='location' />
                    </div>
                    <div className='col'>
                        <select value={priceRange} onChange={priceChange} className='custom-select my-1 mr-sm-2'>
                            <option disabled={true}>Price Range</option>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                            <option value='5'>$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" className='btn btn-primary' onClick={handleSubmitRestaurant} >Add</button>
                </div>
            </form>

        </div>
    )
}

export default AddRestaurant

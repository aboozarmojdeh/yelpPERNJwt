const express = require("express");
const pool = require("../db");
const router = express.Router();
const authorization=require('../middleware/authorization');

// get all restaurants
router.get("/", async (req, res) => {
    try {
      const allRestaurants = await pool.query("SELECT * FROM restaurants");
      const restaurantRatingsData = await pool.query(
        "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id,COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id"
      );
      console.log("allRestaurants",allRestaurants.rows);
      console.log("restaurantRatingsData",restaurantRatingsData.rows);
      res.status(200).json({
        status: "success",
        results: restaurantRatingsData.rows.length,
        data: {
          restaurants: restaurantRatingsData.rows,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  // Get a restaurant with reviews
router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await pool.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id,COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE id=$1", [
        id,
      ]);
      const reviews = await pool.query(
        "SELECT * FROM reviews WHERE restaurant_id=$1",
        [id]
      );
      console.log(req.params);
      res.status(200).json({
        status: "success",
        data: {
          restaurant: restaurant.rows[0],
          reviews: reviews.rows,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  // add a restaurant
router.post("/", async (req, res) => {
    try {
      const { name, location, price_range } = req.body;
      const newRestaurant = await pool.query(
        "INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) RETURNING *",
        [name, location, price_range]
      );
      // const createRestaurant=await ...
      console.log(req.body);
      res.status(201).json({
        status: "success",
        data: {
          restaurant: newRestaurant.rows[0],
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a restaurant
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, location, price_range } = req.body;
      const updatedRestaurant = await pool.query(
        "UPDATE restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 RETURNING *",
        [name, location, price_range, id]
      );
      console.log(updatedRestaurant.rows[0]);
      res.status(200).json({
        status: "success",
        data: {
          restaurant: updatedRestaurant.rows[0],
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  // delete  restaurant
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRestaurant = await pool.query(
        "DELETE FROM restaurants WHERE id=$1",
        [id]
      );
      res.status(204).json({
        status: "success",
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  // Add a review to restaurant
router.post("/:id/addReview", async (req, res) => {
    try {
      const { id } = req.params;
      const { restaurant_id, name, review, rating } = req.body;
      const newReview = await pool.query(
        "INSERT INTO reviews (restaurant_id,name, review,rating) VALUES ($1,$2,$3,$4) RETURNING *",
        [id, name, review, rating]
      );
  
      res.status(201).json({
        status: "success",
        data: {
          review: newReview.rows[0],
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });

module.exports = router;
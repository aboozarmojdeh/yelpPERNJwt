const express = require("express");
const pool = require("../db");
const router = express.Router();
const authorization=require('../middleware/authorization');

router.get('/', async(req,res)=>{
    try {
        // res.json(req.user) //req.user=user_id
        const {modelName}=req.query;
        console.log(req.query)
        // const user=await pool.query("SELECT user_name FROM users WHERE user_id=$1",[req.user]);
        const models=await pool.query("SELECT * FROM models WHERE first_name || ' ' || last_name ILIKE $1",[`%${modelName}%`])
        // res.json(user.rows[0])
        // res.json(models.rows)
        res.json(models.rows);
    } catch (err) {
        console.error(err.message)
        res.status(500).json("server error")
    }
})
module.exports = router;
const express = require("express");
const pool = require("../db");
const router = express.Router();
const authorization=require('../middleware/authorization');

router.get('/',authorization, async(req,res)=>{
    try {
        // res.json(req.user) //req.user=user_id
        
        const user=await pool.query("SELECT user_name FROM users WHERE user_id=$1",[req.user]);
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json("server error")
    }
})
module.exports = router;
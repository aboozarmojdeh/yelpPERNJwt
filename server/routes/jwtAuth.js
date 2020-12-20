const express = require("express");
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization =require('../middleware/authorization');



// register route
router.post('/register', validInfo, async (req, res) => {
    try {
        // 1. destructure req.body {name,email,password}
        const { name, email, password } = req.body;
        // 2. chech user exists (if yes throw an error) 
        const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [email])
        // res.json(user.rows)
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists")
        }
        // 3. Bcrypt the user_password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(bcryptPassword)
        // res.send(bcryptPassword)
        // 4. Enter new user into database
        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *", [name, email, bcryptPassword])
        // res.json(newUser.rows[0])
        // 5. generating out jwt Token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

// Login route
router.post('/login', validInfo, async (req, res) => {
    try {
        // 1. destructure req.body
        const { email, password } = req.body;

        // 2. check iif user does'nt exist(if not then throw an error)
        const user = await pool.query('SELECT * FROM users WHERE user_email=$1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Username or Password is incorrect")
        }
        // 3. check if incoming password is the same as database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        console.log(validPassword)
        if (!validPassword) {
            return res.status(401).json("Username or Password is incorrect")
        }
        // 4. give them jwt token 
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }

})

// Verification route
router.get('/is-verify',authorization,async (req,res)=>{
    try {
        res.json(true);

    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

module.exports = router;
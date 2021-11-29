// Imports
const express = require('express')
const Users = require('./users/model')

// Instance of express app
const server=express();

// Global Middleware
server.use(express.json())

// Endpoints
// Get 'hello'
server.get('/api/hello',(req, res) =>{
    res.json({message:'hello'})
})

// Post a user
server.post('/api/users', async (req, res) => {
    try{
        if(!req.body.name | !req.body.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
        const newUser= await Users.insert(req.body)
        res.status(201).json(newUser);
        }
    } catch(err){
        res.status(500).json({ 
            message: "There was an error while saving the user to the database"
         })
    }
})

// Get all users
server.get('/api/users', (req, res) =>{
    Users.find()
        .then(users =>{
            // throw new Error('foo')
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

// Get user by id
// Delete a user by id
// Put user by id

module.exports = server; // EXPORT YOUR SERVER instead of {}

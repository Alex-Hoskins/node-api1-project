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

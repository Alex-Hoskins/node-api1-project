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
server.get('/api/users/:id', async (req, res)=>{
    try{
        const user= await Users.findById(req.params.id);
        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
        res.status(201).json(user);
        }
    } catch(err){
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})
// Delete a user by id
server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params 
    Users.remove(id)
        .then(deletedUser=>{
            if (!deletedUser){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }else{
                res.json(deletedUser)
            }
        })
        .catch(err=>{
            res.status(500).json({ message: "The user could not be removed" })
    })
})

// Put user by id
server.put('/api/users/:id', async (req,res) => {
    const { id } = req.params 
    const { body } = req
    try{
        if(!body.name || !body.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }
        else{
            const updated = await Users.update(id,body)
            if (!updated){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }else{
                res.json(updated)
            }
        }
    }catch (err){
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

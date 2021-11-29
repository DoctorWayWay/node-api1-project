// ===== IMPORTS =====
const express = require("express")
const Users = require("./users/model")

// ===== INSTANCE OF EXPRESS APP =====
const server = express()

// ===== GLOBAL MIDDLEWARE =====
server.use(express.json())

// ===== ENDPOINTS =====
// [POST] /api/users
server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body
    // Validating if request body is appropriate
    if (!name || !bio) {
      res.status(400).json({
        "message": "provide name and bio"
      })
    } else {
      // Pulling req.body name and bio and placing it into Users.insert method as an object
      const newUser = await Users.insert({ name, bio })
      // Sending the JSON response containing the newUser and a status 201 message
      res.status(201).json(newUser)
    }
  } catch (err) {
    res.status(500).json({
      "message": "An error occured when posting a new user",
      "error": err.message
    })
  }
})

// [GET] /api/users
server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await Users.find()
    res.json(allUsers)
  } catch (err) {
    res.status(500).json({
      "message": "An error occured when retrieving users",
      "error": err.message
    })
  }
})

// [GET] /api/users/:id
server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findById(id)
    if (!user) {
      res.status(404).json({
        "message": "does not exist"
      })
    } else {
      res.json(user)
    }
  } catch (err) {
    res.status(500).json({
      "message": `An error occured when retrieving the user with an id of ${id}`,
      "error": err.message
    })
  }
})

// [DELETE] /api/users/:id
server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await Users.remove(id)
    if (!deletedUser) {
      res.status(404).json({
        "message": "does not exist"
      })
    } else {
      res.json(deletedUser)
    }
  } catch (err) {
    res.status(500).json({
      "message": `An error occured when deleting the user with an id of ${id}`,
      "error": err.message
    })
  }
})

// [PUT] /api/users/:id
server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    const updatedUser = await Users.update(id, body)
    if (!body.name || !body.bio) {
      res.status(400).json({
        "message": "provide name and bio"
      })
    } else if (!updatedUser) {
      res.status(404).json({
        "message": "does not exist"
      })
    } else {
      res.json(updatedUser)
    }
  } catch (err) {
    res.status(500).json({
      "message": `An error occured when updating the user with an id of ${id}`,
      "error": err.message
    })
  }
})

// ===== SERVER EXPORT =====
module.exports = server

// ===== IMPORTS =====
const express = require("express")
const Users = require("./users/model")

// ===== INSTANCE OF EXPRESS APP =====
const server = express()

// ===== GLOBAL MIDDLEWARE =====
server.use(express.json())

// ===== ENDPOINTS =====
// [GET] / hello (test endpoint)
server.get("/hello", (req, res) => {
  res.json({
    "message": "Hello from port 9000"
  })
})

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body
    // Validating if request body is appropriate
    if (!name || !bio) {
      res.status(400).json({
        "message": "provide name and bio"
      })
    } else {
      // Pulling req.body name and bio and placing into Users.insert method
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

// ===== SERVER EXPORT =====
module.exports = server

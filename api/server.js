// ===== IMPORTS =====
const express = require("express")

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

// ===== SERVER EXPORT =====
module.exports = server

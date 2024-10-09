const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3000; // Change this if you need to use another port

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 230, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Apply the rate limiter to all requests
app.use(limiter);

// CORS settings to explicitly allow requests from a specific origin
const corsOptions = {
  origin: (origin, callback) => callback(null, true), // Allow only this origin
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true, // Allow credentials if needed (like cookies or HTTP authentication)
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.options("*", cors(corsOptions)); // Handle OPTIONS requests for all routes
// Middleware to handle preflight requests explicitly

// Dynamic proxy setup
app.use("/proxy", async (req, res) => {
  console.log(req.body);
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res
      .status(400)
      .json({ error: "Please provide a target URL as a query parameter." });
  }

  try {
    const response = await axios({
      url: targetUrl,
      method: req.method,
      headers: {
        Authorization: req.headers?.Authorization, // Replace with your Paystack API key
        "Content-Type": req.headers["content-type"] || "application/json", // Ensure the Content-Type is set correctly
      },
      data: req.body, // Forward the request body if it exists
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response
        ? error.response.data
        : "No response from target server",
    });
  }
});

// Root route for health check
app.get("/", (req, res) => {
  res.send("Dynamic CORS proxy server is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

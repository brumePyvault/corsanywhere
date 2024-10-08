# CORS Proxy Server

A simple and flexible CORS (Cross-Origin Resource Sharing) proxy server built with Node.js, Express, and Axios. This server enables cross-origin requests to any target API while handling CORS headers, preflight requests, and authorization.

## Features
- **Dynamic Target API Requests:** Forward requests to any URL provided as a query parameter.
- **Explicit CORS Handling:** Allows requests from specific origins or a list of origins.
- **Preflight Request Support:** Handles `OPTIONS` requests to ensure proper CORS compliance.
- **Customizable Authorization:** Add headers like API keys for requests to secured APIs.
- **Error Handling:** Detailed error messages for easier debugging.

## Prerequisites
- Node.js (version 12 or later)
- npm (Node Package Manager)

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/cors-proxy-server.git
   cd cors-proxy-server
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

## Usage

### Starting the Server
To start the proxy server, use the following command:
```bash
node server.js
```

The server will start on `http://localhost:3000` by default, but you can change the port in the server configuration.

### Configuration
The server's behavior can be customized using CORS settings. Here's an example of how to configure multiple allowed origins:

```javascript
const corsOptions = {
  origin: ["http://localhost:5173", "http://example.com", "http://another-origin.com"], // Add allowed origins here
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
};
app.use(cors(corsOptions));
```

### How to Use the Proxy
To make a request through the proxy server, format your URL like this:
```
http://localhost:3000/proxy?url=https://api.example.com/data
```

- Replace `https://api.example.com/data` with the API endpoint you wish to access.
- The proxy server will handle the CORS headers and forward the request to the target server.

### Example Frontend Request
Here's how you might use the proxy server in a front-end application:
```javascript
fetch('http://localhost:3000/proxy?url=https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Security Considerations
- **Origin Whitelisting:** It is recommended to explicitly set allowed origins to prevent unauthorized domains from accessing your proxy server.
- **Sensitive Headers:** Avoid exposing sensitive information, like API keys, in client-side code. Handle API keys securely within the server.

## Error Handling
- **404 Error:** Indicates the requested resource could not be found. Double-check the API endpoint.
- **CORS Error:** Verify that the correct headers are set and that the server is handling preflight requests.
- **Authorization Error:** Make sure the appropriate API keys or authorization headers are included when making requests to protected APIs.

## Troubleshooting
- **CORS Issues:** If you continue to face CORS issues, check the browser's developer tools to inspect request and response headers.
- **Preflight Requests:** Ensure that `OPTIONS` requests are properly handled with the necessary CORS headers.
- **Network Errors:** If you encounter network errors, confirm that the target URL is correct and accessible.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or enhancements.

## Support
If you have any issues or questions, please open an issue in the GitHub repository or reach out via the contact information provided.

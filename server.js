// Import the 'app' instance from the 'index.js' file
import app from "./index.js";


// Start the server on port 3200 and log a message when it's listening
app.listen(3200, () => {
  console.log(`Server is listening on localhost:${3200}`);
});

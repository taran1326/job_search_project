// Import necessary modules
import express , {urlencoded} from "express"; // Import the Express framework
import path from "path"; // Import the path module for file paths
import expressLayouts from "express-ejs-layouts"; // Import Express-EJS-Layouts for layout support
import jobRouter from "./src/routes/job.route.js";
import userRouter from "./src/routes/user.route.js";
import session from "express-session"; // Import Express session for managing sessions
import { lastVisit } from "./src/middlewares/lastVisitMiddleware.js";
import cookieParser from "cookie-parser"; // Import Cookie Parser for handling cookies

// Create an instance of the Express application
const app = express();

// Middleware Setup
app.use(cookieParser()); // Parse cookies in requests
app.use(lastVisit); // Implement middleware to track the user's last visit
app.use(
  session({
    secret: "vivekSecretKey", // Secret key for session management
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save new sessions
    cookie: { secure: false }, // Configure session cookies
  })
);
app.use(express.json()); // Parse incoming JSON data
app.use(express.static(path.resolve("src", "public"))); // Serve static files
app.use(urlencoded({ extended: true })); // Parse form data
app.use(expressLayouts); // Enable EJS layouts
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.resolve("src", "views")); // Set the views directory
app.set("layout", path.resolve("src", "views", "layouts", "layout")); // Set the layout file

// Attach routers for handling specific routes
app.use(jobRouter); // Attach the router for job-related routes
app.use(userRouter); // Attach the router for user-related routes

export default app; // Export the Express application instance

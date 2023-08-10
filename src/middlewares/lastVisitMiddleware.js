/**
 * Middleware to track user's last visit time.
 * If user has visited before, displays last visit time.
 * If first visit, sets a cookie with current time.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
 export const lastVisit = (req, res, next) => {
  // Check if lastVisit cookie exists
  if (req.cookies.lastVisit) {
    // Display last visit time in local context
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  } else {
    // Set a cookie with current time for future reference
    res.cookie("lastVisit", new Date().toISOString(), {
      maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie valid for 1 day
    });
  }
  // Continue to next middleware
  next();
};

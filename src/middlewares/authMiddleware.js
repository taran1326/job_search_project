/**
 * Middleware to check if user is authenticated as a recruiter.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express NextFunction.
 */
 export const auth = (req, res, next) => {
  // Check if user session exists (user is logged in)
  if (req.session.user) {
    // User is authenticated as a recruiter, proceed to the next middleware/route
    next();
  } else {
    // User is not authenticated as a recruiter, render access denied page
    res.render("404", {
      msg: "Only recruiters are allowed to access this page. Please login as a recruiter to continue.",
    });
  }
};

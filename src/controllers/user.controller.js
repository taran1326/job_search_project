import UserModel from "../models/user.model.js";


// Controller class for handling user-related operations.

export default class UserController {

/**
  Renders the login page.
  * @param {Request} req - Express Request object.
  * @param {Response} res - Express Response object.
  * @param {NextFunction} next - Express Next function.
*/

  getLogin = (req, res, next) => {
    res.render("user-login", { errors: null });
  };


/**
  * Adds a new user to the database and redirects to the login page.
  * @param {Request} req - Express Request object.
  * @param {Response} res - Express Response object.
*/


  addUser = (req, res) => {
    UserModel.addUser(req.body);
    res.redirect("/login");
  };

/**
   * Authenticates the user's login credentials and redirects to appropriate pages.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
 */
  loginUser = (req, res) => {
    const { email, password } = req.body;
    const userToAuthenticate = UserModel.confirmLogin(req.body);
    if (!userToAuthenticate) {
      res.render("404", {
        msg: "user not found pls register",
      });
    }
    if (
      userToAuthenticate.email === email &&
      userToAuthenticate.password === password
    ) {
      req.session.user = userToAuthenticate;
      res.redirect("/jobs");
    } else {
      res.render("404", { msg: "invalid credentials" });
    }
  };

/**
   * Logs out the current user and redirects to the login page.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
*/
  logoutUser = (req, res) => {
    req.session.userEmail = null;
    res.clearCookie("lastVisit");
    req.session.destroy((err) => {
      if (err) console.log(err);
      else res.redirect("/login");
    });
  };
}

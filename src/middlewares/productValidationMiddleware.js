
import { body, validationResult } from "express-validator";

/**
 * Middleware to validate product data before submission.
 * Validates product name, image URL, price, and description.
 * If validation fails, renders the "add_product" page with error messages.
 * If validation passes, proceeds to the next middleware.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
 export const validateProduct = async (req, res, next) => {
  // Extract product data from request body
  const { name, desc, price, img } = req.body;
  const inputData = { name, desc, price, img };

  // Validation rules for product data
  const rules = [
    body("name").notEmpty().withMessage("Please enter a name (required)"),
    body("img").isURL().withMessage("Image URL should be valid"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be greater than 0"),
    body("desc")
      .isLength({ min: 10 })
      .withMessage("Description should be at least 10 characters"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Upload image is required");
      } else return true;
    }),
  ];

  // Run validation rules
  await Promise.all(
    rules.map((rule) => {
      return rule.run(req);
    })
  );

  // Get validation errors
  const errors = validationResult(req);

  // If there are errors, render "add_product" page with error messages
  if (!errors.isEmpty()) {
    res.render("add_product", {
      error: errors.array(),
      inputData,
    });
  } else {
    // If validation passes, proceed to the next middleware
    next();
  }
};

import { body, validationResult } from "express-validator";
export const validateProduct = async (req, res, next) => {
  const { name, desc, price, img } = req.body;
  const inputData = { name, desc, price, img };
  const rules = [
    body("name").notEmpty().withMessage("please enter name(required)"),
    body("img").isURL().withMessage("img url should be valid"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("price should be greater than 0"),
    body("desc")
      .isLength({ min: 10 })
      .withMessage("description should be atleat 10 characters"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("upload image is required");
      } else return true;
    }),
  ];
  await Promise.all(
    rules.map((rule) => {
      return rule.run(req);
    })
  );
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("add_product", {
      error: errors.array(),
      inputData,
    });
  } else {
    next();
  }
};

import express from "express";
import JobControl from "../controllers/job.controller.js";
import uploadFile from "../middlewares/fileUploadMiddleware.js";
import { auth } from "../middlewares/authMiddleware.js";

const jobController = new JobControl();
const router = express.Router();

// GET Routes

/**
 * Route: /404
 * Method: GET
 * Description: Renders a custom 404 error page.
 */
router.route("/404").get((req, res) => {
  res.render("404", { msg: "Hi" });
});

/**
 * Route: /
 * Method: GET
 * Description: Renders the landing page.
 */
router.route("/").get(jobController.renderLandingPage);

/**
 * Route: /jobs
 * Method: GET
 * Description: Renders a list of all available jobs.
 */
router.route("/jobs").get(jobController.getJobs);

/**
 * Route: /job/:id
 * Method: GET
 * Description: Renders the details of a specific job using its ID.
 */
router.route("/job/:id").get(jobController.findJobById);

/**
 * Route: /postjob
 * Method: GET
 * Description: Renders the job posting form for authorized users.
 */
router.route("/postjob").get(auth, jobController.renderJobForm);

/**
 * Route: /job/applicants/:id
 * Method: GET
 * Description: Renders a list of applicants for a specific job using its ID, accessible by authorized users.
 */
router.route("/job/applicants/:id").get(auth, jobController.allApplicants);

/**
 * Route: /job/update/:id
 * Method: GET
 * Description: Renders the job update form for authorized users.
 */
router.route("/job/update/:id").get(auth, jobController.renderUpdateform);

// POST Routes

/**
 * Route: /job
 * Method: POST
 * Description: Creates a new job posting.
 */
router.route("/job").post(jobController.newjob);

/**
 * Route: /apply/:id
 * Method: POST
 * Description: Submits a job application with a resume for a specific job using its ID.
 */
router
  .route("/apply/:id")
  .post(uploadFile.single("resume"), jobController.newApplicant);

/**
 * Route: /job/update/:id
 * Method: POST
 * Description: Updates a job posting using its ID, accessible by authorized users.
 */
router.route("/job/update/:id").post(auth, jobController.updateJobById);

// DELETE Route

/**
 * Route: /job/delete/:id
 * Method: GET
 * Description: Deletes a job posting using its ID, accessible by authorized users.
 */
router.route("/job/delete/:id").get(auth, jobController.deleteJob);

export default router;


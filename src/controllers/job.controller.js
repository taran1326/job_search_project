import { sendConfirmationMail } from "../middlewares/sendMail.js";
import {
  addNewApplicant,
  createNewJob,
  deleteJob,
  findJobById,
  getAllJobs,
  sendAllApplicants,
  updateJob,
} from "../models/job.model.js";

/**
 * Controller class for handling job-related operations.
*/

export default class JobControl {

  /**
   * Renders the landing page.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  renderLandingPage = (req, res) => {
    res.render("landing-page", { user: req.session.user });
  };

  /**
   * Retrieves all job listings and renders the jobs page.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  getJobs = (req, res) => {
    let jobs = getAllJobs();
    res.render("list-all-jobs", { jobs, user: req.session.user });
    // res.render("product", { products, userEmail: req.session.userEmail });
  };

  /**
   * Creates a new job listing and redirects to the jobs page.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  newjob = (req, res) => {
    createNewJob(req.body);
    res.redirect("/jobs");
  };

  /**
   * Renders the new job form.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  renderJobForm = (req, res) => {
    res.render("new-job", { user: req.session.user });
  };

  /**
   * Finds a job listing by ID and renders the job details page.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  findJobById = (req, res) => {
    const id = req.params.id;
    const jobaData = findJobById(id);
    res.render("job-details", { data: jobaData, user: req.session.user });
  };

  /**
   * Adds a new applicant for a job and sends a confirmation email.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  newApplicant = async (req, res) => {
    const id = req.params.id;
    const { name, email, contact } = req.body;
    const resumePath = req.file.filename;
    const resp = addNewApplicant(id, name, email, contact, resumePath);
    await sendConfirmationMail(email);
    res.redirect("/jobs");
  };

  /**
   * Retrieves all applicants for a job and renders the applicants page.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  allApplicants = (req, res) => {
    const id = req.params.id;
    const resp = sendAllApplicants(id);
    res.render("all-applicants", {
      allApplicants: resp,
      user: req.session.user,
    });
  };

  /**
   * Renders the update job form.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  renderUpdateform = (req, res) => {
    const id = req.params.id;
    const resp = findJobById(id);
    res.render("update-job", { job: resp });
  };

  /**
   * Updates a job listing by ID and redirects to the job details page.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */
  
  updateJobById = (req, res) => {
    const id = req.params.id;
    updateJob(id, req.body);
    res.redirect(`/job/${id}`);
  };

  /**
   * Deletes a job listing by ID and redirects to the jobs page.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   */

  deleteJob = (req, res) => {
    const id = req.params.id;
    deleteJob(id);
    res.redirect("/jobs");
  };
}






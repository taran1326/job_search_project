/**
 * This module defines functions related to managing job data.
 */
 let db_id = 3; // Used for generating unique job IDs

 // Example job data stored in memory
 const jobs = [
  {
    id: 1,
    job_category: "Tech",
    job_designation: "SDE",
    job_location: "gurgao HR IND Remote",
    company_name: "Coding Ninjas",
    salary: "14-20lpa",
    apply_by: "30 Aug 2023",
    skills_required: [
      "REACT",
      "NodeJs",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    number_of_openings: 5,
    job_posted: new Date().toLocaleString(),
    applicants: [
      {
        applicat_id: 1,
        name: "vivek",
        email: "krvivi28@gmail.com",
        contact: 7839358367,
        resumePath: "resume.pdf",
      },
    ],
  },
  {
    id: 2,
    job_category: "Tech",
    job_designation: "Angular Developer",
    job_location: "Pune IND On-Site",
    company_name: "Go Digit",
    salary: "6-10lpa",
    apply_by: "30 Aug 2023",
    skills_required: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
    number_of_openings: 7,
    job_posted: new Date().toLocaleString(),
    applicants: [],
  },
  {
    id: 3,
    job_category: "Tech",
    job_designation: "SDE",
    job_location: "Bangalore IND",
    company_name: "Juspay",
    salary: "20-26lpa",
    apply_by: "30 Aug 2023",
    skills_required: [
      "REACT",
      "NodeJs",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    number_of_openings: 3,
    job_posted: new Date().toLocaleString(),
    applicants: [],
  },
];
 
 /**
  * Class representing a new job posting.
  */
  class PostNewJob {
    // constructor(){
    // }
    constructor(
      job_category,
      job_designation,
      job_location,
      company_name,
      salary,
      apply_by,
      skills_required,
      number_of_openings
    ) {
      this.id = ++db_id;
      this.job_category = job_category;
      (this.job_designation = job_designation),
        (this.job_location = job_location),
        (this.company_name = company_name);
      this.salary = salary;
      this.apply_by = apply_by;
      this.skills_required = skills_required;
      this.number_of_openings = number_of_openings;
      this.job_posted = new Date().toLocaleString;
      this.applicants = [];
    }
  }
 
 /**
  * Creates a new job posting and adds it to the jobs list.
  * @param {Object} job_details - Details of the new job.
  */
  export const createNewJob = (job_details) => {
    const {
      job_category,
      job_designation,
      job_location,
      company_name,
      salary,
      apply_by,
      skills_required,
      number_of_openings,
    } = job_details;
    const job = new PostNewJob(
      job_category,
      job_designation,
      job_location,
      company_name,
      salary,
      apply_by,
      skills_required,
      number_of_openings
    );
    jobs.push(job);
  };
 
 /**
  * Retrieves all job postings.
  * @returns {Array} - List of job postings.
  */
  export const getAllJobs = () => {
    return jobs;
  };
 
 /**
  * Finds a job posting by its ID.
  * @param {number} id - ID of the job posting to find.
  * @returns {Object} - The found job posting.
  */
  export const findJobById = (id) => {
    return jobs.find((job) => {
      return job.id == id;
    });
  };

 /**
  * Adds a new applicant to a job posting.
  * @param {number} id - ID of the job posting.
  * @param {string} name - Applicant's name.
  * @param {string} email - Applicant's email.
  * @param {string} contact - Applicant's contact number.
  * @param {string} resumePath - Path to the applicant's resume.
  * @returns {Array} - List of applicants for the job.
  */

  export const addNewApplicant = (id, ...applicantData) => {
    const index = jobs.findIndex((job) => {
      return job.id == id;
    });
    let applicantId = jobs[index].applicants.length + 1;
    jobs[index].applicants.push({
      applicat_id: applicantId,
      name: applicantData[0],
      email: applicantData[1],
      contact: applicantData[2],
      resumePath: applicantData[3],
    });
    return jobs[index].applicants;
  };
 
 /**
  * Retrieves all applicants for a job posting.
  * @param {number} id - ID of the job posting.
  * @returns {Array} - List of applicants for the job.
  */
  export const sendAllApplicants = (id) => {
    const index = jobs.findIndex((job) => {
      return job.id == id;
    });
    return jobs[index].applicants;
  };
 
 /**
  * Updates details of a job posting.
  * @param {number} id - ID of the job posting to update.
  * @param {Object} data - Updated data for the job posting.
  */
  export const updateJob = (id, data) => {
    const index = jobs.findIndex((job) => {
      return job.id == id;
    });
    jobs[index].company_name = data.company_name || jobs[index].company_name;
    jobs[index].apply_by = data.apply_by || jobs[index].apply_by;
    jobs[index].job_category = data.job_category || jobs[index].job_category;
    jobs[index].job_designation =
      data.job_designation || jobs[index].job_designation;
    jobs[index].job_location = data.job_location || jobs[index].job_location;
    jobs[index].job_posted = data.job_posted || jobs[index].job_posted;
    jobs[index].number_of_openings =
      data.number_of_openings || jobs[index].number_of_openings;
    jobs[index].skills_required =
      data.skills_required || jobs[index].skills_required;
    jobs[index].salary = data.salary || jobs[index].salary;
  };
 
 /**
  * Deletes a job posting.
  * @param {number} id - ID of the job posting to delete.
  */
  export const deleteJob = (id) => {
    const index = jobs.findIndex((job) => {
      return job.id == id;
    });
    jobs.splice(index, 1);
  };
 














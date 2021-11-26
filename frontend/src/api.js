const BASE_URL = "http://localhost:8001";

// CANDIDATE
export const GETALLJOBS = `${BASE_URL}/api/jobs`;
export const GETCANDIDATEPROFILE = `${BASE_URL}/api/candidate/prof`;
export const JOBDETAILS = `${BASE_URL}/api/job_details`;

//RECRUITER
export const GETJOBS = `${BASE_URL}/api/emp_jobs`
export const GETCOMPANY = `${BASE_URL}/api/emp_company`
export const APP_CAN = `${BASE_URL}/api/applied_candidates`
export const SEL_CAN = `${BASE_URL}/api/sel_can`
export const REJ_CAN = `${BASE_URL}/api/rej_can`